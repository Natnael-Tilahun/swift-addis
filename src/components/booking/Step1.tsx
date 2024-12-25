import { useServices } from "@/hooks/useServices";
import { useAddons } from "@/hooks/useAddons";
import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { useRouter } from "next/navigation";
import type { Service, AddOn } from "@/types/type";

export default function Step1() {
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: addOns, isLoading: addOnsLoading } = useAddons();
  const router = useRouter();

  const {
    selectedServicesWithTypes,
    selectedAddOns,
    toggleAddOn,
    setTotalPrice,
  } = useBookingStore();

  // Calculate total price whenever selections change
  useEffect(() => {
    if (!services || !addOns) return;

    // Calculate services total
    const servicesTotal = selectedServicesWithTypes.reduce(
      (total, selected) => {
        const service = services.find(
          (s: Service) => s._id === selected.serviceId
        );
        if (!service) return total;
        const price = service.pricing[selected.vehicleType]?.basePrice || 0;
        return total + price;
      },
      0
    );

    // Calculate add-ons total
    const addOnsTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a: AddOn) => a._id === addOnId);
      return total + (addOn?.additionalPrice || 0);
    }, 0);

    // Set total price
    setTotalPrice(servicesTotal + addOnsTotal);
  }, [
    selectedServicesWithTypes,
    selectedAddOns,
    services,
    addOns,
    setTotalPrice,
  ]);

  // Get the selected service details
  const selectedService = services?.find(
    (s: Service) => s._id === selectedServicesWithTypes[0]?.serviceId
  );

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        <div className="col-span-1 md:col-span-2 space-y-6">
          {/* Services Card */}
          <Card>
            <CardHeader>
              <CardTitle>Selected Service</CardTitle>
              <CardDescription>
                Your selected service and its details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {servicesLoading ? (
                <div className="grid grid-cols-2 gap-4 h-full">
                  <Skeleton className="h-20 w-full"></Skeleton>
                  <Skeleton className="h-20 w-full"></Skeleton>
                </div>
              ) : selectedService ? (
                <div className="space-y-2">
                  <h3 className="font-semibold md:text-lg">
                    {selectedService.name}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedServicesWithTypes.map((selected) => (
                      <div
                        key={`${selected.serviceId}-${selected.vehicleType}`}
                        className="p-4 border rounded-lg border-primary bg-primary/5"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">
                              {selected.vehicleType}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {selectedService.duration[selected.vehicleType]}{" "}
                              min
                            </p>
                          </div>
                          <Badge variant="default">
                            {
                              selectedService.pricing[selected.vehicleType]
                                .basePrice
                            }{" "}
                            Birr
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No service selected. Please select a service from the services
                  page.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add-ons Card - Only show if there's a selected service */}
          {selectedService && (
            <Card>
              <CardHeader>
                <CardTitle>Available Add-ons</CardTitle>
                <CardDescription>
                  Enhance your service with these add-ons
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                {addOnsLoading ? (
                  <div className="grid col-span-full grid-cols-2 gap-4 h-full">
                    <Skeleton className="h-20 w-full"></Skeleton>
                    <Skeleton className="h-20 w-full"></Skeleton>
                  </div>
                ) : addOns && addOns.length > 0 ? (
                  addOns.map((addon: AddOn) => (
                    <div
                      key={addon._id}
                      onClick={() => toggleAddOn(addon._id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedAddOns.includes(addon._id)
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between gap-2 items-start">
                        <div>
                          <h3 className="font-medium">{addon.optionName}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {addon.description}
                          </p>
                        </div>
                        <Badge
                          variant={
                            selectedAddOns.includes(addon._id)
                              ? "default"
                              : "outline"
                          }
                        >
                          {addon.additionalPrice} Birr
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        Duration: {addon.duration} min
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-4 text-muted-foreground">
                    No add-ons available for this service
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <BookingSummary className="col-span-1">
          <Button
            className="w-full mt-4"
            size="lg"
            onClick={() => {
              useBookingStore.getState().setStep(2);
              router.push(`/booking?step=2`);
            }}
            disabled={!selectedService}
          >
            Continue to Book
          </Button>
        </BookingSummary>
      </div>
    </div>
  );
}

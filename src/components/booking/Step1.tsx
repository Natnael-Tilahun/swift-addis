import { useServices } from "@/hooks/useServices";
import { useAddons } from "@/hooks/useAddons";
import { useState, useEffect } from "react";
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

  const [lockedVehicleType, setLockedVehicleType] = useState<string | null>(
    null
  );

  // Calculate total price whenever selections change
  useEffect(() => {
    if (!services || !addOns?.data) return;

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
      const addOn = addOns.data.find((a: AddOn) => a._id === addOnId);
      return total + (addOn?.additionalPrice || 0);
    }, 0);

    // Set total price
    const totalPrice = servicesTotal + addOnsTotal;
    setTotalPrice(totalPrice);
  }, [
    selectedServicesWithTypes,
    selectedAddOns,
    services,
    addOns,
    setTotalPrice,
  ]);

  // Get vehicle type for a specific service
  const getVehicleTypeForService = (serviceId: string) => {
    return selectedServicesWithTypes.find(
      (item) => item.serviceId === serviceId
    )?.vehicleType;
  };

  const handleServiceSelection = (serviceId: string, type: string) => {
    // Check if the service is already selected with the same type
    const isSelected = selectedServicesWithTypes.some(
      (item) => item.serviceId === serviceId && item.vehicleType === type
    );

    if (isSelected) {
      // Remove the service if clicking on the same service and type
      const updatedServices = selectedServicesWithTypes.filter(
        (item) => item.serviceId !== serviceId
      );
      useBookingStore.getState().setSelectedServicesWithTypes(updatedServices);

      // If no services left, reset the locked vehicle type
      if (updatedServices.length === 0) {
        setLockedVehicleType(null);
      }
    } else {
      let updatedServices = [...selectedServicesWithTypes];

      // Check if this service exists but with different type
      const existingServiceIndex = updatedServices.findIndex(
        (item) => item.serviceId === serviceId
      );

      if (existingServiceIndex !== -1) {
        // Update existing service type
        updatedServices[existingServiceIndex].vehicleType = type;
      } else {
        // Add new service
        updatedServices.push({ serviceId, vehicleType: type });
      }

      // If vehicle type is different from locked type, filter services
      if (lockedVehicleType && type !== lockedVehicleType) {
        // Keep only services that support the new vehicle type
        updatedServices = updatedServices
          .filter((service) => {
            const serviceData = services?.find(
              (s: Service) => s._id === service.serviceId
            );
            return serviceData?.pricing[type];
          })
          .map((service) => ({
            ...service,
            vehicleType: type,
          }));
      }

      setLockedVehicleType(type);
      useBookingStore.getState().setSelectedServicesWithTypes(updatedServices);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Services Card */}
          <Card>
            <CardHeader>
              <CardTitle>Select Services</CardTitle>
              <CardDescription>
                Choose the services you want to book
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {servicesLoading ? (
                <div>Loading services...</div>
              ) : services && services.length > 0 ? (
                services.map((service: Service) => (
                  <div key={service._id} className="space-y-3">
                    <h3 className="font-semibold text-lg">{service.name}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {service.pricing &&
                        Object.entries(service.pricing).map(([type, price]) => (
                          <div
                            key={`${service._id}-${type}`}
                            onClick={() => {
                              handleServiceSelection(service._id, type);
                            }}
                            className={`p-4 border rounded-lg transition-all duration-200 hover:border-primary/50 ${
                              getVehicleTypeForService(service._id) === type
                                ? "border-primary bg-primary/5"
                                : lockedVehicleType &&
                                  lockedVehicleType !== type
                                ? ""
                                : "hover:border-primary/50 hover:bg-gray-50 cursor-pointer"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{type}</p>
                                <p className="text-sm text-muted-foreground">
                                  {service.duration[type]} min
                                </p>
                              </div>
                              <Badge
                                variant={
                                  getVehicleTypeForService(service._id) === type
                                    ? "default"
                                    : "outline"
                                }
                              >
                                {price.basePrice} Birr
                              </Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))
              ) : (
                <div>No services available</div>
              )}
            </CardContent>
          </Card>

          {/* Add-ons Card */}
          {selectedServicesWithTypes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Available Add-ons</CardTitle>
                <CardDescription>
                  Enhance your service with these add-ons
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {addOnsLoading ? (
                  <div>Loading add-ons...</div>
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
                      <div className="flex justify-between items-start">
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
                  <div>No add-ons available</div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <BookingSummary>
          <Button
            className="w-full mt-4"
            size="lg"
            onClick={() => {
              useBookingStore.getState().setStep(2);
              router.push(`/booking?step=2`);
            }}
            disabled={selectedServicesWithTypes.length === 0}
          >
            Continue to Book
          </Button>
        </BookingSummary>
      </div>
    </div>
  );
}

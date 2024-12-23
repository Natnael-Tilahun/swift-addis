import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useServices } from "@/hooks/useServices";
import { useAddons } from "@/hooks/useAddons";
import { useBookingStore } from "@/store/useBookingStore";
import {  useCallback } from "react";
import type { Service, AddOn } from "@/types/type";

export function BookingSummary({ children }: { children: React.ReactNode }) {
  const { data: services } = useServices();
  const { data: addOns } = useAddons();

  const {
    selectedServicesWithTypes,
    selectedAddOns,
    appointmentDate,
    appointmentTime,
  } = useBookingStore();

  // Calculate total duration
  const calculateTotalDuration = useCallback(() => {
    if (!services || !addOns) return 0;

    // Calculate services duration
    const servicesDuration = selectedServicesWithTypes.reduce(
      (total, selected) => {
        const service = services.find(
          (s: Service) => s._id === selected.serviceId
        );
        if (!service) return total;
        return total + (service.duration[selected.vehicleType] || 0);
      },
      0
    );

    // Calculate add-ons duration
    const addonsDuration = selectedAddOns.reduce((total, addonId) => {
      const addon = addOns.find((a: AddOn) => a._id === addonId);
      return total + (addon?.duration || 0);
    }, 0);

    return servicesDuration + addonsDuration;
  }, [services, addOns, selectedServicesWithTypes, selectedAddOns]);

  // Calculate total price
  const calculateTotalPrice = useCallback(() => {
    if (!services || !addOns) return 0;

    // Calculate services total
    const servicesTotal = selectedServicesWithTypes.reduce(
      (total, selected) => {
        const service = services.find(
          (s: Service) => s._id === selected.serviceId
        );
        if (!service?.pricing?.[selected.vehicleType]) return total;
        return total + service.pricing[selected.vehicleType].basePrice;
      },
      0
    );

    // Calculate add-ons total
    const addonsTotal = selectedAddOns.reduce((total, addonId) => {
      const addon = addOns.find((a: AddOn) => a._id === addonId);
      return total + (addon?.additionalPrice || 0);
    }, 0);

    return servicesTotal + addonsTotal;
  }, [services, addOns, selectedServicesWithTypes, selectedAddOns]);

  // Memoize the debug logging callback
  // const debugLog = useCallback(() => {
  //   console.log("Current calculations:", {
  //     duration: calculateTotalDuration(),
  //     price: calculateTotalPrice(),
  //     selectedServices: selectedServicesWithTypes.map((selected) => {
  //       const service = services?.find(
  //         (s: Service) => s._id === selected.serviceId
  //       );
  //       return {
  //         name: service?.name,
  //         duration: service?.duration[selected.vehicleType],
  //         price: service?.pricing[selected.vehicleType]?.basePrice,
  //       };
  //     }),
  //   });
  // }, [
  //   services,
  //   selectedServicesWithTypes,
  //   calculateTotalDuration,
  //   calculateTotalPrice,
  // ]);

  // Use the memoized debug callback in useEffect
  // useEffect(() => {
  //   debugLog();
  // }, [debugLog]);

  const totalDuration = calculateTotalDuration();
  const totalPrice = calculateTotalPrice();

  const selectedDate = appointmentDate ? new Date(appointmentDate) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
        <CardDescription>Summary of your selections</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {selectedServicesWithTypes.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No services selected yet
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {/* Services Summary */}
              <div>
                <h3 className="font-medium mb-2">Services</h3>
                {selectedServicesWithTypes.map(({ serviceId, vehicleType }) => {
                  const service = services?.find(
                    (s: Service) => s._id === serviceId
                  );
                  if (!service) return null;

                  return (
                    <div
                      key={serviceId}
                      className="flex justify-between items-start border-b pb-2 mb-2"
                    >
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {vehicleType}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {service.pricing[vehicleType]?.basePrice} Birr
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {service.duration[vehicleType]} min
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add-ons Summary */}
              {selectedAddOns.length > 0 && addOns && (
                <div>
                  <h3 className="font-medium mb-2">Add-ons</h3>
                  {addOns
                    .filter((addon: AddOn) =>
                      selectedAddOns.includes(addon._id)
                    )
                    .map((addon: AddOn) => (
                      <div
                        key={addon._id}
                        className="flex justify-between items-start border-b pb-2 mb-2"
                      >
                        <p className="font-medium">{addon.optionName}</p>
                        <div className="text-right">
                          <p className="font-medium">
                            {addon.additionalPrice} Birr
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {addon.duration} min
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* Appointment Details */}
              {selectedDate && (
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Appointment Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    {appointmentTime && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{appointmentTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Duration:</span>
                  <span className="font-medium">{totalDuration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Price:</span>
                  <span className="font-medium">{totalPrice} Birr</span>
                </div>
              </div>
              {children}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

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
import { useCallback } from "react";
import type { Service, AddOn } from "@/types/type";
import { useTranslations } from "next-intl";

export function BookingSummary({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const t = useTranslations("booking_summary");
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

  // Calculate total price range
  const calculateTotalPriceRange = useCallback(() => {
    if (!services || !addOns) return { minTotal: 0, maxTotal: 0 };

    // Calculate services total range
    const servicesTotals = selectedServicesWithTypes.reduce(
      (total, selected) => {
        const service = services.find(
          (s: Service) => s._id === selected.serviceId
        );
        if (!service?.pricing?.[selected.vehicleType]) return total;
        return {
          minTotal:
            total.minTotal + service.pricing[selected.vehicleType].basePrice,
          maxTotal:
            total.maxTotal + service.pricing[selected.vehicleType].maxPrice,
        };
      },
      { minTotal: 0, maxTotal: 0 }
    );

    // Calculate add-ons total range
    const addonsTotals = selectedAddOns.reduce(
      (total, addonId) => {
        const addon = addOns.find((a: AddOn) => a._id === addonId);
        if (!addon?.additionalPrice) return total;
        return {
          minTotal: total.minTotal + addon.additionalPrice.minBasePrice,
          maxTotal: total.maxTotal + addon.additionalPrice.maxPrice,
        };
      },
      { minTotal: 0, maxTotal: 0 }
    );

    return {
      minTotal: servicesTotals.minTotal + addonsTotals.minTotal,
      maxTotal: servicesTotals.maxTotal + addonsTotals.maxTotal,
    };
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
  const { minTotal, maxTotal } = calculateTotalPriceRange();

  const selectedDate = appointmentDate ? new Date(appointmentDate) : null;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {selectedServicesWithTypes.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t("no_services")}</p>
        ) : (
          <>
            <div className="space-y-4">
              {/* Services Summary */}
              <div>
                <h3 className="font-medium mb-2">{t("sections.services")}</h3>
                {selectedServicesWithTypes.map(({ serviceId, vehicleType }) => {
                  const service = services?.find(
                    (s: Service) => s._id === serviceId
                  );
                  if (!service) return null;

                  return (
                    <div
                      key={serviceId}
                      className="flex flex-col md:flex-row justify-between md:items-start md:gap-4 border-b pb-2 mb-2"
                    >
                      <div>
                        <p className="font-medium text-base">{service.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {vehicleType}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-base whitespace-nowrap">
                          {t("price.range", {
                            min: service.pricing[vehicleType]?.basePrice,
                            max: service.pricing[vehicleType]?.maxPrice
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {service.duration[vehicleType]} {t("time.duration")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add-ons Summary */}
              {selectedAddOns.length > 0 && addOns && (
                <div>
                  <h3 className="font-medium mb-2">{t("sections.addons")}</h3>
                  {addOns
                    .filter((addon: AddOn) =>
                      selectedAddOns.includes(addon._id)
                    )
                    .map((addon: AddOn) => (
                      <div
                        key={addon._id}
                        className="flex justify-between items-start border-b pb-2 mb-2 gap-2"
                      >
                        <p className="font-medium">{addon.optionName}</p>
                        <div className="text-right">
                          <p className="font-medium">
                            {t("price.range", {
                              min: addon.additionalPrice?.minBasePrice || 0,
                              max: addon.additionalPrice?.maxPrice || 0
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {addon.duration} {t("time.duration")}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* Appointment Details */}
              {selectedDate && (
                <div className=" pt-4">
                  <h3 className="font-medium mb-2">{t("sections.appointment")}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("time.date")}:</span>
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
                        <span className="text-muted-foreground">{t("time.time")}:</span>
                        <span className="font-medium">{appointmentTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("totals.duration")}:</span>
                  <span className="font-medium">
                    {t("totals.duration_value", { duration: totalDuration })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("totals.price_range")}:</span>
                  <span className="font-medium">
                    {t("totals.price_value", { min: minTotal, max: maxTotal })}
                  </span>
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

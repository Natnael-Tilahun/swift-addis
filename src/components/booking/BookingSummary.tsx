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
import { useTranslations, useLocale } from "next-intl";
import { InfoIcon } from "lucide-react";

export function BookingSummary({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const t = useTranslations("booking_summary");
  const tCommon = useTranslations("common");

  const locale = useLocale();
  const { data: services } = useServices();
  const { data: addOns } = useAddons();

  const {
    selectedServicesWithTypes,
    selectedAddOns,
    appointmentDate,
    appointmentTime,
    setTotalDuration,
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
    setTotalDuration(servicesDuration + addonsDuration);
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
        if (!service?.pricing) return total;
        return total + service.pricing.basePrice;
      },
      0
    );

    // Calculate add-ons total
    const addOnsTotal = selectedAddOns.reduce((total, addonId) => {
      const addon = addOns.find((a: AddOn) => a._id === addonId);
      if (!addon?.additionalPrice) return total;
      return total + addon.additionalPrice.minBasePrice;
    }, 0);

    return servicesTotal + addOnsTotal;
  }, [services, addOns, selectedServicesWithTypes, selectedAddOns]);

  const totalDuration = calculateTotalDuration();

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
                        <p className="font-medium text-base">
                          {service.name[locale]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {vehicleType}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-base whitespace-nowrap">
                          {t("price.range", {
                            min: service.pricing.basePrice,
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
                        <p className="font-medium">
                          {addon.optionName[locale] || addon.optionName["en"]}
                        </p>
                        <div className="text-right">
                          <p className="font-medium">
                            {t("price.range", {
                              min: addon.additionalPrice?.minBasePrice || 0,
                              max: addon.additionalPrice?.maxPrice || 0,
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
                  <h3 className="font-medium mb-2">
                    {t("sections.appointment")}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t("time.date")}:
                      </span>
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
                        <span className="text-muted-foreground">
                          {t("time.time")}:
                        </span>
                        <span className="font-medium">{appointmentTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t("totals.duration")}:
                  </span>
                  <span className="font-medium">
                    {t("totals.duration_value", { duration: totalDuration })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t("totals.price_range")}:
                  </span>
                  <span className="font-medium">
                    {t("totals.price_value", { price: calculateTotalPrice() })}
                  </span>
                </div>
              </div>
              {children}
            </div>
            <div className="text-sm font-medium bg-primary/10 p-4 border rounded-lg flex items-center gap-2">
              <InfoIcon className="w-8 h-8 text-primary" />
              {tCommon("pricing_note")}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

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
import { useTranslations, useLocale } from "next-intl";

export default function Step1() {
  const t = useTranslations("booking_step1");
  const locale = useLocale();
  const { data: services, isLoading: servicesLoading } = useServices();
  console.log("services:", services);
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

    // Calculate services total - now using the simplified pricing structure
    const servicesTotal = selectedServicesWithTypes.reduce(
      (total, selected) => {
        const service = services.find(
          (s: Service) => s._id === selected.serviceId
        );
        if (!service) return total;
        // Use the new basePrice structure
        const price = service.pricing.basePrice || 0;
        // Add vehicle-specific markup if needed
        return total + price;
      },
      0
    );

    // Calculate add-ons total (this remains the same)
    const addOnsTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a: AddOn) => a._id === addOnId);
      return total + (addOn?.additionalPrice.minBasePrice || 0);
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
          <Card>
            <CardHeader>
              <CardTitle>{t("selected_service.title")}</CardTitle>
              <CardDescription>
                {t("selected_service.description")}
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
                    {selectedService.name[locale]}
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
                              {t("selected_service.duration", {
                                duration:
                                  selectedService.duration[
                                    selected.vehicleType
                                  ],
                              })}
                            </p>
                          </div>
                          <Badge variant="default">
                            {t("selected_service.price", {
                              price: selectedService.pricing.basePrice,
                            })}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  {t("selected_service.no_service")}
                </div>
              )}
            </CardContent>
          </Card>

          {selectedService &&
            selectedService.name["en"] !== "SWIFT VIP PRESTIGE PACKAGE" &&
            selectedService.name["am"] !== "ስዊፍት VIP ክብር ጥቅል" && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("addons.title")}</CardTitle>
                  <CardDescription>{t("addons.description")}</CardDescription>
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
                        className={`p-4 border rounded-lg cursor-pointer space-y-4 transition-all duration-200 ${
                          selectedAddOns.includes(addon._id)
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex flex-col gap-2 ">
                          <div className="flex w-full justify-between gap-1">
                            <h3 className="font-medium">
                              {addon.optionName[locale]}
                            </h3>
                            <Badge
                              className="text-xs whitespace-nowrap"
                              variant={
                                selectedAddOns.includes(addon._id)
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {t("addons.price_range", {
                                min: addon.additionalPrice?.minBasePrice ?? 0,
                                currency: t("addons.currency"),
                                max: addon.additionalPrice?.maxPrice
                                  ? `${addon.additionalPrice.maxPrice} ${t(
                                      "addons.currency"
                                    )}`
                                  : t("addons.no_max_price"),
                              })}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {addon.description[locale]}
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {t("addons.duration", { duration: addon.duration })}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-4 text-muted-foreground">
                      {t("addons.no_addons")}
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
            {t("continue_button")}
          </Button>
        </BookingSummary>
      </div>
    </div>
  );
}

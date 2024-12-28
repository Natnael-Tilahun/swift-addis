"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { ArrowLeftIcon, PhoneIcon, MailIcon } from "lucide-react";
import { useBookingStore } from "@/store/useBookingStore";
import { Separator } from "@/components/ui/separator";
import type { Service, AddOn } from "@/types/type";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function ServiceDetails({
  service,
  addOns,
}: {
  service: Service;
  addOns: AddOn[];
}) {
  const t = useTranslations("service_details");
  const router = useRouter();
  const {
    selectedServicesWithTypes,
    setSelectedServicesWithTypes,
    setLockedVehicleType,
    setSelectedAddOns,
  } = useBookingStore();

  const handleServiceSelection = (type: string) => {
    // Create a new service selection with the current service and type
    const newSelection = { serviceId: service._id, vehicleType: type };

    // Replace any existing selection with the new one
    setSelectedServicesWithTypes([newSelection]);
    setLockedVehicleType(type);

    // Clear previously selected add-ons
    setSelectedAddOns([]);

    // Navigate to booking page
    router.push(`/booking?serviceId=${service._id}&step=1&carType=${type}`);
  };

  // Check if this service is selected
  const selectedType =
    selectedServicesWithTypes[0]?.serviceId === service._id
      ? selectedServicesWithTypes[0]?.vehicleType
      : null;

  return (
    <div className="w-full h-full p-5 pb-16 lg:p-14 lg:pb-24 xl:pt-8 xl:pb-36 xl:px-36 space-y-8">
      <Link
        href="/#services"
        className="text-primary flex items-center bg-gray-100 rounded-xl py-2 px-4 gap-2 hover:bg-gray-200 w-fit"
      >
        <ArrowLeftIcon className="w-5 h-5" /> {t("navigation.back")}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Left column - Service details */}
        <div className="space-y-8 flex md:col-span-3 col-span-1 flex-col">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <Image
              src={service.image || "/placeholder.jpg"}
              alt={service.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-xl font-semibold">{service.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {service.description}
              </p>
            </div>
            {service?.features && service?.features?.length > 0 && (
              <div key={service._id} className="space-y-2">
                <h2 className="font-medium">{t("sections.features")}</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {service.features.map((feature: string, index: number) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.name !== "CORPORATE FLEET PACKAGE" && (
              <>
                <Separator />
                {addOns && addOns?.length > 0 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">{t("sections.addons.title")}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t("sections.addons.description")}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {addOns.map(
                        ({
                          optionName,
                          description,
                          features,
                          duration,
                          additionalPrice,
                          _id,
                        }: AddOn) => (
                          <div key={_id} className={`p-4 border rounded-lg`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{optionName}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {description}
                                </p>
                                {features && (
                                  <ul className="mt-2 space-y-1">
                                    {features.map((feature, index) => (
                                      <li
                                        key={index}
                                        className="text-sm text-muted-foreground flex items-center gap-2"
                                      >
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-muted-foreground">
                              {t("sections.addons.duration", { duration })}
                            </div>
                            <div className="mt-2 text-sm text-muted-foreground">
                              {t("sections.addons.price", { 
                                min: additionalPrice?.minBasePrice ?? 0,
                                max: additionalPrice?.maxPrice ?? 0 
                              })}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right column - Vehicle selection or Contact Info */}
        <Card className="flex md:col-span-2 col-span-1 flex-col gap-4 p-6 h-fit">
          {service.name === "CORPORATE FLEET PACKAGE" ? (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold">{t("corporate.title")}</h1>
              <hr />
              <div className="space-y-4">
                <p className="text-muted-foreground">{t("corporate.description")}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="w-5 h-5 text-primary" />
                    <a href={`tel:${t("corporate.contact.phone")}`} className="hover:text-primary">
                      {t("corporate.contact.phone")}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MailIcon className="w-5 h-5 text-primary" />
                    <a href={`mailto:${t("corporate.contact.email")}`} className="hover:text-primary">
                      {t("corporate.contact.email")}
                    </a>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/#contact">{t("corporate.button")}</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">{t("vehicle_selection.title")}</h1>
              <hr />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-lg font-medium">{t("vehicle_selection.pricing.title")}</h1>
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(service.pricing).map(
                      ([vehicleType, prices]) => (
                        <div
                          key={vehicleType}
                          onClick={() => handleServiceSelection(vehicleType)}
                          className={`p-4 border rounded-lg space-y-2 cursor-pointer transition-all duration-200 
                          ${
                            selectedType === vehicleType
                              ? "border-primary bg-primary/5"
                              : "hover:border-primary hover:bg-gray-50"
                          }`}
                        >
                          <p className="font-medium text-lg">{vehicleType}</p>
                          <div className="space-y-1 text-muted-foreground">
                            <p className="flex justify-between">
                              <span>{t("vehicle_selection.pricing.price_range")}</span>
                              <span className="text-primary font-medium">
                                {t("vehicle_selection.pricing.price_value", {
                                  min: prices.basePrice,
                                  max: prices.maxPrice
                                })}
                              </span>
                            </p>
                            <p className="flex justify-between">
                              <span>{t("vehicle_selection.pricing.duration")}</span>
                              <span className="text-primary font-medium">
                                {t("vehicle_selection.pricing.duration_value", {
                                  duration: service.duration[vehicleType]
                                })}
                              </span>
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

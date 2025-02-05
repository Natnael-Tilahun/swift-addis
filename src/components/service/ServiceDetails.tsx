"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { ArrowLeftIcon, PhoneIcon, MailIcon, InfoIcon } from "lucide-react";
import { useBookingStore } from "@/store/useBookingStore";
import { Separator } from "@/components/ui/separator";
import type { Service, AddOn } from "@/types/type";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import Head from "next/head";
export default function ServiceDetails({
  service,
  addOns,
}: {
  service: Service;
  addOns: AddOn[];
}) {
  const t = useTranslations("service_details");
  const tCommon = useTranslations("common");
  const locale = useLocale();
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
    <>
      <Head>
        <title>{service.name[locale]} | Swift Addis</title>
        <meta name="description" content={service.description[locale]} />
        <meta name="image" content={service.image || "/basicwash.png"} />
      </Head>
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
                src={service.image || "/basicwash.png"}
                alt={service.name[locale]}
                fill
                priority={true}
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-xl font-semibold">
                  {service.name[locale]}
                </h1>
                <p className="text-base text-muted-foreground mt-1">
                  {service.description[locale]}
                </p>
              </div>
              {service?.features && service?.features[locale]?.length > 0 && (
                <div key={service._id} className="space-y-2">
                  <h2 className="font-medium">{t("sections.features")}</h2>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {service.features[locale]?.map(
                      (feature: string, index: number) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {service.name["en"] !== "CORPORATE FLEET PACKAGE" &&
                service.name["am"] !== "የድርጅት ጥቅል" &&
                service.name["en"] !== "SWIFT VIP PRESTIGE PACKAGE" &&
                service.name["am"] !== "ስዊፍት VIP ክብር ጥቅል" &&
                service.name["en"] !== "SWIFT MONTHLY PACKAGE" &&
                service.name["am"] !== "ስዊፍት ወርሃዊ ጥቅል" &&
                service.name["en"] !==
                  "SWIFT ADVANCED DETAILING PACKAGE (FULL INTERIOR & EXTERIOR)" &&
                service.name["am"] !==
                  "ስዊፍት ሙሉ የመኪና አጥበት ከፖሊሽንግ እና 1 አመት ከሚቆይ ዋክስ ጋር  (ሙሉ የውስጥ እና ውጫዊ)" && (
                  <>
                    <Separator />
                    {addOns && addOns?.length > 0 && (
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h2 className="text-xl font-semibold">
                            {t("sections.addons.title")}
                          </h2>
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
                              <div
                                key={_id}
                                className={`p-4 border rounded-lg`}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium">
                                      {optionName[locale]}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {description[locale]}
                                    </p>
                                    {features && (
                                      <ul className="mt-2 space-y-1">
                                        {features[locale]?.map(
                                          (feature: string, index: number) => (
                                            <li
                                              key={index}
                                              className="text-sm text-muted-foreground flex items-center gap-2"
                                            >
                                              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                                              {feature}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    )}
                                  </div>
                                </div>
                                <div className="mt-2 text-sm text-muted-foreground">
                                  {t("sections.addons.duration", { duration })}
                                </div>
                                <div className="mt-2 text-sm text-muted-foreground">
                                  {optionName[locale] ===
                                    "Car polishing and waxing" ||
                                  optionName[locale] === "ፖሊሺንግ አና ዋክስ" ||
                                  optionName[locale] === "Paint Correction" ||
                                  optionName[locale] === "የቀለም እርማት" ||
                                  optionName[locale] ===
                                    "Advanced Glass coating and polishing" ||
                                  optionName[locale] ===
                                    "የመስታወት ፖሊሽንግ እና ዋክስ ስራ" ||
                                  optionName[locale] === "Ceramic Coating" ||
                                  optionName[locale] === "የሴራሚክ ሽፋን" ||
                                  optionName[locale] === "Paint Correction" ||
                                  optionName[locale] === "የቀለም እርማት"
                                    ? t("sections.addons.price", {
                                        min: additionalPrice?.minBasePrice ?? 0,
                                        currency: t("sections.addons.currency"),
                                        max: additionalPrice?.maxPrice
                                          ? `${additionalPrice.maxPrice} ${t(
                                              "sections.addons.currency"
                                            )}`
                                          : t("sections.addons.no_max_price"),
                                      })
                                    : t("sections.addons.fixed_price", {
                                        price: additionalPrice?.minBasePrice,
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
            {service.name[locale] === "CORPORATE FLEET PACKAGE" ||
            service.name[locale] === "የድርጅት ጥቅል" ||
            service.name[locale] === "SWIFT VIP PRESTIGE PACKAGE" ||
            service.name[locale] === "ስዊፍት VIP ክብር ጥቅል" ||
            service.name[locale] === "SWIFT MONTHLY PACKAGE" ||
            service.name[locale] === "ስዊፍት ወርሃዊ ጥቅል" ? (
              <div className="space-y-6">
                <h1 className="text-2xl font-semibold">
                  {t("corporate.title")}
                </h1>
                <hr />
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    {t("corporate.description")}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-5 h-5 text-primary" />
                      <a
                        href={`tel:${t("corporate.contact.phone")}`}
                        className="hover:text-primary"
                      >
                        0987963123
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-5 h-5 text-primary" />
                      <a
                        href={`tel:${t("corporate.contact.phone")}`}
                        className="hover:text-primary"
                      >
                        0987268123
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-5 h-5 text-primary" />
                      <a
                        href={`tel:${t("corporate.contact.phone")}`}
                        className="hover:text-primary"
                      >
                        0995090852
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MailIcon className="w-5 h-5 text-primary" />
                      <a
                        href={`mailto:${t("corporate.contact.email")}`}
                        className="hover:text-primary"
                      >
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
                <h1 className="text-2xl font-semibold">
                  {t("vehicle_selection.title")}
                </h1>
                <hr />
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    {service.pricing && (
                      <p className="text-base text-muted-foreground">
                        {t("vehicle_selection.pricing.price_range")}{" "}
                        <span className="font-bold">
                          {t("vehicle_selection.pricing.price_value", {
                            min: service.pricing.basePrice,
                          })}
                        </span>
                      </p>
                    )}
                    <h1 className="text-base font-medium text-muted-foreground">
                      {t("vehicle_selection.pricing.title")}:
                    </h1>
                    <div className="grid grid-cols-1 gap-4">
                      {service?.duration &&
                        Object.entries(service.duration).map(
                          ([vehicleType]) => (
                            <div
                              key={vehicleType}
                              onClick={() =>
                                handleServiceSelection(vehicleType)
                              }
                              className={`p-4 border border-primary/40 shadow-md rounded-lg space-y-2 cursor-pointer transition-all duration-200 
                          ${
                            selectedType === vehicleType
                              ? "border-primary bg-primary/10"
                              : "hover:border-primary hover:bg-gray-50"
                          }`}
                            >
                              <p className="font-medium text-lg">
                                {vehicleType}
                              </p>
                              <div className="space-y-1 text-muted-foreground">
                                <p className="flex justify-between">
                                  <span>
                                    {t("vehicle_selection.pricing.duration")}
                                  </span>
                                  <span className="text-primary font-medium">
                                    {t(
                                      "vehicle_selection.pricing.duration_value",
                                      {
                                        duration: service.duration[vehicleType],
                                      }
                                    )}
                                  </span>
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      <div className="text-sm font-medium bg-primary/10 p-4 border rounded-lg flex items-center gap-2">
                        <InfoIcon className="w-8 h-8 text-primary" />
                        {tCommon("pricing_note")}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

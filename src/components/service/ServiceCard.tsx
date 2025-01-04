"use client";
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Service } from "@/types/type";
import { useTranslations, useLocale } from "next-intl";

export default function ServiceCard({ services }: { services: Service[] }) {
  const t = useTranslations("services");
  const locale = useLocale();
  const plugin = useRef(
    Autoplay({
      delay: 3000,
      playOnInit: true,
      stopOnInteraction: false,
      stopOnFocusIn: true,
      stopOnMouseEnter: true,
    })
  );
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div
      className="md:container xl:min-w-full md:px-14 lg:px-16 h-fit min-h-[50vh] p-5 py-16 lg:py-14 xl:py-20 flex flex-col gap-8 mx-auto bg-[#EDF2FF]/30 relative -mt-20"
      id="services"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-bold text-center">{t("title")}</h1>
        <p className="text-muted-foreground text-center">{t("subtitle")}</p>
      </div>
      {services.length > 0 ? (
        <Carousel
          key={services.map((item) => item._id).join(",")}
          setApi={setApi}
          plugins={[plugin.current]}
          className="min-w-full max-w-xs z-40"
        >
          <CarouselContent className="-ml-4 md:-ml-12 lg:-ml-20 xl:-ml-24 py-4 md:py-12 md:px-6 lg:px-16 xl:px-20">
            {services.map((service, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:pl-12 lg:pl-8 basis-full sm:basis-1/2 md:basis-[50%] xl:basis-[30%]"
              >
                <Card
                  className={`bg- glassmorphism-card overflow-hidden h-full w-full flex flex-col bg-white transition transform duration-300 hover:scale-105 rounded-2xl ${
                    service.tag == "Popular" ? "bg-black text-white" : ""
                  }`}
                >
                  <div className="relative w-full pt-[50%]">
                    <Image
                      src={service.image || "/placeholder.jpg"}
                      alt={service.name[locale] || service.name["en"]}
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="absolute top-0 left-0 w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                    {service?.tag && (
                      <div
                        className={`absolute top-2  left-2 px-3 py-1 bg-slate-50 text-black rounded-full text-xs font-bold`}
                      >
                        {service.tag}
                      </div>
                    )}

                    {service.name[locale] !== "CORPORATE FLEET PACKAGE" &&
                      service.name[locale] !== "የድርጅት ጥቅል" &&
                      service.name[locale] !== "SWIFT MONTHLY PACKAGE" &&
                      service.name[locale] !== "ስዊፍት ወርሃዊ ጥቅል" && (
                        <div className="absolute bottom-2 right-2 bg-[#e5eafd] text-black opacity-90 p-2 whitespace-nowrap rounded-lg text-center">
                          <h4 className="text-sm font-bold ">
                            {t("price_range", {
                              min: service.pricing?.basePrice,
                              max: service.pricing?.maxPrice,
                            })}
                          </h4>
                          <p className="text-sm font-medium whitespace-nowrap">
                            {t("duration", {
                              time: service.duration?.["AUTO"],
                            })}
                          </p>
                        </div>
                      )}
                  </div>

                  <div className="p-5 md:p-6 space-y-5 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-center">
                      <div>
                        <Link
                          href={`/services/${service._id}`}
                          className={`text-xl font-bold hover:text-primary ${
                            service.tag == "Popular"
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          {service.name[locale]}
                        </Link>
                      </div>
                    </div>
                    <p
                      className={` text-sm  ${
                        service?.tag == "Popular"
                          ? "text-white"
                          : "text-secondary-foreground"
                      }`}
                    >
                      {service?.description[locale]}
                    </p>
                    {service.features && service.features[locale] && (
                      <ul className="space-y-4">
                        {service.features[locale]
                          .slice(0, 3)
                          .map((feature, index) => (
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

                    <div className="w-full h-full flex flex-col gap-1">
                      <Button
                        className="w-full py-6 mt-auto font-bold text-lg"
                        asChild
                      >
                        <Link
                          href={`/services/${service._id}`}
                          className="w-full"
                        >
                          {service.name[locale] === "CORPORATE FLEET PACKAGE" ||
                          service.name[locale] === "የድርጅት ጥቅል"
                            ? t("get_quote")
                            : t("view_details")}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:block" />
          <CarouselNext className="hidden md:block" />
          <div className="md:py-2 py-4 flex justify-center max-w-xs md:max-w-full gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index + 1 === current
                    ? "bg-primary w-4"
                    : "bg-muted-foreground/30"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={t("slide_label", { number: index + 1 })}
              />
            ))}
          </div>
        </Carousel>
      ) : (
        <div className="flex flex-col items-center justify-center h-[40vh] border rounded-xl w-full">
          <p className="text-center text-muted-foreground text-xl font-medium">
            {t("no_services")}
          </p>
        </div>
      )}
      <div className="md:w-[100%] w-1/2 h-1/2 md:h-full bg-groupsvg2 lg:block absolute left-0 top-0 -z-0 opacity-100"></div>
    </div>
  );
}

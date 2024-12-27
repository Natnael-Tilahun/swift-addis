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

export default function ServiceCard({ services }: { services: Service[] }) {
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
      className="w-full h-fit min-h-[50vh] p-5 py-16 lg:p-14 xl:py-20 flex flex-col gap-8 mx-auto bg-[#EDF2FF]/30 relative -mt-20"
      id="services"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-bold text-center">Our Services</h1>
        <p className="text-muted-foreground text-center">
          We offer a wide range of services to keep your car looking its best.
        </p>
      </div>
      {services.length > 0 ? (
        <Carousel
          key={services.map((item) => item._id).join(",")}
          setApi={setApi}
          plugins={[plugin.current]}
          className="md:max-w-full max-w-xs z-40"
        >
          <CarouselContent className="-ml-4 md:-ml-12 lg:-ml-20 py-4 md:py-12 md:px-6 lg:px-16">
            {services.map((service, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:pl-12 lg:pl-8 basis-full sm:basis-1/2 md:basis-[30%] lg:basis-[32%]"
              >
                <Card
                  className={`bg- glassmorphism-card overflow-hidden h-full w-full flex flex-col bg-white transition transform duration-300 hover:scale-105 rounded-2xl ${
                    service.tag == "Popular" ? "bg-black text-white" : ""
                  }`}
                >
                  <div className="relative w-full pt-[50%]">
                    <Image
                      src={service.image || "/placeholder.jpg"}
                      alt={service.name}
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

                    {service.name !== "CORPORATE FLEET PACKAGE" && (
                      <div className="absolute bottom-2 right-2 bg-[#e5eafd] text-black opacity-90 p-2 whitespace-nowrap rounded-lg text-center">
                        <h4 className="text-base font-bold ">
                          {service.pricing?.["AUTO"]?.basePrice} -{" "}
                          {service.pricing?.["AUTO"]?.maxPrice} Birr
                        </h4>
                        <p className="text-sm font-medium whitespace-nowrap">
                          {service.duration?.["AUTO"]} min
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
                          {service.name}
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
                      {service?.description}
                    </p>
                    <ul className="space-y-4">
                      {service?.features?.slice(0, 3).map((feature, index) => (
                        <li
                          className={`text-sm flex items-start ${
                            service.tag == "Popular" ? "text-white" : ""
                          }`}
                          key={index}
                        >
                          <div
                            className={`bg-black rounded-full p-1 ${
                              service.tag == "Popular" ? "bg-white" : "bg-black"
                            }`}
                          >
                            <svg
                              className={`flex-shrink-0 h-4 w-4 ${
                                service.tag == "Popular"
                                  ? "text-indigo-900"
                                  : "text-white"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>

                          <span className="ml-3 text-sm">{feature} </span>
                        </li>
                      ))}
                      {/* {service?.features && service?.features?.length > 3 && (
                        <Link
                          href={`/services/${service._id}`}
                          className="text-base text-primary hover:underline px-8 block"
                        >
                          ... view {service?.features?.length - 3} more
                        </Link>
                      )} */}
                    </ul>

                    <div className="w-full h-full flex flex-col gap-1">
                      <Button
                        className="w-full py-6 mt-auto font-bold text-lg"
                        asChild
                      >
                        <Link
                          href={`/services/${service._id}`}
                          className="w-full"
                        >
                          {service.name === "CORPORATE FLEET PACKAGE"
                            ? "Get Quote"
                            : "View Details"}
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
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      ) : (
        <div className="flex flex-col items-center justify-center h-[40vh] border rounded-xl w-full">
          <p className="text-center text-muted-foreground text-xl font-medium">
            No services found
          </p>
        </div>
      )}
      <div className="md:w-[100%] w-1/2 h-1/2 md:h-full bg-groupsvg2 lg:block absolute left-0 top-0 -z-0 opacity-100"></div>
    </div>
  );
}

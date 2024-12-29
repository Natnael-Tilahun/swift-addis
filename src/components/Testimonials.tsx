"use client";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Move testimonials data outside component
const testimonialIds = [
  { id: 1, role: "developer" },
  { id: 2, role: "ceo" },
  { id: 3, role: "developer" },
  { id: 4, role: "developer" },
  { id: 5, role: "developer" },
];

export default function Testimonials() {
  const t = useTranslations("testimonials");

  const plugin = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      playOnInit: true,
      stopOnFocusIn: true,
      stopOnMouseEnter: true,
    })
  );

  return (
    <div
      className="w-full md:container xl:min-w-full h-fit py-12 flex flex-col gap-8 bg-[#FAFAFA] relative"
      id="testimonials"
    >
      <h1 className="text-4xl mb-2 md:mb-12 font-bold text-center">
        {t("title")}
      </h1>
      {testimonialIds.length > 0 ? (
        <Carousel
          key={testimonialIds.map((item) => item.id).join(",")}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="md:max-w-full max-w-sm z-40 px-4"
        >
          <CarouselContent className="md:-ml-1 ml-5 w-full">
            {testimonialIds.map((item, index) => (
              <CarouselItem
                key={index}
                className={`md:pl-6 xl:pl-10 pl-4 basis-full md:basis-2/5 ${
                  index === 0 ? "pl-0" : ""
                }`}
              >
                <Card
                  className={`bg-primary/10 ${
                    index % 2 === 0 ? "bg-[#EDF2FF]/70" : "bg-[#FFECF3]/50"
                  } `}
                >
                  <CardContent className="flex flex-col gap-16 justify-between p-5 md:p-8">
                    <div className="flex flex-col gap-8">
                      <Icons.rectangle
                        fill={index % 2 === 0 ? "blue" : "red"}
                        className="w-10 h-10"
                      />
                      <p className="text-secondary-foreground">
                        {t("mock.content")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/avatar.jpeg"
                        alt={t("mock.name")}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div className="flex flex-col gap-1">
                        <p className="font-medium text-base">
                          {t("mock.name")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t(`mock.role.${item.role}`)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <p>{t("no_testimonials")}</p>
      )}
      <div className="md:w-[100%] w-1/2 h-1/2 md:h-full bg-groupsvg2 lg:block absolute left-0 top-0 -z-0 opacity-100"></div>
    </div>
  );
}

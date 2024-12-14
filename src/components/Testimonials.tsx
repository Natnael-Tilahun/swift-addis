"use client";
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Icons } from "@/components/icons";
import Image from "next/image";
export default function Testimonials() {
  // const [api, setApi] = useState<CarouselApi>();
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [testimonials] = useState([
    {
      id: 1,
      name: "John Doe",
      image: "/avatar.jpeg",
      testimonial:
        "Our customers love the seamless integration and automation capabilities provided by Automatisera platform. It has greatly improved their overall experience and satisfaction.",
      rating: 5,
      role: "Developer",
    },
    {
      id: 2,
      name: "John Doe",
      image: "/avatar.jpeg",
      testimonial:
        "Our customers love the seamless integration and automation capabilities provided by Automatisera platform. It has greatly improved their overall experience and satisfaction.",
      rating: 5,
      role: "CEO",
    },
    {
      id: 3,
      name: "John Doe",
      image: "/avatar.jpeg",
      testimonial:
        "Our customers love the seamless integration and automation capabilities provided by Automatisera platform. It has greatly improved their overall experience and satisfaction.",
      rating: 5,
      role: "Developer",
    },
    {
      id: 4,
      name: "John Doe",
      image: "/avatar.jpeg",
      testimonial:
        "Our customers love the seamless integration and automation capabilities provided by Automatisera platform. It has greatly improved their overall experience and satisfaction.",
      rating: 5,
      role: "Developer",
    },
    {
      id: 5,
      name: "John Doe",
      image: "/avatar.jpeg",
      testimonial:
        "Our customers love the seamless integration and automation capabilities provided by Automatisera platform. It has greatly improved their overall experience and satisfaction.",
      rating: 5,
      role: "Developer",
    },
  ]);

  return (
    <div
      className="w-full h-fit py-10 lg:py-14 xl:py-20 flex flex-col gap-8 bg-[#FAFAFA] relative"
      id="testimonials"
    >
      <h1 className="text-4xl font-bold text-center">Testimonials</h1>
      {testimonials.length > 0 ? (
        <Carousel
          key={testimonials.map((item) => item.id).join(",")}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="md:max-w-full max-w-sm z-40"
        >
          <CarouselContent className="md:-ml-1 ml-5 w-full">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:pl-10  md:basis-2/5">
                <Card
                  className={`bg-primary/10 ${
                    index % 2 === 0 ? "bg-[#EDF2FF]" : "bg-[#FFECF3]"
                  }`}
                >
                  <CardContent className="flex flex-col gap-16 justify-between p-8">
                    <div className="flex flex-col gap-8">
                      <Icons.rectangle
                        fill={index % 2 === 0 ? "blue" : "red"}
                        className="w-10 h-10"
                      />
                      <p className="text-secondary-foreground">
                        {testimonial.testimonial}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div className="flex flex-col gap-1">
                        <p className="font-medium text-base">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
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
        <p>No testimonials found</p>
      )}
      <div className="md:w-[100%] w-1/2 h-1/2 md:h-full bg-groupsvg2 lg:block absolute left-0 top-0 -z-0 opacity-100"></div>
    </div>
  );
}

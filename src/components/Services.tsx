"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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
import { Icons } from "@/components/icons";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";
import Link from "next/link";
interface Service {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  serviceTime: string;
}

export default function Services() {
  const [api, setApi] = useState<CarouselApi>();
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [services, setServices] = useState<Service[]>([
    {
      id: 2,
      name: "SWIFT INTERIOR DETAILING (FOR INTERIOR-ONLY SERVICE)",
      image: "/carwash.jpeg",
      description:
        "This package focuses solely on the interior of the vehicle.",
      price: "2,999 – 3,999",
      serviceTime: " 1 hr. 30 min +",
      features: [
        "Full interior vacuuming Vacuum floors and trunk area Vacuum cloth seats",
        "Full interior steam cleaning (seats, carpets, dashboard, mats, and headliner)",
        "Shampoo cloth floor mats, cloth seats, carpeting in cabin and trunk",
        "Wiping down and dusting dashboard, plastic floor mats consoles, and door panels",
        "Cleaning of air vents",
        "Upholstery cleaning (fabric shampoo or leather care)",
        "Floor mats cleaning",
        "Glass cleaning inside and out",
        "Wipe leather seats down and condition leather seats",
        "Clean console, cup holders, crevices and vents",
        "Clean dash and UV protect",
        "Clean seat belt and steering wheel",
        "Clean all interior trim and plastics",
        "Clean door jambs and condition door panels and pockets",
        "Clean vehicle headliner Odor removal treatment",
        "Air Freshener",
      ],
      addOns: [
        {
          id: "addon2",
          name: "Advanced Glass coating",
          price: "999 – 1,999",
          description: "",
          features: [
            "Advanced nano-technology formulation",
            "Provides a durable barrier on glass surfaces",
            "Shields against environmental contaminants",
            " Enhances clarity and transparency",
            "Improves visibility during adverse weather conditions",
            "Reduces glare for safer driving",
            "Easy application and quick drying",
            "Long-lasting protection for extended durability",
            "Compatible with all types of automotive glass",
            "Adds a sleek and glossy finish to windows",
          ],
          serviceTime: "00:30",
        },
      ],
    },
    {
      id: 1,
      name: "SWIFT BASIC WASH PACKAGE",
      image: "/carwash.jpeg",
      description:
        "This will be an affordable, entry-level package that can be regular cleaning for customers if they need it",
      price: "1,599 – 1,999",
      features: [
        "Exterior wash (hand wash and handles wash)",
        "Rims and tire cleaning",
        "Window cleaning (inside and outside)",
        "Drying the exterior",
        "Wheel well cleaning",
        "Interior vacuuming and dusting",
        "Cleaning of dashboard, vents, and door panels",
        "Cleaning and conditioning of seats (fabric or leather)",
        "Cleaning of the trunk area",
      ],
      serviceTime: "1 hr. 30 min+",
      addOns: [
        {
          id: "addon1",
          name: "Waxing and polishing for exterior protection",
          description: "",
          price: "999",
          serviceTime: "00:30",
          features: [],
        },
      ],
      tag: "Popular",
    },
    {
      id: 3,
      name: "SWIFT EXTERIOR DETAILING (FOR EXTERIOR-ONLY SERVICE)",
      image: "/carwash.jpeg",
      description:
        "This package focuses solely on the exterior of the vehicle.",
      price: " 2,500 – 3,500",
      serviceTime: "1 hr. 30 min +",
      tag: "",
      features: [
        "Full Exterior Hand Wash: cleaning of the car’s body, windows, side mirrors, and other  exterior surfaces",
        "Rinse & Dry ",
        "Bug & Tar Removal",
        "Window Cleaning: Cleaning of all exterior windows and mirrors,",
        "Trim & Plastic Surface Cleaning",
        "Detailing of Door Jambs & Hinges",
        "Wheel and tire wash and cleaning ",
        "Tire Shine: polished look and protect them from cracking",
        "Exterior waxing or sealing (6-Month Wax)",
        "Polishing (restore the vehicle’s paintwork, remove minor swirl marks, scratches, or oxidation, and enhance its gloss).",
        "Headlight restoration ",
        "Clay bar treatment to remove contaminants",
        "Normal glass coating",
      ],
      addOns: [
        {
          id: "addon3",
          name: "Ceramic Coating",
          description: " (depending on the vehicle size and type of coating)",
          price: "20,000 – 30,000",
          serviceTime: "00:30",
          features: [],
        },
        {
          id: "addon4",
          name: "Paint Correction",
          description: " (depending on the vehicle size and type of coating)",
          price: "15,500 – 20,500",
          serviceTime: "00:30",
          features: [],
        },
      ],
    },
    {
      id: 4,
      name: "SWIFT WHOLE DETAILING PACKAGE (FULL INTERIOR & EXTERIOR)",
      image: "/carwash.jpeg",
      description:
        "This is the top package for customers who want their car to look like new, inside and out, with premium treatments and European standard products.",
      price: "5,999 – 8,999",
      serviceTime: "3 hr. 30min",
      tag: "",
      features: [
        "Everything in the swift exterior and interior package",
        "Comprehensive inspection of exterior and interior",
        "Full interior shampoo, Vacuuming and steam cleaning (seats, carpets, dashboard, mats, and headliner)",
        "Full exterior cleaning (washing with car shampoos and wax) ",
        "Window cleaning (inside and outside)",
        "Drying the exterior ",
        "Full exterior paint correction (removes scratches and swirl marks or paint sealant for longer protection)",
        "Full leather interior care (deep conditioning and protection for leather seats)",
        "Tire clean, shine and rim polishing",
        "Odor removal treatment",
        "Wheel well cleaning ",
        "Full engine cleaning with degreasing",
        "Checking and topping up of fluids including engine oil, coolant, and windshield washer fluid",
        "Tailored maintenance plan based on the specific needs of your vehicle.",
        "Inspection and adjustment of tire pressure",
        "Lubrication of door hinges and locks (IF NEEDED)",
      ],
      addOns: [
        {
          id: "addon5",
          name: "Waxing and polishing for exterior protection ",
          description: "",
          price: "10,000 – 20,000",
          serviceTime: "00:30",
          features: [],
        },
        {
          id: "addon6",
          name: " Polishing of headlights and taillights",
          description: "",
          price: "10,500 – 20,000",
          serviceTime: "00:30",
          features: [],
        },
        {
          id: "addon7",
          name: " Ceramic coating for long-lasting exterior protection ",
          description: "",
          price: "10,500 – 20,000",
          serviceTime: "00:30",
          features: [],
        },
        {
          id: "addon8",
          name: " Clay bar treatment (removes contaminants from the paint)",
          description: "",
          price: "10,500 – 20,000",
          serviceTime: "00:30",
          features: [],
        },
      ],
    },
    {
      id: 5,
      name: "SWIFT VIP PRESTIGE PACKAGE",
      image: "/carwash.jpeg",
      description:
        "Luxury car owners and professionals who demand luxury service",
      price: "7,000 - 12,000",
      serviceTime: "6:00",
      tag: "",
      features: [
        "Everything in the swift whole package",
        "Deep upholstery shampooing (fabric or leather)",
        "Leather conditioning (if applicable)",
        "Clay bar treatment for exterior",
        "Polishing for minor scratches",
        "Air freshener and odor elimination",
        "Engine bay cleaning",
        "Paint sealant or ceramic coating for long-term protection",
        "Nano glass treatment (water repellent for windows)",
        "Wheel rim polishing",
        "Customized attention to high-end interiors",
      ],
      addOns: [],
    },
    {
      id: 6,
      name: "CORPORATE FLEET PACKAGE",
      image: "/carwash.jpeg",
      description:
        "Custom Pricing (Based on Fleet Size), Target Customers: Companies with multiple vehicles",
      price: "-",
      serviceTime: "-",
      tag: "",
      features: [
        "Regular exterior and interior cleaning",
        "Fleet inspection reports (optional)",
        "Discounts for bulk or recurring contracts",
      ],
      addOns: [],
    },
  ]);

  return (
    <div
      className="w-full h-fit p-5 lg:p-14 xl:pt-20 flex flex-col gap-8 mx-auto bg-[#EDF2FF]/30 relative"
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
          key={services.map((item) => item.id).join(",")}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="md:max-w-full max-w-sm z-40"
        >
          <CarouselContent className="-ml-4 md:-ml-12 py-4 md:p-12">
            {services.map((service, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:pl-12 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
              >
                <Card
                  className={`bg- glassmorphism-card overflow-hidden h-full w-full flex flex-col bg-white transition transform duration-300 hover:scale-105 rounded-2xl ${
                    service.tag == "Popular" ? "bg-black text-white" : ""
                  }`}
                >
                  <div className="relative w-full pt-[50%]">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="absolute top-0 left-0 w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                    {service?.tag && (
                      <div
                        className={`absolute top-2  left-2 px-3 py-1 bg-slate-50 text-black rounded-full text-xs font-bold 
                     `}
                      >
                        {service.tag}
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 bg-[#FFECF3] text-black opacity-80 p-2 whitespace-nowrap rounded-lg text-center">
                      <h4 className="text-base font-bold ">
                        {service.price} Birr
                      </h4>
                      <p className="text-sm font-medium whitespace-nowrap">
                        {service.serviceTime}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 md:p-10 space-y-5 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4
                          className={`text-xl font-bold ${
                            service.tag == "Popular"
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          {service.name}
                        </h4>
                      </div>
                    </div>
                    <p
                      className={` text-sm  ${
                        service.tag == "Popular"
                          ? "text-white"
                          : "text-secondary-foreground"
                      }`}
                    >
                      {service.description}
                    </p>
                    <ul className="space-y-4">
                      {service.features?.slice(0, 3).map((feature, index) => (
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
                      {service.features && service.features.length > 3 && (
                        <Link
                          href={`/services/${service.id}`}
                          className="text-base text-primary hover:underline px-8 block"
                        >
                          ... view {service.features.length - 3} more
                        </Link>
                      )}
                    </ul>

                    <div className="w-full h-full flex flex-col gap-1">
                      {/* <p className="text-base flex items-center gap-1">
                        <Timer className=" w-5 h-5" />
                        <span>Hours Range:</span>
                        <span className="font-medium">
                          {" "}
                          {service.serviceTime}
                        </span>
                      </p>
                      <p className="text-base flex items-center gap-1">
                        <Timer className=" w-5 h-5" />
                        <span>Price Range:</span>
                        <span className="font-medium">
                          {" "}
                          ( {service.price} ) ETB
                        </span>
                      </p> */}
                      <Button
                        className="w-full py-6 mt-auto font-bold text-lg"
                        asChild
                      >
                        <Link
                          href={`/booking?serviceId=${service.id}&step=1`}
                          className="w-full"
                        >
                          Get Quote
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
        </Carousel>
      ) : (
        <p>No testimonials found</p>
      )}
      <div className="md:w-[100%] w-1/2 h-1/2 md:h-full bg-groupsvg2 lg:block absolute left-0 top-0 -z-0 opacity-100"></div>
    </div>
  );
}

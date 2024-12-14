"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [service, setService] = useState<Service>({
    id: 2,
    name: "SWIFT INTERIOR DETAILING (FOR INTERIOR-ONLY SERVICE)",
    image: "/carwash.jpeg",
    description: "This package focuses solely on the interior of the vehicle.",
    price: "2,999 – 3,999",
    serviceTime: " 1:30 hr",
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
  });
  return (
    <div className="w-full h-full  p-5 pb-16 lg:p-14 lg:pb-24 xl:pt-8 xl:pb-36 xl:px-36 space-y-8 ">
      <Link
        href="/#services"
        className="text-primary flex items-center bg-gray-100 rounded-xl py-2 px-4 gap-2 hover:bg-gray-200 w-fit"
      >
        <ArrowLeftIcon className="w-5 h-5" /> Back to Services
      </Link>
      <div className="grid grid-cols-3 gap-8">
        <div className=" space-y-8 flex col-span-2 flex-col justify-center">
          <div className="flex gap-4 items-center justify-between ">
            <div className="w-[400px] h-[200px] relative rounded-xl overflow-hidden">
              <Image
                alt={service.name}
                quality={100}
                fill={true}
                style={{ objectFit: "cover" }}
                src={service.image}
                priority={true}
                loading="eager"
                className=" hover:scale-105 transition-all duration-300"
              />
            </div>
            <h1 className="text-2xl w-full  font-bold text-center">
              {service.name}
            </h1>
          </div>
          <hr />
          <div className="flex flex-col gap-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Description</h1>
              <div
                className="text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Features</h1>
              <ul className="list-disc list-inside text-muted-foreground">
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Add Ons</h1>
              <ul className="list-disc list-inside text-muted-foreground">
                {service.addOns.map((addOn) => (
                  <li key={addOn.id}>
                    <span className="font-semibold">{addOn.name}</span>
                    <p className="px-5">Description: {addOn.description}</p>
                    <p className="px-5">Price: {addOn.price}</p>
                    <p className="px-5">Service Time: {addOn.serviceTime}</p>
                    <span className="px-5">
                      Features:
                      {addOn.features.map((feature) => (
                        <li className="px-5" key={feature}>
                          {feature}
                        </li>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Card className="flex flex-col gap-4 p-6 h-fit">
          <h1 className="text-2xl font-semibold">Details</h1>
          <hr />
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold">
              Price:{" "}
              <span className="font-normal text-base">
                {" "}
                {service.price} Birr
              </span>
            </h1>
            <h1 className="text-lg font-semibold">
              Service Time:{" "}
              <span className="font-normal text-base">
                {" "}
                {service.serviceTime} +
              </span>
            </h1>
            <Button className="w-full py-6 font-bold text-lg" asChild>
              <Link
                href={`/booking?serviceId=${service.id}&step=1`}
                className="w-full"
              >
                Book Now
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

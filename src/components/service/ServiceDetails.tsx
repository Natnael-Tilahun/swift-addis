"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import { useBookingStore } from "@/store/useBookingStore";
import { Separator } from "@/components/ui/separator";
import type { Service, AddOn } from "@/types/type";
export default function ServiceDetails({
  service,
  addOns,
}: {
  service: Service;
  addOns: AddOn[];
}) {
  const router = useRouter();
  const { setServiceIds, setVehicleDetails, service_ids } = useBookingStore();
  const handleServiceSelect = (vehicleType: string) => {
    if (service) {
      if (!service_ids.includes(service._id)) {
        setServiceIds([...service_ids, service._id]);
      }

      // Set vehicle details
      setVehicleDetails({
        carType: vehicleType,
        make: "",
        model: "",
        year: 0,
      });

      // Navigate to booking page
      router.push(`/booking?serviceId=${service._id}&step=1`);
    }
  };

  return (
    <div className="w-full h-full p-5 pb-16 lg:p-14 lg:pb-24 xl:pt-8 xl:pb-36 xl:px-36 space-y-8">
      <Link
        href="/#services"
        className="text-primary flex items-center bg-gray-100 rounded-xl py-2 px-4 gap-2 hover:bg-gray-200 w-fit"
      >
        <ArrowLeftIcon className="w-5 h-5" /> Back to Services
      </Link>

      <div className="grid grid-cols-5 gap-8">
        {/* Left column - Service details */}
        <div className="space-y-8 flex col-span-3 flex-col">
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
                <h2 className="font-medium">Features</h2>
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

            <Separator />

            {addOns && addOns?.length > 0 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">Available Add-ons</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enhance your service with these add-ons
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
                          Duration: {duration} min
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          Price: {additionalPrice} Birr
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column - Vehicle selection */}
        <Card className="flex col-span-2 flex-col gap-4 p-6 h-fit">
          <h1 className="text-2xl font-semibold">Select Vehicle Type</h1>
          <hr />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-medium">Price & Duration</h1>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(service.pricing).map(
                  ([vehicleType, prices]) => (
                    <div
                      key={vehicleType}
                      onClick={() => handleServiceSelect(vehicleType)}
                      className="p-4 border rounded-lg space-y-2 hover:border-primary hover:bg-gray-50 cursor-pointer transition-all duration-200"
                    >
                      <p className="font-medium text-lg">{vehicleType}</p>
                      <div className="space-y-1 text-muted-foreground">
                        <p className="flex justify-between">
                          <span>Price Range:</span>
                          <span className="text-primary font-medium">
                            {prices.basePrice} - {prices.maxPrice} Birr
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span>Duration:</span>
                          <span className="text-primary font-medium">
                            {service.duration[vehicleType]} minutes
                          </span>
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

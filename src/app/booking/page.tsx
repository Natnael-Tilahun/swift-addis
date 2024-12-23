"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Step1 from "@/components/booking/Step1";
import Step2 from "@/components/booking/Step2";
import Step3 from "@/components/booking/Step3";
import Step4 from "@/components/booking/Step4";
import { useSearchParams, useRouter } from "next/navigation";
import { useBookingStore } from "@/store/useBookingStore";
import { useEffect } from "react";
import { ArrowLeftIcon } from "lucide-react";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { step, setStep, selectedServicesWithTypes } = useBookingStore();

  // Sync URL step with store step
  useEffect(() => {
    const urlStep = searchParams.get("step");
    if (urlStep) {
      setStep(parseInt(urlStep));
    }
  }, [searchParams, setStep]);

  const handleTabChange = (value: string) => {
    const newStep = parseInt(value);
    setStep(newStep);
    router.push(`/booking?step=${newStep}`);
  };

  const handleBack = () => {
    if (step > 1) {
      // If we're beyond step 1, go back one step
      const newStep = step - 1;
      setStep(newStep);
      router.push(`/booking?step=${newStep}`);
    } else {
      // If we're on step 1, check if we came from a service detail page
      const serviceId = searchParams.get("serviceId");
      if (
        serviceId &&
        selectedServicesWithTypes.length === 1 &&
        selectedServicesWithTypes[0].serviceId === serviceId
      ) {
        // If we came from a service detail page, go back to that page
        router.push(`/services/${serviceId}`);
      } else {
        // Otherwise, go back to services list
        router.push("/#services");
      }
    }
  };

  return (
    <Tabs
      value={step.toString()}
      onValueChange={handleTabChange}
      className="w-full py-6"
    >
      <div className="flex items-center justify-between px-1">
        <Button
          variant="outline"
          className="flex items-center gap-2 hover:bg-gray-100"
          onClick={handleBack}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {step === 1
            ? searchParams.get("serviceId")
              ? "Back to Service Details"
              : "Back to Services"
            : "Previous Step"}
        </Button>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">Step {step}/4</p>
        </div>
      </div>
      <TabsList className="grid w-full h-fit grid-cols-4 overflow-x-scroll py-4 rounded- bg-transparent">
        <TabsTrigger
          value="1"
          disabled={step < 1}
          className={`h-full transition-all duration-200
              ${
                step >= 1
                  ? "data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-primary/10 data-[state=inactive]:text-primary"
                  : "data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-500"
              } border data-[state=inactive]:border-gray-400`}
        >
          <p
            className={`text-sm font-semibold rounded-full w-8 h-8 flex items-center justify-center
              ${
                step >= 1 ? "bg-primary text-white" : "bg-gray-400 text-white"
              }`}
          >
            1
          </p>
        </TabsTrigger>
        <TabsTrigger
          value="2"
          disabled={step < 2}
          className={`h-full transition-all duration-200
              ${
                step >= 2
                  ? "data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-primary/10 data-[state=inactive]:text-primary"
                  : "data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-500"
              } border data-[state=inactive]:border-gray-400`}
        >
          <p
            className={`text-sm font-semibold rounded-full w-8 h-8 flex items-center justify-center
              ${
                step >= 2 ? "bg-primary text-white" : "bg-gray-400 text-white"
              }`}
          >
            2
          </p>
        </TabsTrigger>
        <TabsTrigger
          value="3"
          disabled={step < 3}
          className={`h-full transition-all duration-200
              ${
                step >= 3
                  ? "data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-primary/10 data-[state=inactive]:text-primary"
                  : "data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-500"
              } border data-[state=inactive]:border-gray-400`}
        >
          <p
            className={`text-sm font-semibold rounded-full w-8 h-8 flex items-center justify-center
              ${
                step >= 3 ? "bg-primary text-white" : "bg-gray-400 text-white"
              }`}
          >
            3
          </p>
        </TabsTrigger>
        <TabsTrigger
          value="4"
          disabled={step < 4}
          className={`h-full transition-all duration-200
              ${
                step >= 4
                  ? "data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-primary/10 data-[state=inactive]:text-primary"
                  : "data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-500"
              } border data-[state=inactive]:border-gray-400`}
        >
          <p
            className={`text-sm font-semibold rounded-full w-8 h-8 flex items-center justify-center
              ${
                step >= 4 ? "bg-primary text-white" : "bg-gray-400 text-white"
              }`}
          >
            4
          </p>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="1">
        <Step1 />
      </TabsContent>
      <TabsContent value="2">
        <Step2 />
      </TabsContent>
      <TabsContent value="3">
        <Step3 />
      </TabsContent>
      <TabsContent value="4">
        <Step4 />
      </TabsContent>
    </Tabs>
  );
}

export default function Booking() {
  return (
    <div className="w-full h-full p-5 pb-16 lg:p-14 lg:pb-24 xl:pt-0 xl:pb-36 xl:px-36 space-y-8">
      <Suspense fallback={<div>Loading...</div>}>
        <BookingContent />
      </Suspense>
    </div>
  );
}

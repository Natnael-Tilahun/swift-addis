"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Step1 from "@/components/booking/Step1";
import Step2 from "@/components/booking/Step2";
import Step3 from "@/components/booking/Step3";
import { useRouter, useSearchParams } from "next/navigation";
export default function Booking({ params }: { params: { step: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  const serviceId = searchParams.get("serviceId");
  console.log("step: ", step);
  console.log("serviceId: ", serviceId);

  const [activeStep, setActiveStep] = useState(step ? parseInt(step) : 1);

  return (
    <div className="w-full h-full  p-5 pb-16 lg:p-14 lg:pb-24 xl:pt-0 xl:pb-36 xl:px-36 space-y-8 ">
      <Tabs defaultValue="1" className="w-full">
        <TabsList className="grid w-full h-fit grid-cols-4 overflow-x-scroll">
          <TabsTrigger
            value="1"
            disabled={activeStep !== 1}
            className="h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-500 border data-[state=inactive]:border-gray-400 disabled:text-white data-[state=inactive]:disabled:bg-primary "
          >
            <p className="text-sm font-semibold bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center ">
              1
            </p>
          </TabsTrigger>
          <TabsTrigger
            value="2"
            disabled={activeStep !== 2}
            className="h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-500 border data-[state=inactive]:border-gray-400 disabled:text-white data-[state=inactive]:disabled:bg-primary "
          >
            <p className="text-sm font-semibold bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
              2
            </p>
          </TabsTrigger>
          <TabsTrigger
            value="3"
            disabled={activeStep !== 3}
            className="h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-500 border data-[state=inactive]:border-gray-400 disabled:text-white data-[state=inactive]:disabled:bg-primary "
          >
            <p className="text-sm font-semibold bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
              3
            </p>
          </TabsTrigger>
          <TabsTrigger
            value="4"
            disabled={activeStep !== 4}
            className="h-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-500 border data-[state=inactive]:border-gray-400 disabled:text-white data-[state=inactive]:disabled:bg-primary "
          >
            <p className="text-sm font-semibold bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
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
        <TabsContent value="4" className="flex items-center justify-center">
          <Card className="w-1/2 h-[400px] flex flex-col items-center justify-center">
            <CardHeader className="flex flex-col items-center justify-center gap-8">
              <div className="bg-bookingSuccess w-40 h-24"></div>
              <CardTitle className="text-3xl font-semibold">
                Thank you for booking with us
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-8">
              <CardDescription>
                We will contact you soon to confirm the booking
              </CardDescription>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/">Back to home</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

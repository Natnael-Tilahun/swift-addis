"use client";

import { useBookingStore } from "@/store/useBookingStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useAvailableSlots } from "@/hooks/useAvailableSlots";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
export default function Step2() {
  const router = useRouter();
  const {
    appointmentDate,
    appointmentTime,
    setAppointmentDate,
    setAppointmentTime,
  } = useBookingStore();

  // Convert stored date string to Date object if needed
  const selectedDate = appointmentDate ? new Date(appointmentDate) : new Date();
  const {
    data: availableTimes,
    isLoading,
    isFetching,
  } = useAvailableSlots(format(selectedDate, "yyyy-MM-dd"));

  const handleDateSelect = (date: Date | undefined) => {
    setAppointmentDate(date?.toISOString() || null);
    setAppointmentTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setAppointmentTime(time);
  };

  return (
    <div>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Select a date and time</CardTitle>
          <CardDescription>Date and time of the service</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 grid-cols-1 gap-y-8 md:gap-y-0 gap-x-8 py-4">
          {/* Calendar Section */}
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-lg font-medium">Select a date</h1>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) =>
                date.getTime() < new Date().setHours(0, 0, 0, 0)
              }
              className="rounded-md w-full h-full flex border"
              classNames={{
                months:
                  "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                month: "space-y-4 w-full flex flex-col",
                table: "w-full h-full border-collapse space-y-1",
                head_row: "",
                row: "w-full mt-2",
              }}
            />
          </div>

          {/* Time Selection Section */}
          <div className="flex flex-col gap-4 w-full ">
            <h1 className="text-lg font-medium">
              Available times on{" "}
              <span className="font-bold">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </h1>
            <div className="grid grid-cols-3 gap-4 w-full border rounded-md p-4">
              {isLoading || isFetching ? (
                <div className="grid grid-cols-3 gap-4 w-full col-span-full">
                  {[...Array(18)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                availableTimes?.map((time: string) => (
                  <Button
                    key={time}
                    variant={appointmentTime === time ? "default" : "outline"}
                    className="w-full"
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                ))
              )}
            </div>
          </div>

          {/* Summary Section */}
          <div className="w-full">
            <BookingSummary>
              <Button
                className="w-full mt-4"
                onClick={() => {
                  useBookingStore.getState().setStep(3);
                  router.push(`/booking?step=3`);
                }}
                disabled={!appointmentDate || !appointmentTime}
              >
                Continue
              </Button>
            </BookingSummary>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

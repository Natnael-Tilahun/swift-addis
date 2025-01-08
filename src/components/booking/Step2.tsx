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
import { useTranslations } from "next-intl";

export default function Step2() {
  const t = useTranslations("booking_step2");
  const router = useRouter();
  const {
    appointmentDate,
    appointmentTime,
    setAppointmentDate,
    setAppointmentTime,
  } = useBookingStore();

  // Convert stored date string to Date object if needed
  const today = new Date();
  let selectedDate;
  if (appointmentDate) {
    selectedDate = new Date(appointmentDate);
  } else {
    setAppointmentDate(today.toISOString());
    selectedDate = today;
  }

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

  // Function to check if a time slot should be disabled
  const isTimeDisabled = (time: string) => {
    // Only apply this check for today's date
    if (
      format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
    ) {
      // Parse time like "7:00 AM" or "8:30 PM"
      const [timeStr, period] = time.split(" ");
      const [hours, minutes] = timeStr.split(":");
      // Convert to 24-hour format
      let hour = parseInt(hours);
      if (period === "PM" && hour !== 12) {
        hour += 12;
      } else if (period === "AM" && hour === 12) {
        hour = 0;
      }
      // Create date object for the time slot
      const slotTime = new Date(selectedDate);
      slotTime.setHours(hour, parseInt(minutes), 0, 0);

      const now = new Date();
      // Add a buffer of 1 hour to allow preparation time
      now.setHours(now.getHours());

      return slotTime < now;
    }
    return false;
  };

  return (
    <div>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 grid-cols-1 gap-y-8 md:gap-y-0 gap-x-8 py-4">
          {/* Calendar Section */}
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-lg font-medium">{t("date.title")}</h1>
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
          <div className="flex flex-col gap-4 w-full">
            <h1 className="text-lg font-medium">
              {t("date.available_times", {
                date: selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }),
              })}
            </h1>
            <div className="grid grid-cols-3 gap-4 w-full border rounded-md p-4">
              {isLoading || isFetching ? (
                <div className="grid grid-cols-3 gap-4 w-full col-span-full">
                  {[...Array(18)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                availableTimes?.map((time: string) => {
                  const disabled = isTimeDisabled(time);
                  return (
                    <Button
                      key={time}
                      variant={appointmentTime === time ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handleTimeSelect(time)}
                      disabled={disabled}
                    >
                      {time}
                    </Button>
                  );
                })
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
                {t("continue_button")}
              </Button>
            </BookingSummary>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

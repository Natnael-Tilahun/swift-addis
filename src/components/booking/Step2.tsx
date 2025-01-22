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
import { useState, useMemo, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Step2() {
  const t = useTranslations("booking_step2");
  const router = useRouter();
  const {
    appointmentDate,
    appointmentTime,
    setAppointmentDate,
    setAppointmentTime,
  } = useBookingStore();
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  // Convert stored date string to Date object if needed
  const today = new Date();
  let selectedDate;
  if (appointmentDate) {
    selectedDate = new Date(appointmentDate);
  } else {
    setAppointmentDate(today.toISOString());
    selectedDate = today;
  }

  const { data, isLoading, isFetching } = useAvailableSlots(
    format(selectedDate, "yyyy-MM-dd")
  );

  useEffect(() => {
    if (data) {
      setAvailableTimes(data);
      setAvailableTimes((prev) => [...prev, "5:00 PM", "5:30 PM", "6:00 PM"]);
    }
  }, [data]);

  const handleDateSelect = (date: Date | undefined) => {
    setAppointmentDate(date?.toISOString() || null);
    setAppointmentTime(null); // Reset time when date changes
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

  // Convert time string to minutes since midnight
  const timeToMinutes = (timeStr: string) => {
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes;

    if (period === "PM" && hours !== 12) {
      totalMinutes += 12 * 60;
    } else if (period === "AM" && hours === 12) {
      totalMinutes = minutes;
    }

    return totalMinutes;
  };

  const minutesToTime = (minutes: number) => {
    let hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? "PM" : "AM";

    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;

    return `${hours}:${mins.toString().padStart(2, "0")} ${period}`;
  };

  // Create a type for the time slot with availability
  type TimeSlotWithAvailability = {
    time: string;
    isAvailable: boolean;
    reason?: string; // Optional reason why it's not available
  };

  const getAvailableTimeSlots = (
    times: string[]
  ): TimeSlotWithAvailability[] => {
    const serviceDuration = useBookingStore.getState().totalDuration || 0;
    const transportDuration = 60;
    const totalDuration = serviceDuration + transportDuration;
    const endOfDay = timeToMinutes("6:00 PM");

    // Convert available times to minutes
    const availableTimesInMinutes = times.map((time) => timeToMinutes(time));
    availableTimesInMinutes.sort((a, b) => a - b);

    // Find unavailable periods
    const unavailablePeriods: [number, number][] = [];
    for (let i = 0; i < availableTimesInMinutes.length - 1; i++) {
      const current = availableTimesInMinutes[i];
      const next = availableTimesInMinutes[i + 1];
      if (next - current > 30) {
        unavailablePeriods.push([current + 30, next]);
      }
    }
    // Check each time slot
    return times.map((timeSlot) => {
      const startMinutes = timeToMinutes(timeSlot);
      const serviceEndMinutes = startMinutes + serviceDuration;
      const transportEndMinutes = startMinutes + totalDuration;

      // Check if service extends beyond working hours
      if (serviceEndMinutes > endOfDay) {
        return {
          time: timeSlot,
          isAvailable: false,
          reason: t("beyond_working_hours"),
        };
      }

      // Generate required slots
      const requiredSlots = [];
      for (let time = startMinutes; time < transportEndMinutes; time += 30) {
        requiredSlots.push(time);
      }
      // Check for overlaps with unavailable periods
      for (const [periodStart, periodEnd] of unavailablePeriods) {
        const hasOverlap = requiredSlots.some(
          (time) => time >= periodStart && time < periodEnd
        );
        if (hasOverlap) {
          return {
            time: timeSlot,
            isAvailable: false,
            reason: t("overlapping_reason", {
              startTime: minutesToTime(periodStart),
              endTime: minutesToTime(periodEnd),
            }),
          };
        }
      }

      // Check if all required slots are available
      // const missingSlots = requiredSlots.filter(
      //   (time) => !availableTimesInMinutes.includes(time)
      // );

      // if (missingSlots.length > 0) {
      //   return {
      //     time: timeSlot,
      //     isAvailable: false,
      //     reason: `Missing required slots: ${missingSlots
      //       .map((time) => minutesToTime(time))
      //       .join(", ")}`,
      //   };
      // }

      return {
        time: timeSlot,
        isAvailable: true,
      };
    });
  };

  // Use in your component
  const timeSlots = useMemo(() => {
    if (!availableTimes) return [];
    return getAvailableTimeSlots(availableTimes);
  }, [availableTimes]);

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
                timeSlots.map(({ time, isAvailable, reason }) => {
                  const disabled = isTimeDisabled(time);
                  return (
                    <TooltipProvider key={time}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="w-full">
                            <Button
                              onClick={() =>
                                isAvailable && setAppointmentTime(time)
                              }
                              key={time}
                              variant={
                                appointmentTime === time ? "default" : "outline"
                              }
                              disabled={!isAvailable || disabled}
                              className={`p-4 w-full ${
                                isAvailable
                                  ? "border border-gray-300"
                                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              {time}
                            </Button>
                          </div>
                        </TooltipTrigger>
                        {!isAvailable && reason && (
                          <TooltipContent
                            // side="top"
                            className="bg-gray-800 text-white px-4 py-2 rounded shadow-lg text-sm z-50"
                          >
                            <p>{reason}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
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

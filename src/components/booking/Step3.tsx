"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookingSummary } from "./BookingSummary";
import { useBookingStore } from "@/store/useBookingStore";
import { useState } from "react";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "./image-upload";
import { format } from "date-fns";
import { ToastAction } from "@/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateBooking } from "@/hooks/useCreateBooking";
import { useTranslations } from "next-intl";

export enum CarType {
  AUTO = "AUTO",
  SUV = "SUV",
}

// type GeolocationPositionError = {
//   code: number;
//   message: string;
//   PERMISSION_DENIED: number;
//   POSITION_UNAVAILABLE: number;
//   TIMEOUT: number;
// };

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export default function Step3() {
  const t = useTranslations("booking_step3");
  const { toast } = useToast();
  const [isLocating, setIsLocating] = useState(false);
  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);
  const formSchema = z.object({
    firstName: z
      .string({ message: t("form.validation.first_name_required") })
      .min(2, {
        message: t("form.validation.first_name_min"),
      }),
    lastName: z
      .string({ message: t("form.validation.last_name_required") })
      .min(2, {
        message: t("form.validation.last_name_min"),
      }),
    phone: z.string({ message: t("form.validation.phone_required") }).min(10, {
      message: t("form.validation.phone_min"),
    }),
    email: z
      .string()
      .email({ message: t("form.validation.email_invalid") })
      .optional()
      .or(z.literal("")),
    address: z
      .string()
      .min(2, { message: t("form.validation.address_required") }),
    appointmentNote: z.string().optional(),
    longitude: z.number().optional(),
    latitude: z.number().optional(),
    images: z.array(
      z.object({
        url: z.string(),
        description: z.string().optional(),
        _id: z.string().optional(),
      })
    ),
  });
  const {
    selectedServicesWithTypes,
    selectedAddOns,
    appointmentDate,
    appointmentTime,
    appointmentNote,
    clientDetails,
    location,
    images,
    setClientDetails,
    setVehicleDetails,
    setLocation,
    setImages,
    setStep,
    setAppointmentNote,
    resetBooking,
  } = useBookingStore();
  const [formData, setFormData] = useState<{
    address: string | null;
    location: {
      lat: number | null;
      lng: number | null;
      address?: string;
    };
  }>({
    address: location?.address ?? null,
    location: {
      lat: location?.coordinates?.latitude || null,
      lng: location?.coordinates?.longitude || null,
    },
  });
  const { mutate, isPending } = useCreateBooking();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: clientDetails?.firstName,
      lastName: clientDetails?.lastName,
      phone: clientDetails?.phone,
      email: clientDetails?.email ?? "",
      address: location?.address || undefined,
      appointmentNote: appointmentNote ?? "",
      longitude: location?.coordinates?.longitude || undefined,
      latitude: location?.coordinates?.latitude || undefined,
      images: images,
    },
  });

  // Dynamically import the Map component to avoid SSR issues
  const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => (
      <div className="h-[200px] w-full bg-muted animate-pulse rounded-md" />
    ),
  });

  // Get current location
  const getCurrentLocation = async () => {
    try {
      setIsLocating(true);

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0,
          });
        }
      );

      const { latitude, longitude } = position.coords;
      setLocationAccuracy(position.coords.accuracy);

      if (position.coords.accuracy > 300) {
        toast({
          title: t("location.errors.low_accuracy"),
          description: t("location.accuracy", {
            meters: Math.round(position.coords.accuracy),
          }),
          action: (
            <ToastAction
              altText={t("buttons.try_again")}
              onClick={getCurrentLocation}
            >
              {t("buttons.try_again")}
            </ToastAction>
          ),
        });
      }

      // Use Google's Geocoding API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results[0]) {
        const address = data.results[0].formatted_address;

        setFormData({
          address: address,
          location: {
            lat: latitude,
            lng: longitude,
            address: address,
          },
        });

        form.setValue("address", address);
        form.setValue("latitude", latitude);
        form.setValue("longitude", longitude);
      }
    } catch (error) {
      console.error("Error getting location:", error);
      toast({
        title: t("location.errors.failed"),
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLocating(false);
    }
  };

  const handleLocationSelect = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results[0]) {
        const address = data.results[0].formatted_address;

        setFormData({
          address: address,
          location: {
            lat: lat,
            lng: lng,
            address: address,
          },
        });

        form.setValue("address", address);
        form.setValue("latitude", lat);
        form.setValue("longitude", lng);
      }
    } catch (error) {
      console.error("Error getting address:", error);
      toast({
        title: "Error",
        description: "Could not get address for selected location",
        variant: "destructive",
      });
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!appointmentDate) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an appointment date",
      });
      return;
    }

    if (!appointmentTime) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an appointment time",
      });
      return;
    }

    const data = {
      service_ids: selectedServicesWithTypes.map(
        (service) => service.serviceId
      ),
      selectedAddOns: selectedAddOns,
      clientDetails: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        ...(values.email ? { email: values.email } : {}),
      },
      vehicleDetails: {
        carType: (selectedServicesWithTypes[0]?.vehicleType ||
          "AUTO") as CarType,
      },
      location: {
        coordinates: {
          latitude: values.latitude ?? 0,
          longitude: values.longitude ?? 0,
        },
        address: values.address,
      },
      images: values.images,
      appointmentDate: format(appointmentDate || new Date(), "yyyy-MM-dd"),
      serviceStartingTime: appointmentTime || undefined,
      appointmentNote: values.appointmentNote,
      status: "Pending",
    };

    // Set each piece of data individually to the store
    setClientDetails(data.clientDetails);

    setVehicleDetails(data.vehicleDetails);

    setLocation(data.location);

    setImages(data.images);

    setAppointmentNote(data.appointmentNote || "");

    console.log("Data being set to store:", data);

    mutate(data, {
      onSuccess: (response) => {
        // Access the created booking data here
        console.log("Created booking:", response);

        // Show success toast
        toast({
          title: t("booking.success.title"),
          description: t("booking.success.description", { id: response._id }),
        });

        form.reset();
        resetBooking();
        setStep(4);
      },
      onError: (error: unknown) => {
        const apiError = error as ApiError;
        toast({
          title: t("booking.error.title"),
          variant: "destructive",
          description:
            apiError?.response?.data?.message || t("booking.error.generic"),
        });
      },
    });
  }

  // Add a cleanup function for component unmount
  // useEffect(() => {
  //   return () => {
  //     // Clear location data when component unmounts
  //     setFormData((prev) => ({
  //       ...prev,
  //       location: {
  //         lat: null,
  //         lng: null,
  //         address: "",
  //       },
  //     }));
  //   };
  // }, []);

  return (
    <div>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>{t("form.title")}</CardTitle>
          <CardDescription>{t("form.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="grid md:grid-cols-3 grid-cols-1 gap-y-8 md:gap-y-0 gap-x-8 py-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="col-span-1 md:col-span-2 space-y-4 border rounded-lg p-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.labels.first_name")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form.placeholders.first_name")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.labels.last_name")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form.placeholders.last_name")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.labels.phone")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form.placeholders.phone")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.labels.email")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form.placeholders.email")}
                          {...field}
                          type="text"
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value || "")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <FormLabel>{t("form.labels.address")}</FormLabel>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={getCurrentLocation}
                            disabled={isLocating}
                            className="flex items-center gap-2"
                          >
                            <MapPin className="h-4 w-4" />
                            {isLocating
                              ? t("location.getting_location")
                              : t("location.get_location")}
                          </Button>
                        </div>
                        <FormControl>
                          <Input
                            placeholder={t("form.placeholders.address")}
                            {...field}
                            value={formData?.address || ""}
                            onChange={(e) => {
                              field.onChange(e);
                              setFormData((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }));
                            }}
                            required
                          />
                        </FormControl>
                        {/* Map and Coordinates Section */}
                        {formData?.location?.lat !== null &&
                          formData?.location?.lng !== null && (
                            <div className="mt-2">
                              <div className="h-[300px] w-full rounded-md overflow-hidden border">
                                <Map
                                  center={[
                                    formData.location.lat || 0,
                                    formData.location.lng || 0,
                                  ]}
                                  zoom={16}
                                  className="h-full w-full"
                                  marker={[
                                    formData.location.lat || 0,
                                    formData.location.lng || 0,
                                  ]}
                                  onLocationSelect={handleLocationSelect}
                                  interactive={true}
                                />
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {t("location.click_to_select")}
                              </p>
                              {locationAccuracy && (
                                <p className="text-sm text-muted-foreground">
                                  {t("location.accuracy", {
                                    meters: Math.round(locationAccuracy),
                                  })}
                                </p>
                              )}
                            </div>
                          )}
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <ImageUpload control={form.control} existingImages={images} />

                <FormField
                  control={form.control}
                  name="appointmentNote"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.labels.notes")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t("form.placeholders.notes")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Summary Section */}
              <div className="w-full">
                <BookingSummary>
                  <Button
                    type="submit"
                    className="w-full mt-4"
                    disabled={isPending}
                  >
                    {isPending ? t("booking.submitting") : t("buttons.submit")}
                  </Button>
                </BookingSummary>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

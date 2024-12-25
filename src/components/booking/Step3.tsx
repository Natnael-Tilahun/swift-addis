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

export enum CarType {
  AUTO = "AUTO",
  SUV = "SUV",
}

const formSchema = z.object({
  firstName: z.string({ message: "First Name is required" }).min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string({ message: "Last Name is required" }).min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  phone: z.string({ message: "Phone is required" }).min(10, {
    message: "Phone must be at least 10 characters.",
  }),
  email: z.string().email().optional(),
  address: z.string({ message: "Address is required" }),
  appointmentNote: z.string().optional(),
  // carImages: z.string().optional(),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
  // location: z.object({
  //   latitude: z.number(),
  //   longitude: z.number(),
  //   address: z.string().optional()
  // }),
  images: z.array(
    z.object({
      url: z.string(),
      description: z.string().optional(),
      _id: z.string().optional(),
    })
  ),
});

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] w-full bg-muted animate-pulse rounded-md" />
  ),
});

export default function Step3() {
  const { toast } = useToast();
  const [isLocating, setIsLocating] = useState(false);
  // const router = useRouter();
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
    address: string;
    location: {
      lat: number | null;
      lng: number | null;
      address?: string;
    };
  }>({
    address: location?.address || "",
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
      email: clientDetails?.email || undefined,
      address: location?.address,
      appointmentNote: appointmentNote || "",
      longitude: location?.coordinates?.longitude || undefined,
      latitude: location?.coordinates?.latitude || undefined,
      images: images,
    },
  });

  // Get current location
  const getCurrentLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Geolocation is not supported by your browser",
      });
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Reverse geocoding using OpenStreetMap Nominatim
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          setFormData((prev) => ({
            ...prev,
            location: {
              lat: latitude,
              lng: longitude,
              address: data.display_name,
            },
            address: data.display_name,
          }));
          form.setValue("address", data.display_name);
          form.setValue("longitude", longitude);
          form.setValue("latitude", latitude);
        } catch (error) {
          console.error("Error getting address:", error);
          setFormData((prev) => ({
            ...prev,
            location: {
              lat: latitude,
              lng: longitude,
            },
          }));
        }
        setIsLocating(false);
      },
      (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Failed to get location: ${error.message}`,
        });
        setIsLocating(false);
      }
    );
  };

  // const handleContinue = () => {
  //   // Create customer details object from form data with reformatted location
  //   const customerDetails = {
  //     firstName: formData.firstName,
  //     phone: formData.phone,
  //     email: formData.email,
  //     address: formData.address,
  //     location: formData.location
  //       ? {
  //           coordinates: {
  //             latitude: formData.location.lat,
  //             longitude: formData.location.lng,
  //           },
  //           address: formData.location.address || formData.address,
  //         }
  //       : null,
  //     appointmentNote: formData.appointmentNote,
  //   };

  //   // Log all booking details
  //   const bookingDetails = {
  //     services: selectedServicesWithTypes.map((service) => ({
  //       serviceId: service.serviceId,
  //       vehicleType: service.vehicleType,
  //     })),
  //     appointmentDetails: {
  //       date: appointmentDate,
  //       time: appointmentTime,
  //     },
  //     customer: customerDetails,
  //     vehicleDetails: {
  //       carType: "SUV", // You might want to make this dynamic
  //       images: form.getValues("carImages")
  //         ? [{ url: form.getValues("carImages") }]
  //         : [],
  //     },
  //     totalAmount: selectedServicesWithTypes.reduce(
  //       (total, service) => total + (service.price || 0),
  //       0
  //     ),
  //   };

  //   console.log(
  //     "Complete Booking Details:",
  //     JSON.stringify(bookingDetails, null, 2)
  //   );

  //   // Store customer details in the booking store
  //   setCustomerDetails(customerDetails);

  //   // Continue to next step
  //   setStep(4);
  //   router.push("/booking?step=4");
  // };

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
        email: values.email || undefined,
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
          title: "Booking created successfully",
          description: `Booking ID: ${response._id}`,
        });

        form.reset();
        resetBooking();
        setStep(4);
      },
      onError: (error) => {
        console.error("Booking creation failed:", error);
        toast({
          title: "Error",
          variant: "destructive",
          description: error.message || "Something went wrong",
        });
      },
    });
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Please provide your personal information so we can contact you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid md:grid-cols-3 grid-cols-1 gap-y-8 md:gap-y-0 gap-x-8 py-4"
            >
              <div className="col-span-1 md:col-span-2 space-y-4 border rounded-lg p-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter you first name" {...field} />
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
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter you last name" {...field} />
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
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter you phone" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter you email" {...field} />
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
                          <FormLabel>Address</FormLabel>
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
                              ? "Getting location..."
                              : "Use current location"}
                          </Button>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Enter your address"
                            {...field}
                            value={formData?.address}
                            onChange={(e) => {
                              field.onChange(e);
                              setFormData((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }));
                            }}
                          />
                        </FormControl>
                        {/* Map and Coordinates Section */}
                        {(formData?.location?.lat !== null &&
                          formData?.location?.lng !== null &&
                          formData?.location?.lat !== 0 &&
                          formData?.location?.lng !== 0) ||
                        (location?.coordinates?.latitude &&
                          location?.coordinates?.longitude &&
                          location?.coordinates?.latitude !== 0 &&
                          location?.coordinates?.longitude !== 0) ? (
                          <div className="mt-2">
                            <div className="h-[200px] w-full rounded-md overflow-hidden border">
                              <Map
                                center={[
                                  formData?.location?.lat ||
                                    location?.coordinates?.latitude ||
                                    0,
                                  formData?.location?.lng ||
                                    location?.coordinates?.longitude ||
                                    0,
                                ]}
                                zoom={18}
                                className="h-full w-full"
                                marker={[
                                  formData?.location?.lat ||
                                    location?.coordinates?.latitude ||
                                    0,
                                  formData?.location?.lng ||
                                    location?.coordinates?.longitude ||
                                    0,
                                ]}
                              />
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Latitude:{" "}
                              {(
                                formData?.location?.lat ||
                                location?.coordinates?.latitude
                              )?.toFixed(6)}
                              , Longitude:{" "}
                              {(
                                formData?.location?.lng ||
                                location?.coordinates?.longitude
                              )?.toFixed(6)}
                            </p>
                          </div>
                        ) : null}
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* <LocationPicker
                          control={form.control}
                          name="location"
                        /> */}

                {/* <FormField
                  control={form.control}
                  name="carImages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Images</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <ImageUpload control={form.control} existingImages={images} />

                <FormField
                  control={form.control}
                  name="appointmentNote"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment Note</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
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
                    // onClick={handleContinue}
                    // disabled={
                    //   !formData.firstName ||
                    //   !formData.phone ||
                    //   !formData.address
                    // }
                    disabled={isPending}
                  >
                    {isPending ? "Loading..." : "Confirm Booking"}
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

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
  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);
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
  const getCurrentLocationWithGoogle = async () => {
    const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!GOOGLE_MAPS_API_KEY) {
      throw new Error("Google Maps API key is not configured");
    }

    try {
      setIsLocating(true);

      // Get precise coordinates using browser's geolocation
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 20000, // Increased timeout
            maximumAge: 0,
          });
        }
      );

      const { latitude, longitude, accuracy } = position.coords;
      setLocationAccuracy(accuracy);

      // More lenient accuracy check (300 meters instead of 100)
      if (accuracy > 300) {
        toast({
          variant: "destructive",
          title: "Low Accuracy Warning",
          description:
            "Your location accuracy is low. The address might not be precise.",
        });
        // Continue with the location instead of throwing error
      }

      // Use Google's Geocoding API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?` +
          `latlng=${latitude},${longitude}&` +
          `key=${GOOGLE_MAPS_API_KEY}&` +
          `result_type=street_address|route|premise|subpremise|point_of_interest&` +
          `language=en`
      );

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error(
          "Could not find an address for this location. Please try again or enter manually."
        );
      }

      // Get the most detailed result available
      const result = data.results[0];

      // Store the precise coordinates from the Geocoding result
      const preciseLocation = {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        address: result.formatted_address,
      };

      // Update form data with precise location
      setFormData((prev) => ({
        ...prev,
        location: preciseLocation,
        address: preciseLocation.address,
      }));

      // Update form values
      form.setValue("address", preciseLocation.address);
      form.setValue("longitude", preciseLocation.lng);
      form.setValue("latitude", preciseLocation.lat);

      setLocation({
        address: preciseLocation.address,
        coordinates: {
          latitude: preciseLocation.lat,
          longitude: preciseLocation.lng,
        },
      });

      // Show accuracy information in the success toast
      toast({
        title: "Location found",
        description: `Accuracy: ±${Math.round(accuracy)}m`,
      });
    } catch (error) {
      console.error("Location error:", error);

      let errorMessage = "Failed to get location";

      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Please allow location access to use this feature.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        action: (
          <ToastAction onClick={getCurrentLocation} altText="Try again">
            Try again
          </ToastAction>
        ),
      });

      throw error;
    } finally {
      setIsLocating(false);
    }
  };

  const getCurrentLocationWithOSM = async () => {
    // Implementation for OpenStreetMap
    // This is a placeholder implementation
    // Replace with actual OpenStreetMap implementation
    return {
      lat: 0,
      lng: 0,
      address: "Fallback address",
    };
  };

  const getCurrentLocation = async () => {
    try {
      // Try Google Maps first
      const googleResult = await getCurrentLocationWithGoogle();
      return googleResult;
    } catch (error) {
      console.error("Error getting location:", error);
      // Fallback to OpenStreetMap if Google fails
      console.warn("Falling back to OpenStreetMap");
      const osmResult = await getCurrentLocationWithOSM();
      return osmResult;
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
                                zoom={16}
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
                              Latitude: {formData?.location?.lat?.toFixed(6)},
                              Longitude: {formData?.location?.lng?.toFixed(6)}
                              {locationAccuracy && (
                                <span className="ml-2">
                                  (Accuracy: ±{Math.round(locationAccuracy)}m)
                                </span>
                              )}
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

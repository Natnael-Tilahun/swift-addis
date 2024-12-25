import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ClientDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
}

interface VehicleDetails {
  carType: string;
  make?: string;
  model?: string;
  year?: number;
}

interface Location {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: string;
}

interface Image {
  url: string;
  description?: string;
  _id?: string;
}

interface SelectedServiceWithType {
  serviceId: string;
  vehicleType: string;
}

interface BookingState {
  step: number;
  clientDetails: ClientDetails;
  vehicleDetails: VehicleDetails;
  location: Location;
  images: Image[];
  service_ids: string[];
  selectedServicesWithTypes: SelectedServiceWithType[];
  selectedAddOns: string[];
  appointmentDate: string | null;
  appointmentTime: string | null;
  serviceStartingTime: string | null;
  appointmentNote: string;
  totalPrice?: number;
  lockedVehicleType: string | null;

  // Actions
  setStep: (step: number) => void;
  setClientDetails: (details: ClientDetails) => void;
  setVehicleDetails: (details: VehicleDetails) => void;
  setLocation: (location: Location) => void;
  setImages: (images: Image[]) => void;
  setServiceIds: (ids: string[]) => void;
  toggleAddOn: (addOnId: string) => void;
  setAppointmentDate: (date: string | null) => void;
  setAppointmentTime: (time: string | null) => void;
  setServiceStartingTime: (time: string) => void;
  setAppointmentNote: (note: string) => void;
  setTotalPrice: (price: number) => void;
  resetBooking: () => void;
  setSelectedServicesWithTypes: (services: SelectedServiceWithType[]) => void;
  addOrUpdateServiceWithType: (serviceId: string, vehicleType: string) => void;
  removeServiceWithType: (serviceId: string) => void;
  setLockedVehicleType: (type: string | null) => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      step: 1,
      clientDetails: {
        firstName: '',
        lastName: '',
        phone: '',
        email: undefined,
      },
      vehicleDetails: {
        carType: '',
        make: '',
        model: '',
        year: 0,
      },
      location: {
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
        address: '',
      },
      images: [],
      service_ids: [],
      selectedServicesWithTypes: [],
      selectedAddOns: [],
      appointmentDate: new Date().toISOString(),
      appointmentTime: null,
      serviceStartingTime: null,
      appointmentNote: '',
      totalPrice: 0,
      lockedVehicleType: null,

      setStep: (step) => set({ step }),
      
      setClientDetails: (details) => set({ clientDetails: details }),
      
      setVehicleDetails: (details) => set({ vehicleDetails: details }),
      
      setLocation: (location) => set({ location }),
      
      setImages: (images) => set({ images }),
      
      setServiceIds: (ids) => set({ service_ids: ids }),
      
      toggleAddOn: (addOnId) => set((state) => ({
        selectedAddOns: state.selectedAddOns.includes(addOnId)
          ? state.selectedAddOns.filter(id => id !== addOnId)
          : [...state.selectedAddOns, addOnId]
      })),
      
      setAppointmentDate: (date) => set({ appointmentDate: date }),
      
      setAppointmentTime: (time) => set({ appointmentTime: time }),
      
      setServiceStartingTime: (time) => set({ serviceStartingTime: time }),
      
      setAppointmentNote: (note) => set({ appointmentNote: note }),
      
      setTotalPrice: (price) => set({ totalPrice: price }),
      
      resetBooking: () => set({
        step: 1,
        clientDetails: {
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
        },
        vehicleDetails: {
          carType: '',
          make: '',
          model: '',
          year: 0,
        },
        location: {
          coordinates: {
            latitude: 0,
            longitude: 0,
          },
          address: '',
        },
        images: [],
        service_ids: [],
        selectedServicesWithTypes: [],
        selectedAddOns: [],
        appointmentDate: null,
        appointmentTime: null,
        serviceStartingTime: null,
        appointmentNote: '',
        totalPrice: 0,
      }),
      setSelectedServicesWithTypes: (services) => set({ 
        selectedServicesWithTypes: services,
        service_ids: services.map(s => s.serviceId)
      }),

      addOrUpdateServiceWithType: (serviceId, vehicleType) => {
        const state = get();
        const existing = state.selectedServicesWithTypes;
        const existingIndex = existing.findIndex(s => s.serviceId === serviceId);

        let newServices;
        if (existingIndex >= 0) {
          // If same vehicle type, remove it
          if (existing[existingIndex].vehicleType === vehicleType) {
            newServices = existing.filter(s => s.serviceId !== serviceId);
          } else {
            // Update vehicle type
            newServices = [...existing];
            newServices[existingIndex].vehicleType = vehicleType;
          }
        } else {
          // Add new service
          newServices = [...existing, { serviceId, vehicleType }];
        }

        set({
          selectedServicesWithTypes: newServices,
          service_ids: newServices.map(s => s.serviceId),
          vehicleDetails: {
            ...state.vehicleDetails,
            carType: vehicleType
          }
        });
      },

      removeServiceWithType: (serviceId) => set((state) => {
        const newServices = state.selectedServicesWithTypes.filter(
          s => s.serviceId !== serviceId
        );
        return {
          selectedServicesWithTypes: newServices,
          service_ids: newServices.map(s => s.serviceId)
        };
      }),

      setLockedVehicleType: (type) => set({ lockedVehicleType: type }),
    }),
    {
      name: 'booking-storage',
    }
  )
); 
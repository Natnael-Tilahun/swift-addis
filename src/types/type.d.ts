export interface Service {
  _id: string;
  image: string;
  name: {
    en: string;
    am: string;
    [key: string]: string;
  };
  description: {
    en: string;
    am: string;
    [key: string]: string;
  };
  features?: {
    en: string[];
    am: string[];
    [key: string]: string[];
  };
  tag?: string;
  duration: {
    [key: string]: number;
  };
  pricing: {
    basePrice?: number;
    maxPrice?: number;
  };
  createdAt?: string | Date | number;
  updatedAt: string | Date | number;
}

export interface AddOn {
  _id: string;
  optionName: {
    en: string;
    am: string;
    [key: string]: string;
  };
  description: {
    en: string;
    am: string;
    [key: string]: string;
  };
  duration: number;
  additionalPrice?: {
    minBasePrice?: number;
    maxPrice?: number;
  };
  features?: {
    en: string[];
    am: string[];
    [key: string]: string[];
  };
  createdAt?: string | Date | number;
  updatedAt?: string | Date | number;
}


export interface ServiceWithType {
  serviceId: string;
  vehicleType: string;
}

// export enum BookingStatus {
//   PENDING = "PENDING",
//   CONFIRMED = "CONFIRMED",
//   COMPLETED = "COMPLETED",
//   CANCELLED = "CANCELLED"
// }

enum CarType {
  SUV = "SUV",
  AUTO = "AUTO",
}

interface Booking {
  id?: string;
  clientDetails: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string | null;
  };
  vehicleDetails: {
    carType: CarType;
    make?: string | null;
    model?: string | null;
    year?: number | null;
  };
  images: {
    url: string;
    description?: string;
  }[];
  location?: {
    address?: string;
    coordinates?: {
      latitude?: number;
      longitude?: number;
    };
  };
  service_ids?: string[];
  selectedAddOns?: string[];
  appointmentDate?: string;
  serviceStartingTime?: string;
  bookingEndTime?: string;
  status: BookingStatus;
  assignedTo?: string;
  appointmentNote?: string;
  totalPrice?: number;
  createdAt?: string | Date | number;
  updatedAt?: string | Date | number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  author?: {
    name?: string;
    image?: string;
  };
  publishedAt: string | Date | number;
  updatedAt?: string | Date | number;
}
export type { Service, AddOn, Booking, BookingStatus, CarType };

interface Service {
  _id: string;
  name: string;
  image?: string;
  description?: string;
  basePrice?: number | null; // Making it nullable for the Corporate Fleet Package
  maxPrice?: number;
  duration: {
    [key: string]: number;
  };
  duration?: string;
  features?: string[];
  addOns?: AddOn[];
  customizableOptions?: {
    [key: string]: string;
  };
  tag?: string;
  pricing: {
    [key: string]: {
      basePrice: number;
      maxPrice: number;
    };
  };
}

interface AddOn {
  _id: string;
  optionName: string;
  description?: string;
  duration?: number;
  additionalPrice?: number;
  basePrice?: number | null; // Making it nullable for the Corporate Fleet Package
  maxPrice?: number;
  features?: string[];
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
  createdAt?: string;
  updatedAt?: string;
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
  publishedAt?: string;
}
export type { Service, AddOn, Booking, BookingStatus, CarType };

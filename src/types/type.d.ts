 interface Service {
  id: number;
  name: string;
  image: string;
  description: string;
  basePrice: number | null; // Making it nullable for the Corporate Fleet Package
  maxPrice?: number;
  duration: string;
  features?: string[];
  addOns?: AddOn[];
  customizableOptions?: {
    [key: string]: string;
  };
  tag?:string
}

interface AddOn {
  id: string;
  name: string;
  basePrice: number | null; // Making it nullable for the Corporate Fleet Package
  maxPrice?: number;
  description: string;
  features: string[];
  duration: string;
}

export type { Service, AddOn };
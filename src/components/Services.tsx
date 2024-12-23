import { fetchServices } from "@/services/api";
import ServiceCard from "@/components/service/ServiceCard";

export const revalidate = 3600; // Revalidate every hour
export default async function Services() {
  const services = await fetchServices();

  return <ServiceCard services={services} />;
}

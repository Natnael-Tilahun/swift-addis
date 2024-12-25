import { fetchServices, getServiceById, fetchAddons } from "@/services/api";
import ServiceDetails from "@/components/service/ServiceDetails";
import { Service } from "@/types/type";
import { notFound } from "next/navigation";

export const revalidate = 3600; // Revalidate every hour

// Generate static paths
export async function generateStaticParams() {
  const services = await fetchServices();
  return services.map((service: Service) => ({
    id: service._id,
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const services = await fetchServices();
  const service = await getServiceById(params.id);
  const addOns = await fetchAddons();
  if (!service) {
    notFound();
  }

  return (
    <ServiceDetails service={service} services={services} addOns={addOns?.data} />
  );
}

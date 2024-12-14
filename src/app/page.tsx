import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Hero />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
    </div>
  );
}

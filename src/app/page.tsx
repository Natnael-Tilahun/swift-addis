// import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
// import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
// import Gallery from "@/components/Gallery";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <div className="w-full h-full">
      {/* <Hero /> */}

      {/* Hero Section */}
      <section className="relative h-[100vh] -top-20 flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Car detailing"
          fill
          className="object-cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-gray-200 md:text-4xl text-2xl font-bold">
            {t("title")}
          </h1>
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 mt-3 ">
            {t("subtitle")}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            {t("description")}
          </p>
          <Button className="border" size="lg" asChild>
            <Link href={`/#services`}>
              {tCommon("cta")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <Services />

      {/* Gallery Section */}
      {/* <section className="md:py-24 py-6">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("title_gallery")}
          </h2>
          <Gallery />
        </div>
      </section> */}

      {/* Testimonials Section */}
      {/* <Testimonials /> */}

      {/* Contact Section */}
      <Contact />
    </div>
  );
}

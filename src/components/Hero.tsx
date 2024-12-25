"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  return (
    <section
      className="w-full bg-heroImage bg-cover bg-center h-screen -mt-20 p-5 lg:p-14 xl:py-0 xl:px-20 rounded-b-3xl"
      id="hero"
    >
      <div className="flex flex-col gap-8 md:w-1/2 w-full h-full justify-center">
        <div className="flex flex-col italic gap-0">
          <h1 className="text-gray-200 px-4 md:text-4xl text-3xl font-bold">
            Detailing Excellence
          </h1>
          <h2 className=" text-7xl font-extrabold [-webkit-text-stroke:2px_blue] bg-white text-transparent bg-clip-text">
            Delivered Swiftly
          </h2>
        </div>
        <p className="text-white text-xl">
          We are a mobile car detailing service that provides a wide range of
          services to keep your car looking its best.
        </p>
        <div className="flex gap-6">
          <Button
            asChild
            className="md:w-48 w-full bg-primary font-bold text-white border"
          >
            <Link href={`/#services`}>Book Now</Link>
          </Button>
          <Button
            variant="outline"
            className="md:w-48 w-full outline-primary bg-transparent text-white font-bold"
          >
            View Packages
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;

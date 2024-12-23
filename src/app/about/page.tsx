import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Shield, Users, Award } from "lucide-react";
export default function About() {
  return (
    <div className="w-full container mx-auto px-6  py-12 ">
      {/* <div className="flex flex-col gap-4 items-center justify-center self-center w-full md:h-1/3 h-64 relative">
        <h1 className="text-5xl font-bold text-center z-40">About Us</h1>
        <div className="w-full h-full bg-cover bg-center bg-aboutEllipse lg:block absolute left-0 top-0 z-0 opacity-100 "></div>
        <div className="md:w-[200px] md:h-[250px] w-[125px] h-[150px] bg-cover bg-center bg-polygon2 lg:block absolute left-0 -top-20 z-10 opacity-0 "></div>
        <div className="md:w-[150px] md:h-[350px] w-[100px] h-[250px] bg-cover bg-center bg-polygon3 lg:block absolute right-0 -bottom-32 md:-bottom-40 z-10 opacity-30 "></div>
      </div> */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Swift Addis</h1>
        <p className="text-xl text-muted-foreground">
          Dedicated to delivering exceptional car detailing services
        </p>
      </div>
      <div className="relative h-[400px] mb-12 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1616804087673-cdcd32e5578f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Our team"
          fill
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6">
          <Shield className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-muted-foreground">
            To provide the highest quality car detailing services while
            exceeding customer expectations.
          </p>
        </Card>
        <Card className="p-6">
          <Users className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
          <p className="text-muted-foreground">
            Our certified professionals have years of experience in automotive
            care.
          </p>
        </Card>
        <Card className="p-6">
          <Award className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quality First</h3>
          <p className="text-muted-foreground">
            We use only premium products and advanced techniques for the best
            results.
          </p>
        </Card>
      </div>

      <div className="w-full h-full relative space-y-4 flex flex-col tracking-wider leading-7">
        <h2 className="text-3xl font-bold text-center">Our Story</h2>
        <p>
          Welcome to{" "}
          <span className="font-bold text-primary">
            Swift Addis Mobile Car Detailing
          </span>
          , Addis Abeba&apos;s premier mobile car wash and detailing service.
          Founded in 2024 by Yohannes Tadesse and Natnael Asfaw, we are driven
          by a passion for excellence and a commitment to delivering unmatched
          detailing services. With a shared vision for innovation, Yohannes and
          Natnael have set out to revolutionize car detailing in Ethiopia by
          combining top-tier service with European-standard detailing products.
          Our advanced, industry-leading products ensure your vehicle receives
          the same level of care and precision you&apos;d expect from
          world-class detailing standards, right here in Addis Abeba.
        </p>
        <p>
          At <span className="font-bold text-primary">Swift Addis</span>, we
          believe your car deserves meticulous attention, and you deserve a
          hassle-free experience. That&apos;s why we take the stress out of car
          care by bringing our state-of-the-art detailing expertise directly to
          your home or office. As a fully mobile service, we save you the time,
          fuel, and energy it takes to drive to a traditional car wash or
          detailing center. No more long lines,traffic or wasted hours—our team
          comes to you, ensuring your vehicle gets the care it needs while you
          can fully hours—our team comes to you, ensuring your vehicle gets the
          care it needs while you can fully enjoy your time at home.
        </p>
        <p>
          Our wide range of services includes everything from basic exterior
          washes to full interior and exterior detailing, ceramic coating, paint
          correction, and fleet services. Whether you&apos;re looking for a
          quick clean or a luxury-level transformation, we have customizable
          packages tailored to meet your needs. Our eco-friendly practices,
          including the use of biodegradable products, reflect our commitment to
          protecting the environment while ensuring your vehicle looks and feels
          brand new.
        </p>
        <p>
          At Swift Addis, we stand by our motto:{" "}
          <span className="font-bold text-primary bg-primary/10 p-2 rounded-xl">
            &quot;Detailing Excellence Delivered Swiftly.&quot;
          </span>{" "}
          Trust us to enhance the beauty and longevity of your car, one detail
          at a time.
        </p>
        <div className="flex flex-col gap-4 items-center justify-center bg-primary/10 rounded-xl p-4 mt-8">
          <blockquote className="text-center font-bold text-xl md:text-2xl text-primary">
            Discover the Swift Addis experience today and redefine your car care
            routine.
          </blockquote>
        </div>
      </div>
    </div>
  );
}

// import Image from 'next/image';
// import { Card } from '@/components/ui/card';
// import { Shield, Users, Award } from 'lucide-react';

// export default function AboutPage() {
//   return (
//     <div className="container mx-auto px-6 py-12">
//       <div className="max-w-3xl mx-auto text-center mb-12">
//         <h1 className="text-4xl font-bold mb-4">About Pristine Auto</h1>
//         <p className="text-xl text-muted-foreground">
//           Dedicated to delivering exceptional car detailing services since 2010
//         </p>
//       </div>

//       <div className="relative h-[400px] mb-12 rounded-lg overflow-hidden">
//         <Image
//           src="https://images.unsplash.com/photo-1616804087673-cdcd32e5578f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
//           alt="Our team"
//           fill
//           className="object-cover"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//         <Card className="p-6">
//           <Shield className="h-12 w-12 text-primary mb-4" />
//           <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
//           <p className="text-muted-foreground">
//             To provide the highest quality car detailing services while exceeding customer expectations.
//           </p>
//         </Card>
//         <Card className="p-6">
//           <Users className="h-12 w-12 text-primary mb-4" />
//           <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
//           <p className="text-muted-foreground">
//             Our certified professionals have years of experience in automotive care.
//           </p>
//         </Card>
//         <Card className="p-6">
//           <Award className="h-12 w-12 text-primary mb-4" />
//           <h3 className="text-xl font-semibold mb-2">Quality First</h3>
//           <p className="text-muted-foreground">
//             We use only premium products and advanced techniques for the best results.
//           </p>
//         </Card>
//       </div>

//       <div className="prose prose-lg max-w-none">
//         <h2 className="text-3xl font-bold mb-6">Our Story</h2>
//         <p className="mb-4">
//           Founded in 2010, Pristine Auto has grown from a small local business to one of the most trusted names in car detailing. Our journey began with a simple mission: to provide car owners with the highest quality detailing services possible.
//         </p>
//         <p className="mb-4">
//           Over the years, we've invested in the latest technology and techniques, while building a team of passionate professionals who share our commitment to excellence. Our attention to detail and dedication to customer satisfaction has earned us a loyal client base and numerous industry accolades.
//         </p>
//         <p>
//           Today, we continue to raise the bar in automotive care, offering comprehensive detailing services that protect and enhance your vehicle's appearance and value.
//         </p>
//       </div>
//     </div>
//   );
// }

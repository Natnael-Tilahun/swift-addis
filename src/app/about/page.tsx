export default function About() {
  return (
    <div className="w-full h-full  xl:pb-44 pb-16 lg:pb-32">
      <div className="flex flex-col gap-4 items-center justify-center self-center w-full md:h-1/3 h-64 relative">
        <h1 className="text-5xl font-bold text-center z-40">About Us</h1>
        <div className="w-full h-full bg-cover bg-center bg-aboutEllipse lg:block absolute left-0 top-0 z-0 opacity-100 "></div>
        <div className="md:w-[200px] md:h-[250px] w-[125px] h-[150px] bg-cover bg-center bg-polygon2 lg:block absolute left-0 -top-20 z-10 opacity-100 "></div>
        <div className="md:w-[150px] md:h-[350px] w-[100px] h-[250px] bg-cover bg-center bg-polygon3 lg:block absolute right-0 -bottom-32 md:-bottom-40 z-10 opacity-100 "></div>
      </div>
      <div className="w-full h-full relative p-10 lg:px-14  xl:py-16  xl:px-36 space-y-8 flex flex-col tracking-wider leading-7">
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
        <div className="flex flex-col gap-4 items-center justify-center bg-primary/10 rounded-xl p-4">
          <blockquote className="text-center font-bold text-xl md:text-2xl text-primary">
            Discover the Swift Addis experience today and redefine your car care
            routine.
          </blockquote>
        </div>
      </div>
    </div>
  );
}

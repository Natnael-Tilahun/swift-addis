import React from "react";
import Image from "next/image";
import { Phone, Mail, Timer } from "lucide-react";
import Link from "next/link";
import {
  RiFacebookCircleFill,
  RiTelegramFill,
  RiMailFill,
  RiLinkedinBoxFill,
  RiYoutubeFill,
  RiTwitterFill,
  RiInstagramFill,
} from "@remixicon/react";

function Footer({
  toggleMenu,
  className,
}: {
  toggleMenu?: () => void;
  className?: string;
}) {
  return (
    <section
      className={`w-full flex flex-col row-start-3 gap-10 items-cente  justify-between bg-black text-white px-10 lg:px-14 xl:px-20 pb-10 pt-16 rounded-t-3xl ${className}`}
      // onClick={toggleMenu}
      id="footer"
    >
      <div className="grid md:grid-cols-3 grid-col-2 lg:grid-cols-5 md:gap-20 gap-10">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex flex-row items-center space-x-2">
            <Image
              src="/logo1.png"
              width={60}
              height={60}
              alt="A logo of Swift Addis"
              className="w-20 h-20 bg-contain object-contain rounded-full"
            />
            <span className="font-bold text-xl">Swift Addis</span>
          </Link>
          <p className="text-sm leading-6 text-gray-300">
            Professional car detailing services that bring your vehicle back to
            showroom condition.
          </p>
        </div>
        <div className="mt-10 md:mt-0">
          <h3 className="text-sm font-semibold leading-6 text-white">
            Company
          </h3>
          <ul role="list" className="mt-6 space-y-4">
            <li>
              <Link
                href="/about"
                className="text-sm leading-6 text-gray-300 hover:text-white"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className="text-sm leading-6 text-gray-300 hover:text-white"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                className="text-sm leading-6 text-gray-300 hover:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
          <Link
            href="/terms-and-conditions"
            className="text-sm leading-6 text-gray-300 hover:text-white mt-6"
          >
            Terms And Conditions
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm leading-6 text-gray-300 hover:text-white"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm font-semibold leading-6 text-white">
            Service Day
          </h1>
          <p className="text-sm leading-6 text-gray-300 flex items-center gap-3 mt-6">
            <Timer className="text-primary w-5 h-5" />
            <span>Monday - Saturday</span>
          </p>
          <p className="text-sm leading-6 text-gray-300 flex items-center gap-3">
            <Timer className="text-primary w-5 h-5" />
            <span>Sunday - Off day</span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm font-semibold leading-6 text-white">
            Get In Touch
          </h1>
          <p className="flex items-center gap-3 mt-6">
            <Phone className="text-primary w-5 h-5" />
            {/* <i className="ri-phone-fill ri-lg text-[#ed2e35] pr-3"></i>{" "} */}
            <span className="text-sm leading-6 text-gray-300">
              (+251) 933654654
            </span>
          </p>
          <p className="flex items-center gap-3">
            <Mail className="text-primary w-5 h-5" />
            {/* <i className="ri-mail-fill ri-lg text-[#ed2e35] pr-3"></i>{" "} */}
            <span className="text-sm leading-6 text-gray-300">
              support@tekusmesa.com
            </span>
          </p>
        </div>
      </div>
      <div className="text-gray-500 pt-5  border-t-[1px] border-gray-600 flex flex-wrap gap-5 justify-between">
        <div className="flex-shrink-0">
          © 2024 <span className="text-white">Swift Addis</span>. All Rights
          Reserved.
        </div>
        <div className="flex text-white">
          <p className="pr-3">Follow us on: </p>
          <div className="flex md:gap-4">
            <Link
              href="https://www.facebook.com/share/PSpAuta2fB8oASv3/?mibextid=LQQJ4d"
              target="_blank"
            >
              <RiFacebookCircleFill className="text-white hover:text-primary transition-all duration-300 ri-lg"></RiFacebookCircleFill>
            </Link>
            <Link href="https://t.me/swiftaddis" target="_blank">
              <RiTelegramFill className="text-white hover:text-primary transition-all duration-300 ri-lg"></RiTelegramFill>
            </Link>
            <Link href="mailto:support@swiftaddis.com" target="_blank">
              <RiMailFill className="text-white hover:text-primary transition-all duration-300 ri-lg"></RiMailFill>
            </Link>
            <Link
              href="https://www.linkedin.com/company/swiftaddis"
              target="_blank"
            >
              <RiLinkedinBoxFill className="text-white hover:text-primary transition-all duration-300 ri-lg"></RiLinkedinBoxFill>
            </Link>
            <Link
              href="https://www.youtube.com/@Swiftaddismobilecardetailing"
              target="_blank"
            >
              <RiYoutubeFill className="text-white hover:text-primary transition-all duration-300 ri-lg"></RiYoutubeFill>
            </Link>
            <Link href="https://twitter.com/swiftaddis" target="_blank">
              <RiTwitterFill className="text-white hover:text-primary transition-all duration-300 ri-lg"></RiTwitterFill>
            </Link>
            <Link
              href="https://www.instagram.com/swiftaddis_mobilecardetailing/profilecard/?igsh=MWt2dHpzZzBwZDA4aw=="
              target="_blank"
            >
              <RiInstagramFill className="text-white hover:text-primary transition-all duration-300 ri-lg"></RiInstagramFill>
            </Link>
            <Link
              href="https://www.tiktok.com/@swift.addis.mobiledetail?_t=ZM-8sBF3YHQ6FC&_r=1"
              target="_blank"
            >
              <svg
                className=" hover:bg-primary transition-all duration-300 ri-lg w-6 h-6 bg-white rounded-full p-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;

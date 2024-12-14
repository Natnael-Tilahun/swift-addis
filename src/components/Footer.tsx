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
  toggleMenu: () => void;
  className?: string;
}) {
  return (
    <section
      className={`w-full flex flex-col row-start-3 gap-10 items-cente  justify-between bg-black text-white px-10 lg:px-14 xl:px-20 pb-10 pt-16 rounded-t-3xl ${className}`}
      onClick={toggleMenu}
      id="footer"
    >
      <div className="flex flex-wrap flex-col md:gap-5 gap-10 md:flex-row justify-between">
        <div className="flex flex-row items-center flex-shrink-0 mr-6 gap-6">
          <Image
            src="/logo1.png"
            width={100}
            height={100}
            alt="A logo of Swift Addis"
            className="w-32 h-32 bg-contain object-contain rounded-full"
          />

          <span className="font-semibold text-xl tracking-tight">
            Swift Addis
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-extrabold text-lg uppercase">Service Day</h1>
          <p className="text-gray-400 flex items-center gap-3">
            <Timer className="text-primary w-6 h-6" />
            <span>Monday - Saturday</span>
          </p>
          <p className="text-gray-400 flex items-center gap-3">
            <Timer className="text-primary w-6 h-6" />
            <span>Sunday - Off day</span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/terms-and-conditions" className="text-sm font-medium">
            Terms And Conditions
          </Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-extrabold text-lg uppercase">Get in touch</h1>
          <p className="flex items-center gap-3">
            <Phone className="text-primary w-6 h-6" />
            {/* <i className="ri-phone-fill ri-lg text-[#ed2e35] pr-3"></i>{" "} */}
            <span className="text-gray-400">(+251) 933654654</span>
          </p>
          <p className="flex items-center gap-3">
            <Mail className="text-primary w-6 h-6" />
            {/* <i className="ri-mail-fill ri-lg text-[#ed2e35] pr-3"></i>{" "} */}
            <span className="text-gray-400">support@tekusmesa.com</span>
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
          <div className="flex gap-2">
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

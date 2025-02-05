import React from "react";
import Image from "next/image";
import { Phone, Mail, Timer } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("footer");
  const tMetadata = useTranslations("metadata");

  return (
    <section
      className={`w-full flex flex-col row-start-3 gap-10 items-cente justify-between bg-black text-white px-10 lg:px-14 xl:px-20 pb-10 pt-16 rounded-t-3xl ${className}`}
      onClick={toggleMenu}
      id="footer"
    >
      <div className="grid md:grid-cols-3 grid-cols-2  xl:grid-cols-5 md:gap-20 gap-10 w-full">
        <div className="flex flex-col col-span-2 md:col-span-1 gap-6">
          <Link href="/" className="flex flex-row items-center space-x-2">
            <Image
              src="/logo1.png"
              width={60}
              height={60}
              priority={true}
              alt={t("about")}
              className="w-20 h-20 bg-contain object-contain rounded-full"
            />
            <span className="font-bold text-xl">{tMetadata("title")}</span>
          </Link>
          <p className="text-sm leading-6 text-gray-300">
            {t("company_description")}
          </p>
        </div>
        <div className="flex flex-col h-full w-full">
          <h3 className="text-sm font-semibold leading-6 text-white">
            {t("sections.company")}
          </h3>
          <ul role="list" className="mt-6 space-y-4">
            <li>
              <Link
                href="/about"
                className="text-sm leading-6 text-gray-300 hover:text-white"
              >
                {t("links.about")}
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className="text-sm leading-6 text-gray-300 hover:text-white"
              >
                {t("links.blog")}
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                className="text-sm leading-6 text-gray-300 hover:text-white"
              >
                {t("links.contact")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col w-full h-full">
          <h3 className="text-sm font-semibold leading-6 text-white">
            {t("sections.legal")}
          </h3>
          <Link
            href="/terms-and-conditions"
            className="text-sm leading-6 text-gray-300 hover:text-white mt-6"
          >
            {t("links.terms")}
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm leading-6 text-gray-300 hover:text-white mt-6"
          >
            {t("links.privacy")}
          </Link>
        </div>
        <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
          <h1 className="text-sm font-semibold leading-6 text-white">
            {t("sections.service_day")}
          </h1>
          <p className="text-sm leading-6 text-gray-300 flex items-center gap-3 mt-6">
            <Timer className="text-primary w-5 h-5" />
            <span>{t("schedule.weekdays")}</span>
          </p>
          <p className="text-sm leading-6 text-gray-300 flex items-center gap-3">
            <Timer className="text-primary w-5 h-5" />
            <span>{t("schedule.sunday")}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
          <h1 className="text-sm font-semibold leading-6 text-white">
            {t("sections.get_in_touch")}
          </h1>
          <p className="flex items-center gap-3 mt-6">
            <Phone className="text-primary w-5 h-5" />
            <span className="text-sm leading-6 text-gray-300">0987963123</span>
          </p>
          <p className="flex items-center gap-3 mt-2">
            <Phone className="text-primary w-5 h-5" />
            <span className="text-sm leading-6 text-gray-300">0987268123</span>
          </p>
          <p className="flex items-center gap-3 mt-2">
            <Phone className="text-primary w-5 h-5" />
            <span className="text-sm leading-6 text-gray-300">0995090852</span>
          </p>
          <p className="flex items-center gap-3 mt-2">
            <Mail className="text-primary w-5 h-5" />
            <span className="text-sm leading-6 text-gray-300">
              {t("contact_info.email")}
            </span>
          </p>
        </div>
      </div>
      <div className="text-gray-500 pt-5 border-t-[1px] border-gray-600 flex flex-wrap gap-4 justify-between ">
        <div className="order-3 md:order-1">{t("copyright")}</div>
        <div className="order-2 flex gap-1">
          <p>{t("developed_by")}</p>
          <Link
            href="https://natnaeltilahun.vercel.app"
            target="_blank"
            className="text-primary"
          >
            Natnael Tilahun
          </Link>
        </div>
        <div className="flex flex-col md:flex-row text-white gap-1 order-1 md:order-3">
          <p className="pr-3">{t("social.follow_us")}</p>
          <div className="flex gap-2 md:gap-4">
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

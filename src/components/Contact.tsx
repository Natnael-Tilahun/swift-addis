"use client";

import React from "react";
// import emailjs from "@emailjs/browser";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
const contactFormSchema = z.object({
  fullname: z
    .string()
    .min(3, {
      message: "Full name must be at least 2 characters.",
    })
    .max(30, {
      message: "Full name must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email()
    .optional(),
  phone: z.string().max(13).min(10),
  message: z.string().max(200).min(5),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

function Contact() {
  const t = useTranslations("contact");

  // const NODE_ENV = process.env.NODE_ENV;
  // const YOUR_SERVICE_ID = "service_ooam44u";
  // const YOUR_TEMPLATE_ID = "template_g0arq1v";
  // const YOUR_PUBLIC_KEY = "__i-jycM1GtKOAT84";

  const defaultValues: Partial<ContactFormValues> = {
    fullname: "",
    email: "",
    phone: "",
    message: "",
  };

  // 1. Define your form.
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  function onSubmit(values: ContactFormValues) {
    console.log(values);
  }

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm();

  // const onSubmit = (data) => {
  //   sendEmail();
  //   reset();
  //   toast.success(
  //     "Thank you for reaching out to us. We will contact you very soon."
  //   );
  // };

  // const sendEmail = () => {
  //   emailjs
  //     .sendForm(
  //       YOUR_SERVICE_ID,
  //       YOUR_TEMPLATE_ID,
  //       form.current,
  //       YOUR_PUBLIC_KEY
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //         console.log("message sent!");
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // };

  return (
    <section
      className="w-full h-fit p-5 py-16 lg:p-14 xl:py-36 xl:px-48 bg-[#FFECF3]/30"
      id="contact"
    >
      <Card className="w-full h-full grid md:grid-cols-2 gap-6 p-5 relative z-40 shadow-lg">
        <div className="flex flex-col bg-gradient-to-br from-primary to-[#052FA3] p-8 gap-4 text-white rounded-xl justify-between z-40 relative">
          {/* <div className='w-1/2 h-full bg-dot_reds'></div> */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{t("lets_talk")}</h1>
            <p className="text-justify">{t("intro_text")}</p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-md font-semibold">{t("info.telephone.label")}</h2>
              <p>{t("info.telephone.value")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-md font-semibold">{t("info.support_hours.label")}</h2>
              <p>{t("info.support_hours.value")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-md font-semibold">{t("info.sales_hours.label")}</h2>
              <p>{t("info.sales_hours.value")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-md font-semibold">{t("info.support_contact.label")}</h2>
              <p>{t("info.support_contact.value")}</p>
            </div>
          </div>
          <div className="md:w-[40%] w-2/3 h-1/3 md:h-1/2 bg-pattern1 lg:block absolute right-0 bottom-0 opacity-100 z-50"></div>
        </div>

        {/* form inputs */}
        <div className="w-1/3 lg:w-1/4 h-1/2 lg:h-1/2 bg-pattern2 lg:block absolute right-0 bottom-0 z-0 opacity-20 "></div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 md:p-10 md:w-[85%] w-full z-50"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.full_name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.full_name_placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.email")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.email_placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.phone")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.phone_placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form.message")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("form.message_placeholder")}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              {t("form.send")}
            </Button>
          </form>
        </Form>
        {/* <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        /> */}
      </Card>
    </section>
  );
}

export default Contact;

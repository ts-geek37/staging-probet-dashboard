import ContactHero from "@/modules/sections/contact/ContactHero";
import { seo } from "@/utils/seo";
import React from "react";

export const metadata = seo({
  title: "Contact Us – Pro Bet | Get in Touch",
  description:
    "We’d love to hear from you. Contact Pro Bet for platform support, feature requests, partnership opportunities, or general feedback.",
});

const ContactPage: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col">
      <ContactHero />
    </main>
  );
};

export default ContactPage;

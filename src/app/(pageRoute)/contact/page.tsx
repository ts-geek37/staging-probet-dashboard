import React from "react";

import Contact from "@/modules/sections/contact";
import { seo } from "@/utils/seo";

export const metadata = seo({
  title: "Contact Us",
  description:
    "We'd love to hear from you. Contact ProBetPredictions for platform support, feature requests, partnership opportunities, or general feedback.",
});

const ContactPage: React.FC = () => {
  return <Contact />;
};

export default ContactPage;

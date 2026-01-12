"use client";

import LeagueBanner from "@/modules/leagues/LeagueBanner";

import ContactEntry from "./ContactEntry";
import ContactHero from "./ContactHero";

const Contact = () => {
  return (
    <>
      <ContactHero />
      <section className="flex-1 flex flex-col gap-10 relative mx-auto max-w-7xl px-4 md:px-0 py-16">
        <ContactEntry />
        <LeagueBanner banner="betting" />
      </section>
    </>
  );
};
export default Contact;

"use client";

import { Banner } from "@/components";
import { CONTACT_METHODS } from "../contansts";
import ContactCard from "./ContactCard";
import ContactEntry from "./ContactEntry";

const Contact = () => {
  return (
    <>
      <Banner
        title={
          <>
            Let&apos;s Connect &{" "}
            <span className="text-primary-green">Grow Together</span>
          </>
        }
        description="We'd love to hear from you. Whether you have feedback, feature suggestions, partnership inquiries, or general questions, our team is always happy to connect."
        accentColor="green"
        className="max-sm:pt-10 sm:min-h-150"
      >
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-6 w-full">
          {CONTACT_METHODS.map(({ id, icon: Icon, ...method }) => (
            <ContactCard
              key={id}
              icon={Icon}
              value={method.value}
              href={method.href}
              label={method.description}
              variant="method"
            />
          ))}
        </div>
      </Banner>

      <section className="flex-1 flex flex-col gap-10 relative mx-auto max-w-7xl px-4 md:px-0 py-16">
        <ContactEntry />
      </section>
    </>
  );
};
export default Contact;

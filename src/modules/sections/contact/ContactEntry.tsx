"use client";
import { INQUIRY_CATEGORIES } from "../contansts";
import ContactCard from "./ContactCard";

const ContactEntry: React.FC = () => {
  return (
    <div className="grid gap-5">
      <div className="flex lg:hidden flex-col gap-0 items-start justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-green">
          How can we help you?
        </h2>
        <p className="text-primary-gray text-sm sm:text-base md:text-lg">
          Choose the category that best matches your inquiry.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="hidden lg:flex flex-1 flex-col gap-2 items-start justify-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-green">
            How can we help you?
          </h2>
          <p className="text-primary-gray text-sm sm:text-base md:text-lg">
            Choose the category that best matches your inquiry
          </p>
        </div>
        {INQUIRY_CATEGORIES.map(({ id, icon: Icon, label, description }) => (
          <ContactCard
            key={id}
            icon={Icon}
            label={label}
            value={label}
            description={description}
            variant="category"
          />
        ))}
      </div>
    </div>
  );
};

export default ContactEntry;

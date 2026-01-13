import { Banner } from "@/components";

import { CONTACT_METHODS } from "../contansts";
import ContactCard from "./ContactCard";

const ContactHero: React.FC = () => {
  return (
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
  );
};
export default ContactHero;

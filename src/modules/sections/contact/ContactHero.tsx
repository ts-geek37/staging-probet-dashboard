import {
  Globe,
  Handshake,
  HelpCircle,
  Info,
  Mail,
  MessageSquare,
  Zap,
} from "lucide-react";
import React from "react";

const ContactHero: React.FC = () => {
  const contactMethods = [
    {
      title: "Email Us",
      value: "support@probet.com",
      icon: Mail,
      link: "mailto:support@probet.com",
    },
    {
      title: "Official Website",
      value: "www.probet.com",
      icon: Globe,
      link: "https://www.probet.com",
    },
  ];

  const categories = [
    { label: "Platform Support", icon: HelpCircle },
    { label: "Feature Requests", icon: Zap },
    { label: "Data Inquiries", icon: Info },
    { label: "Partnerships", icon: Handshake },
    { label: "General Feedback", icon: MessageSquare },
  ];

  return (
    <section className="relative w-full bg-primary-bg pt-32 pb-20 px-4">
      <div className="absolute top-0 right-0 h-160 w-160 rounded-full bg-primary-green/20 opacity-30 blur-[150px]" />
      <div className="absolute bottom-0 left-0 h-120 w-120 rounded-full bg-primary-green/10 opacity-20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-8">
              Let&apos;s Connect & <br />
              <span className="text-primary-green">Grow Together</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-xl leading-relaxed">
              We&apos;d love to hear from you. Whether you have feedback,
              feature suggestions, or partnership inquiries, our team is always
              happy to connect.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {contactMethods.map((method, idx) => (
                <a
                  key={idx}
                  href={method.link}
                  className="group flex flex-col p-6 rounded-3xl border border-white/5 bg-white/5 hover:border-primary-green/50 transition-all"
                >
                  <div className="h-12 w-12 rounded-2xl bg-primary-green/10 text-primary-green flex items-center justify-center mb-4 group-hover:bg-primary-green group-hover:text-black transition-colors">
                    <method.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm text-gray-400 mb-1">
                    {method.title}
                  </span>
                  <span className="text-lg font-bold text-white">
                    {method.value}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <h3 className="text-2xl font-bold text-white mb-8">
              What can we help with?
            </h3>
            <div className="space-y-4">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-transparent bg-white/5 hover:border-primary-green/30 hover:bg-white/10 transition-all cursor-default group"
                >
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary-green transition-colors">
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-gray-300 group-hover:text-white">
                    {cat.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-10 p-4 rounded-2xl bg-primary-green/10 border border-primary-green/20">
              <p className="text-sm text-primary-green font-medium text-center">
                Our team will respond to your inquiries as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;

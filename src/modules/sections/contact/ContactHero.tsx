import {
  ArrowUpRight,
  Globe,
  Handshake,
  HelpCircle,
  Info,
  Mail,
  MessageSquare,
  MonitorCog,
  Zap,
} from "lucide-react";

import { Card } from "@/components/ui/card";

const ContactHero = () => {
  const contactMethods = [
    {
      value: "support@probet.com",
      icon: Mail,
      link: "mailto:support@probet.com",
      description: "Get direct support",
    },
    {
      value: "www.probet.com",
      icon: Globe,
      link: "https://www.probet.com",
      description: "Visit our platform",
    },
  ];

  const categories = [
    { label: "Platform support", icon: MonitorCog },
    { label: "Feature requests", icon: Zap },
    { label: "Data or content inquiries", icon: Info },
    { label: "Partnership opportunities", icon: Handshake },
    { label: "General feedback", icon: MessageSquare },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute top-0 right-0 h-[40rem] w-[40rem] rounded-full bg-primary-green/20 opacity-30 blur-[150px]" />
      <div className="absolute bottom-0 left-0 h-[30rem] w-[30rem] rounded-full bg-primary-green/10 opacity-20 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[20rem] w-[20rem] rounded-full bg-primary-neon/10 opacity-10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="flex justify-center flex-wrap items-center gap-2 text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Let&apos;s Connect &
            <span className="text-primary-green">Grow Together</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
            We&apos;d love to hear from you. Whether you have feedback, feature
            suggestions, partnership inquiries, or general questions, our team
            is always happy to connect.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {contactMethods.map((method, idx) => (
            <a
              key={idx}
              href={method.link}
              target="_blank"
              className="group relative flex items-center gap-6 px-6 py-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 hover:border-primary-green/50 hover:shadow-2xl hover:shadow-primary-green/10 transition-all duration-300"
            >
              <div className="size-16 rounded-2xl bg-gradient-to-br from-primary-green/20 to-primary-green/5 text-primary-green flex items-center justify-center group-hover:scale-110 group-hover:from-primary-green group-hover:to-primary-green/80 group-hover:text-white transition-all duration-300 shadow-lg shadow-primary-green/20">
                <method.icon className="size-8" />
              </div>
              <div className="flex-1">
                <span className="text-sm text-gray-500 group-hover:text-white/60 mb-1 block">
                  {method.description}
                </span>
                <span className="text-xl font-bold text-white group-hover:text-primary-green block mb-1">
                  {method.value}
                </span>
              </div>
              <ArrowUpRight className="h-5 w-5 text-gray-600 group-hover:text-primary-green group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          ))}
        </div>

        <Card className="flex flex-col gap-8 rounded-[40px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/2 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-primary-green/10 flex items-center justify-center text-primary-green shrink-0">
              <HelpCircle className="size-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              How can we help you?
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.03] hover:border-primary-green/30 hover:bg-white/[0.08] transition-all cursor-default group"
              >
                <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary-green group-hover:bg-primary-green/10 transition-all shrink-0">
                  <cat.icon className="size-5" />
                </div>
                <span className="font-semibold text-gray-300 group-hover:text-white transition-colors">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ContactHero;

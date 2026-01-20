import { ArrowUpRight } from "lucide-react";
import React from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label?: string;
  value: string;
  href?: string;
  description?: string;
  variant?: "method" | "category";
  className?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon: Icon,
  label,
  value,
  href,
  description,
  variant = "method",
  className,
}) => {
  if (variant === "method") {
    const content = (
      <>
        <div className="flex sixe-10 sm:size-14 shrink-0 items-center justify-center rounded-xl bg-white/5 text-primary-gray transition-all duration-300 group-hover:bg-primary-green/10 group-hover:text-primary-green">
          <Icon className="size-6 sm:size-7" />
        </div>

        <div className="flex-1 text-left">
          {!!label && (
            <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500 transition-colors group-hover:text-primary-gray">
              {label}
            </span>
          )}
          <span className="block text-base sm:text-lg font-bold text-white transition-colors group-hover:text-primary-green">
            {value}
          </span>
        </div>

        {href && (
          <ArrowUpRight className="hidden sm:block size-6 text-gray-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-green" />
        )}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          rel="noopener noreferrer"
          target="_blank"
          className="flex w-full items-center gap-4"
        >
          <Card
            className={cn(
              "group relative w-full flex-row cursor-pointer items-center gap-4 border-white/10 p-2 transition-all duration-300 hover:border-primary-green/50 hover:shadow-lg hover:shadow-primary-green/10",
              className,
            )}
          >
            {content}
          </Card>
        </a>
      );
    }

    return (
      <Card
        className={cn(
          "group relative flex-row cursor-pointer items-center gap-4 border-white/10 p-6 transition-all duration-300 hover:border-primary-green/50 hover:shadow-lg hover:shadow-primary-green/10",
          className,
        )}
      >
        {content}
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "group relative gap-3 border-white/10 p-6 transition-all duration-300",
        "hover:border-primary-green/30 hover:shadow-md hover:shadow-primary-green/5",
        className,
      )}
    >
      <div
        className={cn(
          "flex size-12 items-center justify-center rounded-xl bg-white/5 text-primary-gray transition-all duration-300",
          "group-hover:bg-primary-green/10 group-hover:text-primary-green",
        )}
      >
        <Icon className="size-6" />
      </div>
      <div>
        <h3 className="mb-1.5 font-semibold text-white transition-colors group-hover:text-primary-green">
          {value}
        </h3>
        {description && (
          <p className="text-sm leading-relaxed text-primary-gray transition-colors group-hover:text-gray-300">
            {description}
          </p>
        )}
      </div>
    </Card>
  );
};

export default ContactCard;

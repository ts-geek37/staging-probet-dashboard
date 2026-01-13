import Link from "next/link";
import React from "react";

type FooterLink = {
  href: string;
  label: string;
};

interface FooterLinksGroupProps {
  title: string;
  links: FooterLink[];
}

const FooterLinksGroup: React.FC<FooterLinksGroupProps> = ({
  title,
  links,
}) => {
  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <h3 className="sm:text-lg text-base font-semibold text-white">{title}</h3>
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex items-center gap-2 max-sm:text-sm text-white/60 transition-colors duration-200 hover:text-primary-green"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinksGroup;

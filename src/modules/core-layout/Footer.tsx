"use client";

import Link from "next/link";
import React from "react";

import { socialMedia } from "./constant";

const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 border-primary-neon">
      <div className="max-w-7xl mx-auto px-6 py-6 flex max-sm:flex-col items-center justify-center sm:justify-between text-sm md:text-base">
        <p className="text-gray-400">© 2025 Probet. All rights reserved.</p>

        <div className="flex items-center gap-6">
          {socialMedia.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

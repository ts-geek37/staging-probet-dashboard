"use client";

import {
  Trophy,
  MapPin,
  Users,
  Twitter,
  Globe,
  Shield,
  Instagram,
  Facebook,
  Link as LinkIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Item {
  label: string;
  value?: string | number | null;
  extra?: string;
  image?: string | null;
}

interface Props {
  teamInfo?: Item[];
  venue?: Item[];
  seasons?: Item[];
  rankings?: Item[];
  rivals?: Item[];
  socials?: Item[];
}

const TeamProfileOverview: React.FC<Props> = ({
  teamInfo,
  venue,
  seasons,
  rankings,
  rivals,
  socials,
}) => {
  const getSocialIcon = (platform = "", className = "") => {
    const name = platform.toLowerCase();
    const props = { size: 14, className };
    if (name.includes("twitter") || name.includes("x.com"))
      return <Twitter {...props} />;
    if (name.includes("instagram")) return <Instagram {...props} />;
    if (name.includes("facebook")) return <Facebook {...props} />;
    return <Globe {...props} />;
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
      {teamInfo && (
        <Card className="col-span-1 md:col-span-2 md:row-span-2 p-6 relative overflow-hidden">
          {teamInfo[0]?.image && (
            <Image
              src={teamInfo[0].image}
              alt="Team Logo"
              fill
              className="absolute right-[-5%] bottom-[-5%] object-contain opacity-[0.05]"
            />
          )}

          <div className="relative z-10 flex flex-col justify-between h-full gap-6">
            <div>
              {teamInfo[1]?.value && (
                <Badge className="bg-primary-green/20 text-primary-green">
                  {teamInfo[1].value}
                </Badge>
              )}

              <h1 className="text-2xl md:text-5xl font-bold text-white">
                {teamInfo[0]?.value}
              </h1>

              <div className="flex items-center gap-2 text-white">
                {teamInfo[2]?.image && (
                  <Image
                    src={teamInfo[2].image}
                    alt="Country"
                    width={24}
                    height={24}
                  />
                )}
                {teamInfo[2]?.value}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                <p className="text-[10px] uppercase text-primary-gray">
                  Founded
                </p>
                <p className="text-white font-bold">
                  {teamInfo[3]?.value ?? "N/A"}
                </p>
              </div>

              <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                <p className="text-[10px] uppercase text-primary-gray">
                  Stadium
                </p>
                <p className="text-white font-bold truncate">
                  {venue?.[0]?.value ?? "N/A"}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {venue && (
        <Card className="md:row-span-2 relative overflow-hidden">
          {venue[1]?.image && (
            <Image
              src={venue[1].image}
              alt="Stadium"
              fill
              className="object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 p-5 flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 text-primary-green">
              <MapPin size={16} />
              <span className="uppercase tracking-widest text-sm">Venue</span>
            </div>

            <div className="bg-black/40 p-4 rounded-xl backdrop-blur-sm">
              <h3 className="text-white font-semibold">{venue[0]?.value}</h3>
              <p className="text-primary-green text-3xl font-black">
                {venue[2]?.value}
              </p>
              <p className="text-[10px] uppercase text-primary-gray">
                Capacity
              </p>
            </div>
          </div>
        </Card>
      )}

      {rankings?.[0] && (
        <Card className="p-6 bg-primary-green/5 border-primary-green/30 relative overflow-hidden">
          <div className="flex items-center gap-2 text-primary-green mb-2">
            <Trophy size={16} />
            <span className="uppercase tracking-widest text-sm">Ranking</span>
          </div>

          <p className="text-white font-medium">
            {rankings[0].label} {rankings[0].value}
          </p>
          <p className="text-xs text-primary-gray">
            {rankings[0].extra ?? "Top Tier Team"}
          </p>

          <Trophy
            size={100}
            className="absolute -right-5 -bottom-5 text-primary-green/10 -rotate-12 pointer-events-none"
          />
        </Card>
      )}

      {rivals && (
        <Card className="p-6">
          <div className="flex items-center gap-2 text-primary-green mb-4">
            <Shield size={16} />
            <span className="uppercase tracking-widest text-sm">
              Key Rivals
            </span>
          </div>

          <ul className="space-y-3">
            {rivals.map((r, i) => (
              <li key={i} className="flex items-center gap-3 text-white">
                {r.image && (
                  <Image src={r.image} alt={r.label} width={22} height={22} />
                )}
                <span className="truncate">{r.label}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {seasons && (
        <Card className="md:col-span-2 p-6">
          <div className="flex items-center gap-2 text-primary-green mb-4">
            <Users size={16} />
            <span className="uppercase tracking-widest text-sm">
              Current Seasons
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {seasons.map((s, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/5 rounded-xl p-4"
              >
                <div className="flex justify-between">
                  <p className="text-white font-semibold">{s.label}</p>
                  {s.value && (
                    <Badge className="bg-primary-green/20 text-primary-green text-[10px]">
                      {s.value}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-primary-gray mt-2">
                  {s.extra ?? "—"}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {socials && (
        <Card className="p-6">
          <div className="flex items-center gap-2 text-primary-green mb-4">
            <LinkIcon size={16} />
            <span className="uppercase tracking-widest text-sm">Connect</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.extra ?? "#"}
                target="_blank"
                className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-primary-green/10"
              >
                {getSocialIcon(s.label, "text-white")}
                <span className="text-xs text-white truncate">{s.label}</span>
              </a>
            ))}
          </div>
        </Card>
      )}
    </section>
  );
};

export default TeamProfileOverview;

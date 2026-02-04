"use client";
import {
  Calendar,
  Facebook,
  Globe,
  Instagram,
  MapPin,
  Shield,
  Trophy,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Item {
  id?: number | string;
  label: string;
  value?: string | number | null;
  extra?: string;
  image?: string | null;
}

interface Props {
  teamInfo?: Item[];
  venue?: Item[];
  seasons?: Item[];
  rivals?: Item[];
  socials?: Item[];
}

const TeamProfileOverview: React.FC<Props> = ({
  teamInfo,
  venue,
  seasons,
  rivals,
  socials,
}) => {
  const getSocialIcon = (platform = "") => {
    const name = platform.toLowerCase();
    const props = { size: 18 };
    if (name.includes("twitter") || name.includes("x.com"))
      return <Twitter {...props} />;
    if (name.includes("instagram")) return <Instagram {...props} />;
    if (name.includes("facebook")) return <Facebook {...props} />;
    return <Globe {...props} />;
  };

  const teamLogo = teamInfo?.[0]?.image;
  const teamDetails = [
    {
      icon: <Calendar size={18} />,
      label: "Founded",
      value: teamInfo?.[3]?.value,
    },
    {
      icon: <Globe size={18} />,
      label: "Country",
      value: teamInfo?.[2]?.value,
    },
  ].filter(
    (item) =>
      item.value !== undefined && item.value !== null && item.value !== "",
  );

  return (
    <div className="py-4 space-y-7">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {teamInfo && teamInfo.length > 0 && (
            <Card className="shadow-none border-primary-gray/20">
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 sm:gap-8">
                    <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gray-950 rounded-2xl flex items-center justify-center p-3 sm:p-4 border border-primary-gray/20 shrink-0">
                      {teamLogo ? (
                        <Image
                          src={teamLogo}
                          alt="Team logo"
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      ) : (
                        <Trophy className="text-primary-green w-8 h-8 sm:w-12 sm:h-12" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                        {teamInfo?.[0]?.value || "Team Name"}
                      </h2>
                      <div className="hidden sm:grid grid-cols-2 gap-4 mt-6">
                        {teamDetails.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-primary-gray/20"
                          >
                            <div className="text-primary-green">
                              {item.icon}
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-primary-gray font-bold">
                                {item.label}
                              </p>
                              <p className="text-sm font-semibold text-slate-200">
                                {item.value || "N/A"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {venue && venue.length > 0 && (
            <Card className="shadow-none border-primary-gray/20">
              <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-green/10 rounded-xl">
                    <MapPin size={24} className="text-primary-green" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {venue[0]?.value}
                    </h4>
                    <p className="text-primary-gray text-sm">Home Ground</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[10px] uppercase text-primary-gray font-bold">
                    Capacity
                  </p>
                  <p className="text-xl font-mono font-bold text-white">
                    {venue[2]?.value || "—"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* {rankings && rankings.length > 0 && (
          <Card className="shadow-none border-primary-gray/20 h-full">
            <CardContent>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-primary-green flex items-center gap-2">
                  <Trophy size={20} /> Rankings
                </h3>
                <TrendingUp size={20} className="text-primary-green/50" />
              </div>

              <div className="space-y-4">
                {rankings.map((rank, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-primary-gray/20 rounded-2xl p-3"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[11px] font-bold uppercase text-primary-gray">
                        {rank.label}
                      </span>
                      {rank.extra && (
                        <Badge className="bg-primary-green/10 text-primary-green border-primary-green/20 text-[10px]">
                          {rank.extra}
                        </Badge>
                      )}
                    </div>
                    <span className="text-2xl font-black text-white">
                      {rank.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )} */}
        {seasons && seasons.length > 0 && (
          <Card className="shadow-none border-primary-gray/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary-green flex items-center gap-2">
                <Trophy size={16} /> Recent Seasons
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="ml-2 border-l border-primary-gray/20 pl-6 space-y-8">
                {seasons.map((season, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[30px] top-2 w-3 h-3 rounded-full bg-primary-green" />
                    <h4 className="text-lg font-bold text-white">
                      {season.label}
                    </h4>
                    {season.extra && (
                      <p className="text-sm text-primary-gray">
                        {season.extra}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rivals && rivals.length > 0 && (
          <Card className="shadow-none border-primary-gray/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary-green flex items-center gap-2">
                <Shield size={16} /> Key Rivals
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {rivals.map((rival, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl bg-white/5 border border-primary-gray/20 p-3 hover:border-primary-green/40 hover:bg-white/10 transition-all"
                >
                  {rival.image && (
                    <Image
                      src={rival.image}
                      alt={rival.label}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  )}
                  <p className="text-sm font-medium text-white">
                    {rival.label}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {socials && socials.length > 0 && (
        <footer className="pt-8 border-t border-primary-gray/20 flex justify-between items-center flex-wrap gap-6">
          <div>
            <p className=" font-bold text-xl text-primary-green">
              Our Social Media Handles
            </p>
            <p className="text-primary-gray text-xs">Follow the journey</p>
          </div>

          <div className="flex gap-3">
            {socials.map((s, i) => (
              <a
                key={i}
                href="#"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-primary-gray/20 hover:text-primary-green hover:border-primary-green/40 transition-all"
              >
                {getSocialIcon(s.label)}
              </a>
            ))}
          </div>
        </footer>
      )}
    </div>
  );
};

export default TeamProfileOverview;

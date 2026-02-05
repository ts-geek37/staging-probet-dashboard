"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Landmark } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { NoData } from "@/components";
import { Card, CardContent } from "@/components/ui/card";

interface VenueInfoCardProps {
  venue?: {
    name?: string;
    city?: string;
    country?: string;
    capacity?: number;
    surface?: string;
    image?: string;
  };
}

const VenueInfoCard: React.FC<VenueInfoCardProps> = ({ venue }) => {
  const [imgSrc, setImgSrc] = useState<string>(
    venue?.image?.trim() || "/football-stadium.png",
  );

  if (!venue) return <NoData message="Venue information is not available" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="relative border-primary-gray/20 h-full text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={imgSrc}
            alt={venue.name || "Venue"}
            fill
            className="object-cover opacity-12"
            onError={() => setImgSrc("/football-stadium.png")}
          />
        </div>

        <CardContent className="p-4 relative z-10">
          <p className="text-sm sm:text-xl font-semibold mb-6">Venue</p>

          <div className="space-y-4 text-sm">
            {venue.name && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-white/70">
                  <Landmark size={16} /> Stadium
                </span>
                <span className="text-right">{venue.name}</span>
              </div>
            )}

            {(venue.city || venue.country) && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-white/70">
                  <MapPin size={16} /> Location
                </span>
                <span className="text-right">
                  {venue.city ?? ""}
                  {venue.city && venue.country ? ", " : ""}
                  {venue.country ?? ""}
                </span>
              </div>
            )}

            {venue.capacity && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-white/70">
                  <Users size={16} /> Capacity
                </span>
                <span className="text-right">
                  {venue.capacity.toLocaleString()}
                </span>
              </div>
            )}

            {venue.surface && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-white/70">
                  <Landmark size={16} /> Surface
                </span>
                <span className="text-right">{venue.surface}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VenueInfoCard;

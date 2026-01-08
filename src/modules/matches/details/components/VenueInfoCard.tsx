"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import { NoData } from "@/components";

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
  if (!venue) return <NoData />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="relative bg-[#14181F] border-primary-gray/20 h-full text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={venue.image || "/football-stadium.png"}
            alt={venue.name || "Venue"}
            fill
            className="object-cover opacity-12"
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
                <span>{venue.name}</span>
              </div>
            )}

            {(venue.city || venue.country) && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-white/70">
                  <MapPin size={16} /> Location
                </span>
                <span>
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
                <span>{venue.capacity.toLocaleString()}</span>
              </div>
            )}

            {venue.surface && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-white/70">
                  <Landmark size={16} /> Surface
                </span>
                <span>{venue.surface}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VenueInfoCard;

"use client";

import { motion } from "framer-motion";
import { Calendar, CalendarDays, Clock, Trophy, UserCheck } from "lucide-react";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { convertToLocalTime } from "@/utils/convertTime"; // adjust path if needed

interface MatchInfoCardProps {
  league?: { name: string };
  status?: string;
  referee?: string;
  season?: { name: string };
  kickoff_time?: string;
}

const MatchInfoCard: React.FC<MatchInfoCardProps> = ({
  league,
  status,
  referee,
  season,
  kickoff_time,
}) => {
  const formattedDate = kickoff_time
    ? new Date(kickoff_time).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const localTime = kickoff_time ? convertToLocalTime(kickoff_time).time : null;

  const formatStatus = (value: string) =>
    value
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="border-primary-gray/20 h-full text-white py-3">
        <CardContent className="p-4">
          <p className="text-sm sm:text-xl font-semibold mb-6">Match Info</p>

          <div className="space-y-4 text-sm">
            {league?.name && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-primary-gray">
                  <Trophy size={16} /> Competition
                </span>
                <span>{league.name}</span>
              </div>
            )}

            {formattedDate && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-primary-gray">
                  <Calendar size={16} /> Date
                </span>
                <span>{formattedDate}</span>
              </div>
            )}

            {localTime && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-primary-gray">
                  <Clock size={16} /> Time
                </span>
                <span>{localTime}</span>
              </div>
            )}

            {status && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-primary-gray">
                  <Clock size={16} /> Status
                </span>
                <span>{formatStatus(status)}</span>
              </div>
            )}

            {referee && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-primary-gray">
                  <UserCheck size={16} /> Referee
                </span>
                <span>{referee}</span>
              </div>
            )}

            {season?.name && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-primary-gray">
                  <CalendarDays size={16} /> Season
                </span>
                <span>{season.name}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MatchInfoCard;

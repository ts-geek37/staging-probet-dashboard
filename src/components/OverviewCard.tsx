"use client";

import Image from "next/image";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface OverviewItem {
  label: string;
  value?: string | number;
  type?: "text" | "badge" | "flag" | "icon";
  icon?: React.ReactNode;
  image?: string;
}

interface OverviewCardProps {
  title: string;
  items: OverviewItem[];
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, items }) => {
  return (
    <Card className="border border-primary-gray/20 text-primary-gray gap-4">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm sm:text-base">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <span className="text-primary-gray">{item.label}</span>
            <div className="flex items-center gap-2">
              {item.icon && item.icon}
              {item.image && (
                <Image
                  src={item.image}
                  alt={String(item.value)}
                  width={20}
                  height={20}
                />
              )}
              {item.type === "badge" ? (
                <Badge className="bg-primary-green/20 text-primary-green">
                  {item.value}
                </Badge>
              ) : (
                <span className="text-white">{item.value}</span>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OverviewCard;

"use client";

import Image from "next/image";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface OverviewItem {
  label: string;
  value?: string | number | null;
  type?: "text" | "badge" | "flag" | "icon";
  icon?: React.ReactNode;
  image?: string | null;
  extra?: string;
  color?: string;
}

interface OverviewCardProps {
  title: string;
  items: OverviewItem[];
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, items }) => {
  const isStadiumCard =
    title.toLowerCase().includes("stadium") ||
    title.toLowerCase().includes("venue");

  const isSocialCard = title.toLowerCase().includes("social");

  const stadiumItem = items.find((item) =>
    item.label.toLowerCase().includes("stadium image"),
  );
  const stadiumImage = stadiumItem?.image;

  const hasRenderableData = (item: OverviewItem) => {
    return (
      (item.value !== null &&
        item.value !== undefined &&
        item.value !== "" &&
        item.value !== "-") ||
      item.icon ||
      item.image ||
      item.extra
    );
  };

  const visibleItems = items.filter(
    (item) =>
      !item.label.toLowerCase().includes("stadium image") &&
      hasRenderableData(item),
  );

  if (visibleItems.length === 0) return null;

  return (
    <Card className="relative overflow-hidden border border-primary-gray/20 text-primary-gray min-h-full">
      {isStadiumCard && stadiumImage && (
        <>
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${stadiumImage})` }}
          />
          <div className="absolute inset-0 z-10 bg-black/90" />
        </>
      )}

      <div className="relative z-20 h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-white mb-3">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-sm sm:text-base">
          {visibleItems.map((item, index) => {
            if (isSocialCard) {
              return (
                <div
                  key={`${item.label}-${index}`}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    {item.color && (
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                    )}
                    <span className="text-primary-gray font-light">
                      {item.label}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-1 text-right">
                    <a
                      href={item.extra}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:underline"
                    >
                      {item.value}
                    </a>

                    <span className="text-[10px] sm:text-xs text-primary-gray/80 truncate ">
                      {item.extra}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={`${item.label}-${index}`}
                className="flex justify-between items-start"
              >
                <span className="text-primary-gray font-light">
                  {item.label}
                </span>

                <div className="flex flex-col items-end gap-1 text-right">
                  <div className="flex items-center gap-2">
                    {item.icon && (
                      <span className="text-primary-green">{item.icon}</span>
                    )}

                    {item.image && (
                      <Image
                        src={item.image}
                        alt={String(item.value ?? item.label)}
                        width={20}
                        height={20}
                        className="rounded-sm object-contain"
                      />
                    )}

                    {item.type === "badge" ? (
                      <Badge className="bg-primary-green/20 text-primary-green rounded-sm border-none">
                        {item.value}
                      </Badge>
                    ) : (
                      <span className="text-white font-medium">
                        {item.value}
                      </span>
                    )}
                  </div>

                  {item.extra && (
                    <span className="text-[10px] sm:text-xs text-primary-gray/90 uppercase tracking-wider">
                      {item.extra}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </div>
    </Card>
  );
};

export default OverviewCard;

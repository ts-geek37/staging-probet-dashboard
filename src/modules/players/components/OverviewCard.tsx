"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title: string;
  children: React.ReactNode;
}

const OverviewCard: React.FC<Props> = ({ title, children }) => (
  <Card className="h-full rounded-xl border border-primary-gray/20">
    <CardHeader>
      <CardTitle className="text-base font-semibold text-white">
        {title}
      </CardTitle>
    </CardHeader>

    <CardContent className="space-y-4 text-sm">{children}</CardContent>
  </Card>
);

export default OverviewCard;

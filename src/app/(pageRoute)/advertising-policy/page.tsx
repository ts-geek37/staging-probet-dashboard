import React from "react";
import AdvertisingPolicy from "@/modules/legal/AdvertisingPolicy";
import { seo } from "@/utils/seo";

export const metadata = seo({
  title: "Advertising Policy",
  description:
    "Read our Advertising Policy to understand how we handle advertisements and partnerships at ProBetTips.",
});

const AdvertisingPolicyPage: React.FC = () => {
  return <AdvertisingPolicy />;
};

export default AdvertisingPolicyPage;

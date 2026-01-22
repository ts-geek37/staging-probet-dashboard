import React from "react";

import PrivacyPolicy from "@/modules/legal/PrivacyPolicy";
import { seo } from "@/utils/seo";

export const metadata = seo({
  title: "Privacy Policy",
  description:
    "Read our Privacy Policy to understand how we collect, use, and protect your information at ProBetPredictions.",
});

const PrivacyPolicyPage: React.FC = () => {
  return <PrivacyPolicy />;
};

export default PrivacyPolicyPage;

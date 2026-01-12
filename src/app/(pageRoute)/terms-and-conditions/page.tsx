import React from "react";
import TermsAndConditions from "@/modules/legal/TermsAndConditions";
import { seo } from "@/utils/seo";

export const metadata = seo({
  title: "Terms & Conditions",
  description:
    "Read our Terms & Conditions to understand the rules and guidelines for using ProBetTips.",
});

const TermsAndConditionsPage: React.FC = () => {
  return <TermsAndConditions />;
};

export default TermsAndConditionsPage;

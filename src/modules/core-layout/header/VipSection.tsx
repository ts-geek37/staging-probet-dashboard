import Link from "next/link";

import { vipLink } from "@/modules/core-layout/constant";

import { Button } from "../../../components/ui/button";

type VipSectionProps = {
  onNavigate?: () => void;
};

const VipSection: React.FC<VipSectionProps> = ({ onNavigate }) => {
  const Icon = vipLink.icon;

  return (
    <>
      <Link
        href={vipLink.href}
        onClick={onNavigate}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-yellow hover:bg-gray-800/50"
      >
        <Icon className="w-5 h-5" />
        <span className="text-base font-semibold">{vipLink.name}</span>
      </Link>

      <Button
        variant="ghost"
        className="max-sm:w-full text-gray-300 hover:text-white hover:bg-gray-800/50"
      >
        Login
      </Button>

      <Button variant="neon" className="max-sm:w-full">
        Get started
      </Button>
    </>
  );
};
export default VipSection;

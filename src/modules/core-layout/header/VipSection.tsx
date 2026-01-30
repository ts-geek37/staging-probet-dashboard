import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSubscription } from "@/context";
import { cn } from "@/lib/utils";
import { vipLink } from "@/modules/core-layout/constant";

import { Button } from "../../../components/ui/button";

type VipSectionProps = {
  onNavigate?: () => void;
};

const VipSection: React.FC<VipSectionProps> = ({ onNavigate }) => {
  const Icon = vipLink.icon;
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const { isVip } = useSubscription();

  const handleLogin = () => {
    router.push("/sign-in");
  };

  const handleGetStarted = () => {
    router.push("/sign-up");
  };

  return (
    <>
      <Link
        href={vipLink.href}
        onClick={onNavigate}
        className="flex items-center gap-3 py-3 px-1 rounded-lg text-primary-yellow hover:bg-gray-800/50"
      >
        <Icon
          className={cn(
            "w-5 h-5",
            isVip
              ? "text-primary-yellow fill-primary-yellow"
              : "text-primary-yellow",
          )}
        />
        <span className={cn("text-base font-semibold", isVip ? "md:hidden" : "block")}>{vipLink.name}</span>
      </Link>

      {user ? (
        <div className="hidden sm:block">
          <UserButton />
        </div>
      ) : (
        <Button
          variant="default"
          onClick={handleLogin}
          className="max-sm:w-full my-2"
        >
          Login
        </Button>
      )}

      {!isSignedIn && (
        <Button
          onClick={handleGetStarted}
          variant="neon"
          className="max-sm:w-full"
        >
          Get started
        </Button>
      )}
    </>
  );
};
export default VipSection;

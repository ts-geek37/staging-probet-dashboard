import { Banner } from "@/components";
import { Button } from "@/components/ui/button";
import { Crown, TrendingUp } from "lucide-react";
import Link from "next/link";

const HomeBanner: React.FC = () => {
  return (
    <Banner
      title={
        <>
          Live Scores & <br />
          Match Predictions
        </>
      }
      className="mb-10 md:mb-15"
      description="Real-time football scores, comprehensive match statistics, and data-driven predictions across Europe's top leagues."
    >
      <div className="flex flex-wrap items-center justify-center gap-6">
        <Link href="/prediction">
          <Button
            variant="secondary"
            className="h-14 w-60 rounded-xl text-base sm:text-xl font-medium shadow-[0_0_24px] shadow-primary-neon/50"
          >
            <TrendingUp className="mr-3 h-6 w-6" />
            View Predictions
          </Button>
        </Link>

        <Link href="/price">
          <Button
            variant="outline"
            className="h-14 w-60 rounded-xl text-base sm:text-xl font-medium"
          >
            <Crown className="mr-3 h-6 w-6" />
            Become VIP
          </Button>
        </Link>
      </div>
    </Banner>
  );
};

export default HomeBanner;

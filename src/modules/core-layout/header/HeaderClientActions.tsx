"use client";

import { navlinks, vipLink } from "../constant";
import MobileNavSheet from "./MobileNavSheet";
import VipSection from "./VipSection";

const HeaderClientActions = () => {
  return (
    <>
      <div className="hidden sm:flex items-center justify-end justify-self-end gap-4">
        <VipSection />
        <div className="sm:max-nav:block hidden">
          <MobileNavSheet links={navlinks} />
        </div>
      </div>

      <div className="max-sm:block hidden justify-self-end">
        <MobileNavSheet links={navlinks} vipLink={vipLink} />
      </div>
    </>
  );
};

export default HeaderClientActions;

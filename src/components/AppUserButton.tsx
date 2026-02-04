"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import { useState } from "react";

import { useSubscription } from "@/context";
import SubscriptionDetailsModal from "@/modules/billing/components/SubscriptionDetailsModal";

const AppUserButton = () => {
  const { user } = useUser();
  const { isVip } = useSubscription();
  const [showPlanModal, setShowPlanModal] = useState(false);

  if (!user) return null;

  return (
    <>
      <UserButton
        appearance={{
          elements: {
            userButtonPopoverCard: {
              pointerEvents: "auto",
              zIndex: 9999,
            },
            userButtonPopoverActionButton: {
              pointerEvents: "auto",
            },
          },
        }}
      >
        {isVip && (
          <UserButton.MenuItems>
            <UserButton.Action
              label="Current Plan"
              labelIcon={<CreditCard className="size-4" />}
              onClick={() => setShowPlanModal(true)}
            />
          </UserButton.MenuItems>
        )}
      </UserButton>

      {isVip && (
        <SubscriptionDetailsModal
          open={showPlanModal}
          onOpenChange={setShowPlanModal}
        />
      )}
    </>
  );
};

export default AppUserButton;

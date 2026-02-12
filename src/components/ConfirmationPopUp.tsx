"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ConfirmationPopUpProps {
  title: string;
  description: string | React.ReactNode;
  onConfirm: () => void;
  trigger: React.ReactNode;
  confirmDisabled?: boolean;
}

export const ConfirmationPopUp: React.FC<ConfirmationPopUpProps> = ({
  title,
  description,
  onConfirm,
  trigger,
  confirmDisabled
}) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-primary-green ">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-white">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button type="button">Cancel</Button>
          </DialogClose>
          <Button variant="green" onClick={handleConfirm}  disabled={confirmDisabled} type="button">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

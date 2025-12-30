"use client";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      path="/sign-up"
      routing="path"
      unsafeMetadata={{
        hasCompletedOnboarding: false,
      }}
    />
  );
}

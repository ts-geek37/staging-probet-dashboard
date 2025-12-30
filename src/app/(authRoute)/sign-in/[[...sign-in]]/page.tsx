"use client";
import { SignIn } from "@clerk/nextjs";

const SignInPage: React.FC = () => {
  return (
    <SignIn
      path="/sign-in"
      routing="path"
      appearance={{
        layout: {
          socialButtonsPlacement: "top",
          socialButtonsVariant: "auto",
          showOptionalFields: true,
        },
      }}
    />
  );
};

export default SignInPage;

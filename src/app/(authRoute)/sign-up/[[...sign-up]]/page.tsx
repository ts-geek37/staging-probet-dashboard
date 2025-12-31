"use client";
import { SignUp } from "@clerk/nextjs";

const SignUpPage: React.FC = () => {
  return <SignUp path="/sign-up" routing="path" />;
};

export default SignUpPage;

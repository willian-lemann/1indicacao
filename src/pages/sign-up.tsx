import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <SignUp path="/sign-up" afterSignUpUrl="/" />
    </div>
  );
}

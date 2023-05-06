import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <SignUp
        path="/cadastro"
        afterSignUpUrl="/onboarding"
        appearance={{
          variables: {
            colorPrimary: "#110634",
          },
        }}
      />
    </div>
  );
}

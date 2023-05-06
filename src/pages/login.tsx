import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <SignIn
        path="/login"
        signUpUrl="/cadastro"
        afterSignInUrl="/onboarding"
        redirectUrl="/onboarding"
        appearance={{
          variables: {
            colorPrimary: "#110634",
          },
        }}
      />
    </div>
  );
}

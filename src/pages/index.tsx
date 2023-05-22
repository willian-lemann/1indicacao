import { OurSolution } from "@/features/landing/OurSolution";
import { Hero } from "@/features/landing/Hero";
import { Footer } from "@/features/landing/Footer";

import { Header } from "@/features/landing/Header";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { getSSRAppRouter } from "@/server/api/root";
import { getAuth } from "@clerk/nextjs/server";

type HomeProps = {
  isSignedIn: boolean;
  isEmployer: boolean;
};

export default function Home({ isSignedIn, isEmployer }: HomeProps) {
  return (
    <div className="h-screen">
      <Header isSignedIn={isSignedIn} isEmployer={isEmployer} />
      <Hero isSignedIn={isSignedIn} isEmployer={isEmployer} />
      <OurSolution />
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { userId } = getAuth(context.req);

  const api = getSSRAppRouter(context);

  let user = null;

  if (userId) {
    user = await api.users.byUserId();
  }

  return {
    props: {
      isSignedIn: userId,
      isEmployer: userId && user?.role === "employer",
    },
  };
};

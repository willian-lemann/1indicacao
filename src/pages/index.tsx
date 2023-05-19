import { Logo } from "@/components/Logo";
import { useAuth } from "@/features/authentication/hooks/use-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { OurSolution } from "@/features/landing/OurSolution";
import { Hero } from "@/features/landing/Hero";
import { Footer } from "@/features/landing/Footer";

import { CookieConsent } from "@/lib/cookie-consent";
import { Cookie } from "@/components/CookieConsent";
import { Header } from "@/features/landing/Header";

export default function Home() {
  return (
    <div className="h-screen">
      <Header />
      <Hero />
      <OurSolution />
      <Footer />
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const api = getSSRAppRouter(context);

//   try {
//     const user = await api.users.byUserId();

//     if (user?.role === "employer") {
//       return {
//         redirect: {
//           permanent: false,
//           destination: "/empresa",
//         },
//         props: {},
//       };
//     }

//     if (user?.role === "candidate") {
//       return {
//         redirect: {
//           permanent: false,
//           destination: "/candidato",
//         },
//         props: {},
//       };
//     }
//   } catch (error: any) {
//     if (error.code === "UNAUTHORIZED") {
//       return {
//         redirect: {
//           permanent: false,
//           destination: "/",
//         },
//         props: {},
//       };
//     }
//   }

//   const locations = await api.locations.getAll();

//   return {
//     props: {
//       locations,
//     },
//   };
// };

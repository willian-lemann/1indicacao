import { Header } from "@/components/Header";
import { Profile } from "@/components/Profile";
import { Candidates } from "@/features/candidates/Candidates";
import { useFetchCandidates } from "@/features/candidates/hooks/use-fetch-candidates";
import { Jobs } from "@/features/employers/Jobs";
import { getSSRAppRouter } from "@/server/api/root";
import { Tab } from "@headlessui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function Employer() {
  useFetchCandidates();

  return (
    <div>
      <Tab.Group defaultIndex={1}>
        <Header />
        <Tab.Panels>
          <Tab.Panel>
            <Profile />
          </Tab.Panel>

          <Tab.Panel>
            <Candidates />
          </Tab.Panel>

          <Tab.Panel>
            <Jobs />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const api = getSSRAppRouter(context);

  try {
    const user = await api.users.byUserId();

    if (user?.role === "candidate") {
      return {
        redirect: {
          permanent: false,
          destination: "/candidato",
        },
        props: {},
      };
    }
  } catch (error: any) {
    if (error.code === "UNAUTHORIZED") {
      return {
        redirect: {
          permanent: false,
          destination: "/sign-in",
        },
        props: {},
      };
    }
  }

  return {
    props: {},
  };
};

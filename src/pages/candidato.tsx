import { Header } from "@/components/Header";
import { Profile } from "@/components/Profile";
import { Jobs } from "@/features/employers/Jobs";
import { getSSRAppRouter } from "@/server/api/root";
import { Tab } from "@headlessui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function Candidate() {
  return (
    <div>
      <Tab.Group>
        <Header />
        <Tab.Panels>
          <Tab.Panel>
            <Profile />
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

    if (user?.role === "employer") {
      return {
        redirect: {
          permanent: false,
          destination: "/empresa",
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

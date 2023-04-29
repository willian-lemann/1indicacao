import { Header, Permissions } from "@/components/Header";
import { Profile } from "@/components/Profile";

import { Candidates } from "@/features/candidates/Candidates";
import { useFetchCandidates } from "@/features/candidates/hooks/use-fetch-candidates";
import { Jobs } from "@/features/employers/Jobs";
import { Location } from "@/features/locations/types/location";
import { LocationOption } from "@/features/locations/types/location-option";
import { getSSRAppRouter } from "@/server/api/root";
import { Tab } from "@headlessui/react";
import { User } from "@prisma/client";

import { GetServerSideProps, GetServerSidePropsContext } from "next";

type EmployerProps = {
  permissions: Permissions;
  locations: LocationOption[];
};

export default function Employer({ permissions, locations }: EmployerProps) {
  useFetchCandidates();

  return (
    <div>
      <Tab.Group defaultIndex={1}>
        <Header permissions={permissions} locations={locations} />

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

  let locations: Location[];
  let user: User | null;

  try {
    user = await api.users.byUserId();
    locations = await api.locations.getAll();

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
    }

    if (user?.role === "candidate") {
      return {
        redirect: {
          permanent: false,
          destination: "/candidato",
        },
        props: {},
      };
    }

    return {
      props: {
        permissions: {
          isCandidate: String(user.role) === "candidate",
          isEmployer: String(user.role) === "employer",
        },
        locations: locations.map((location) => ({
          label: location.name,
          value: location.id,
        })),
      },
    };
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

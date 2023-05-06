import { Header, Permissions } from "@/components/Header";
import { Profile } from "@/components/Profile";
import { useAuth } from "@/features/authentication/hooks/use-auth";
import { Location } from "@/features/authentication/types/location";
import WarningFillProfile from "@/features/candidates/WarningFillProfile";
import { Companies } from "@/features/employers/Companies";
import { useFetchCompanies } from "@/features/employers/hooks/use-fetch-companies";
import { useFetchJobs } from "@/features/employers/hooks/use-fetch-jobs";
import { Jobs } from "@/features/employers/Jobs";
import { LocationOption } from "@/features/locations/types/location-option";
import { getSSRAppRouter } from "@/server/api/root";
import { Tab } from "@headlessui/react";
import { User } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type EmployerProps = {
  permissions: Permissions;
  locations: LocationOption[];
};

export default function Candidate({ permissions, locations }: EmployerProps) {
  const { hasFullProfile } = useAuth();
  useFetchCompanies();
  useFetchJobs();

  return (
    <>
      <WarningFillProfile />

      <div>
        <Tab.Group defaultIndex={hasFullProfile ? 1 : 0}>
          <Header permissions={permissions} locations={locations} />
          <Tab.Panels>
            <Tab.Panel>
              <Profile />
            </Tab.Panel>
            <Tab.Panel>
              <Companies />
            </Tab.Panel>

            <Tab.Panel>
              <Jobs />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const api = getSSRAppRouter(context);

  let user: User | null;
  let locations: Location[];

  try {
    user = await api.users.byUserId();
    locations = await api.locations.getAll();

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/onboarding",
        },
        props: {},
      };
    }

    if (user?.role === "employer") {
      return {
        redirect: {
          permanent: false,
          destination: "/empresa",
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
          destination: "/login",
        },
        props: {},
      };
    }
  }

  return {
    props: {},
  };
};

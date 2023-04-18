import { Header } from "@/components/Header";
import { Candidates } from "@/features/users/Candidates";
import { MyJobs } from "@/features/jobs/MyJobs";
import { Tab } from "@headlessui/react";

export default function Employer() {
  return (
    <div>
      <Tab.Group>
        <Header />
        <Tab.Panels>
          <Tab.Panel>Meu perfil</Tab.Panel>

          <Tab.Panel>
            <Candidates />
          </Tab.Panel>

          <Tab.Panel>
            <MyJobs />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

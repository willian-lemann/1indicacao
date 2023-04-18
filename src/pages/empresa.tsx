import { Header } from "@/components/Header";
import { Candidates } from "@/features/users/Candidates";
import { Jobs } from "@/features/jobs/Jobs";
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
            <Jobs />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

import { Header } from "@/components/Header";
import { Profile } from "@/components/Profile";
import { Jobs } from "@/features/employers/Jobs";
import { Tab } from "@headlessui/react";

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

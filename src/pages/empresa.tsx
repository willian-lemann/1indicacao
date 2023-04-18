import { Header } from "@/components/Header";
import { Tab } from "@headlessui/react";

export default function Employer() {
  return (
    <div className="container">
      <Tab.Group>
        <Header />
        <Tab.Panels>
          <Tab.Panel>1</Tab.Panel>
          <Tab.Panel>2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

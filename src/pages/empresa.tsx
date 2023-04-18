import { Header } from "@/components/Header";
import { Tab } from "@headlessui/react";

export default function Employer() {
  return (
    <div className="container">
      <Tab.Group>
        <Header />
        <Tab.Panels>
          <Tab.Panel>Meu perfil</Tab.Panel>
          <Tab.Panel>Candidatos</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

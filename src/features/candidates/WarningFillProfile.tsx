import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ExclamationTriangleIcon as Warning,
} from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { useCandidates } from "./hooks/use-candidates";

export default function WarningFillProfile() {
  const { isWarningFullProfile, closeWarningFullProfile } = useCandidates();

  return (
    <Transition appear show={isWarningFullProfile} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 "
        onClose={() => closeWarningFullProfile()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-primary text-white p-10 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="flex items-center justify-between">
                  <Warning className="h-10 w-10 text-yellow-400" /> Seu perfil
                  está incompleto!
                  <XMarkIcon
                    className="h-6 w-6 text-white cursor-pointer"
                    onClick={closeWarningFullProfile}
                  />
                </Dialog.Title>

                <div className="mt-10">
                  <h1 className="leading-relaxed">
                    É muito importante que você preencha completamente todas as
                    informações do seu perfil na plataforma.
                    Isso permitirá que a empresa saiba mais sobre você, suas
                    habilidades e experiências, o que aumentará suas chances de
                    ser chamado para uma entrevista.
                  </h1>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

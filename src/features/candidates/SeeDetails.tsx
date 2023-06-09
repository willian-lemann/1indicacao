import { classnames } from "@/utils/classnames";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon as CloseIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";

type SeeDetailsProps = { name: string; description: string };

export function SeeDetails({ name, description }: SeeDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        onClick={openModal}
        className="bg-primary/70 hover:bg-primary transition-colors px-4 py-2 rounded-full absolute -bottom-5 text-white left-1/2 -translate-x-1/2"
      >
        Ver mais
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform h-[300px] overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between"
                  >
                    <span> {name}</span>
                    <CloseIcon
                      className="text-primary w-6 h-6 cursor-pointer"
                      onClick={closeModal}
                    />
                  </Dialog.Title>
                  <div
                    className={classnames(
                      description ? "opacity-100 mt-2" : "opacity-60 mt-4"
                    )}
                  >
                    {description || `${name} ainda não colocou sua descrição`}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

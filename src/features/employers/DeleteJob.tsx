import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useJob } from "./hooks/use-job";
import { useJobs } from "./hooks/use-jobs";

type DeleteJobProps = { id: string };

export default function DeleteJob({ id }: DeleteJobProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { deleteJob } = useJobs();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button onClick={openModal} className="text-primary px-4 py-2 rounded">
        Deletar
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
                <Dialog.Panel className="w-full flex flex-col max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title>
                    Tem certeza que deseja deletar essa vaga?
                  </Dialog.Title>

                  <div className="mt-10 self-end">
                    <button
                      className="text-primary px-3 py-1 rounded"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                    <button
                      className="bg-red-600 px-3 py-1 text-white rounded"
                      onClick={() => deleteJob(id)}
                    >
                      Deletar
                    </button>
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

import { addSuccessNotification } from "@/components/Alert";
import { CreateJobSchemaData } from "@/server/api/routers/jobs";
import { api } from "@/utils/api";
import { uniqueId } from "@/utils/uniqueId";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../authentication/hooks/use-auth";

import { useJobs } from "./hooks/use-jobs";

export default function AddJob() {
  const router = useRouter();
  const { user } = useAuth();
  const { addNewJob } = useJobs();

  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm<CreateJobSchemaData>();

  const { mutateAsync } = api.jobs.create.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    const newJob = { ...data, positions: String(data.positions) };

    await mutateAsync(newJob);

    addSuccessNotification("Vaga salva!");

    setIsOpen(false);

    addNewJob({
      user: { name: user.name as string },
      id: uniqueId,
      createdAt: new Date(),
      isActive: true,
      position: newJob.position,
      positions: Number(newJob.positions),
      salary: newJob.salary,
    });

    router.reload();
  });

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
        className="bg-primary px-4 py-2 rounded text-white"
      >
        Cadastrar Vaga
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={onSubmit} className="flex flex-col">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Cadastrar vaga
                    </Dialog.Title>
                    <div className="mt-2">
                      <div>
                        <h2 className="opacity-70">Número de vagas</h2>
                        <input
                          type="number"
                          className="px-4 py-2 outline-none border border-primary rounded border-opacity-50 mb-4"
                          placeholder="Número de vagas"
                          {...register("positions")}
                        />
                      </div>

                      <div>
                        <h2 className="opacity-70">Remuneração</h2>
                        <input
                          type="text"
                          className="px-4 py-2 outline-none border border-primary rounded border-opacity-50 mb-4"
                          placeholder="Remuneração"
                          {...register("salary")}
                        />
                      </div>

                      <div>
                        <h2 className="opacity-70">Cargo ou função</h2>
                        <textarea
                          className="px-4 py-2 outline-none border border-primary rounded border-opacity-50 mb-4 w-full"
                          placeholder="Descrição da vaga"
                          {...register("position")}
                        />
                      </div>

                      <div>
                        <h2 className="opacity-70">Descrição da vaga</h2>
                        <textarea
                          className="px-4 py-2 outline-none border h-40 border-primary rounded border-opacity-50 mb-4 w-full"
                          placeholder="Descrição da vaga"
                          {...register("description")}
                        />
                      </div>
                    </div>

                    <div className="mt-4 self-end">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white "
                      >
                        Salvar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

import { addSuccessNotification } from "@/components/Alert";
import { Input } from "@/components/Input";
import { Loading } from "@/components/Loading";
import { SaveButton } from "@/components/SaveButton";
import { Textarea } from "@/components/Textarea";
import { CreateJobSchemaData } from "@/server/api/routers/jobs";
import { api } from "@/utils/api";
import { uniqueId } from "@/utils/uniqueId";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../authentication/hooks/use-auth";

import { useJobs } from "./hooks/use-jobs";
import { classnames } from "@/utils/classnames";

export default function AddJob() {
  const router = useRouter();
  const { user } = useAuth();
  const { addNewJob } = useJobs();

  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm<CreateJobSchemaData>();

  const { mutateAsync, isLoading } = api.jobs.create.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    const newJob = { ...data, positions: String(data.positions) };

    const createdJobId = await mutateAsync(newJob);

    addSuccessNotification("Vaga salva!");

    setIsOpen(false);

    addNewJob({
      user: {
        ...user,
        locationId: String(user.locationId),
        name: user.name as string,
      },
      id: createdJobId,
      createdAt: new Date(),
      isActive: true,
      position: newJob.position,
      positions: Number(newJob.positions),
      salary: newJob.salary,
      description: String(newJob.description),
    });
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
        disabled={isLoading}
        onClick={openModal}
        className={classnames(
          isLoading ? "opacity-80" : "opacity-100",
          "bg-primary px-4 py-2 rounded text-white"
        )}
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
            <div className="flex justify-center items-center h-full text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md md:max-w-2xl transform h-[700px] rounded-2xl bg-white p-6 overflow-auto text-left align-middle shadow-xl transition-all">
                  <form
                    onSubmit={onSubmit}
                    className="flex flex-col justify-between h-full"
                  >
                    <Dialog.Title
                      as="h3"
                      className="text-lg flex items-center justify-between font-medium leading-6 text-gray-900"
                    >
                      Cadastrar vaga
                      <XMarkIcon className="h-6 w-6" onClick={closeModal} />
                    </Dialog.Title>
                    <div className="mt-2">
                      <Input
                        type="number"
                        className="px-4 py-2 outline-none border border-primary rounded border-opacity-50 mb-4"
                        placeholder="Número de vagas"
                        register={register("positions")}
                      >
                        <Input.Label>Número de vagas</Input.Label>
                      </Input>

                      <Input
                        type="text"
                        className="px-4 py-2 outline-none border border-primary rounded border-opacity-50 mb-4"
                        placeholder="Remuneração"
                        register={register("salary")}
                      >
                        <Input.Label>Remuneração</Input.Label>
                      </Input>

                      <Input
                        className="px-4 py-2 outline-none border border-primary rounded border-opacity-50 mb-4 w-full"
                        placeholder="Descrição da vaga"
                        register={register("position")}
                      >
                        <Input.Label>Cargo ou função</Input.Label>
                      </Input>

                      <Textarea
                        className="px-4 py-2 outline-none border h-48 border-primary rounded border-opacity-50 mb-4 w-full"
                        placeholder="Descrição da vaga"
                        register={register("description")}
                      >
                        <Textarea.Label>Descrição da vaga</Textarea.Label>
                      </Textarea>
                    </div>

                    <div className="mt-4 self-end">
                      <SaveButton loading={isLoading} />
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

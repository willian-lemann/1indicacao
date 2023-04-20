import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/features/authentication/hooks/use-auth";
import Image from "next/image";

import { api } from "@/utils/api";
import { addSuccessNotification } from "../Alert";
import { UpdateUserSchemaData } from "@/server/api/routers/users";

export function Profile() {
  const { user, isCandidate } = useAuth();
  const { register, handleSubmit } = useForm<UpdateUserSchemaData>({
    values: {
      name: user?.name as string,
      position: user?.position as string,
      description: user?.description as string,
      instagram: user?.instagram as string,
      phone: user?.phone as string,
    },
  });

  const { mutateAsync } = api.users.update.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync({ ...data });
    addSuccessNotification("Perfil salvo!");
  });

  const placeholder = ` ${
    isCandidate
      ? 'Exemplo. "Olá, meu nome é [seu nome]. Estou animado para me candidatar a esta vaga de emprego administrativo e contribuir com minhas habilidades. Tenho [X] anos de experiência em cargos administrativos e sou altamente organizado e capaz de gerenciar múltiplas tarefas simultaneamente. Minhas habilidades incluem [lista de habilidades relevantes]. Estou animado para falar mais sobre minhas qualificações e contribuições para esta posição em uma entrevista. Obrigado pela consideração."'
      : "Caso você prefira escrever uma breve descrição sobre sua empresa"
  }`;

  return (
    <div className="container max-w-2xl">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="mt-10 flex justify-end">
          <button className="px-4 py-2 bg-primary  text-white rounded cursor-pointer gap-2">
            <span>Salvar</span>
          </button>
        </div>

        <div className="flex items-center w-full justify-between">
          <div className="mt-4">
            <h2 className="text-primary/70">
              {isCandidate ? "Nome" : "Nome da empresa"}
            </h2>
            <input
              type="text"
              placeholder="nome"
              className="px-4 py-2 outline-none border border-primary rounded mt-2"
              {...register("name")}
            />
          </div>

          {isCandidate ? (
            <div className="mt-4">
              <h2 className="text-primary/70">Seu cargo</h2>
              <input
                type="text"
                placeholder="seu cargo"
                className="px-4 py-2 outline-none border border-primary rounded mt-2"
                {...register("position")}
              />
            </div>
          ) : null}
        </div>

        <div className="flex items-center w-full justify-between">
          <div className="mt-4">
            <h2 className="text-primary/70">Whatsapp (opcional)</h2>
            <input
              type="text"
              placeholder="whatsapp"
              className="px-4 py-2 outline-none border border-primary rounded mt-2"
              {...register("phone")}
            />
          </div>

          <div className="mt-4 w-full  ml-4 ">
            <h2 className="text-primary/70">Instagram (opcional)</h2>
            <input
              type="text"
              placeholder="link do instagram"
              className="px-4 py-2 outline-none w-full border border-primary rounded mt-2"
              {...register("instagram")}
            />
          </div>
        </div>

        <div className="mt-4 w-full">
          <h2 className="text-primary/70">
            {isCandidate
              ? "Fale um pouco sobre suas experiencias:"
              : "Breve descrição da empresa"}
          </h2>

          <textarea
            id="description"
            className="border  border-primary w-full h-[300px] p-4 rounded mt-2"
            placeholder={placeholder}
            {...register("description")}
          />
        </div>
      </form>
    </div>
  );
}

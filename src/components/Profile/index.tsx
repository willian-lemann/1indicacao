import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/features/authentication/hooks/use-auth";
import Image from "next/image";
import { flushSync } from "react-dom";

import { api } from "@/utils/api";
import { addSuccessNotification } from "../Alert";

export function Profile() {
  const { user, isCandidate } = useAuth();
  const { register, handleSubmit, setValue, watch } = useForm();

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

  useEffect(() => {
    if (user) {
      console.log(user.name);
      setValue("name", user.name);
      setValue("description", user.description);
    }
  }, [setValue, user]);

  return (
    <div className="container max-w-2xl">
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="mt-10 flex items-center">
          <div className="relative h-24 w-24 rounded-full">
            <Image
              src="https://avatars.githubusercontent.com/u/44612750?v=4"
              alt="imagem de perfil"
              fill
              className="object-cover rounded-full"
            />
          </div>

          <div className="pl-4 flex items-center group">
            <p className="text-xl font-semibold cursor-pointer">
              {watch("name")}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-primary/70">Nome</h2>
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

        <div className="mt-4 w-full">
          <h2 className="text-primary/70">
            {isCandidate
              ? "Fale um pouco sobre suas experiencias:"
              : "Breve descrição da empresa"}
          </h2>

          <textarea
            id="description"
            className="border  border-primary w-full h-48 p-4 rounded mt-2"
            placeholder={placeholder}
            {...register("description")}
          />
        </div>

        <button className="px-4 py-2 mt-2  bg-primary  text-white rounded cursor-pointer self-end gap-2">
          <span>Salvar</span>
        </button>
      </form>
    </div>
  );
}

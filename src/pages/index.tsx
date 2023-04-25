import { Loading } from "@/components/Loading";
import { useAuth } from "@/features/authentication/hooks/use-auth";
import { Location } from "@/features/authentication/types/location";
import { getSSRAppRouter } from "@/server/api/root";
import { api } from "@/utils/api";
import { classnames } from "@/utils/classnames";
import { getAuth } from "@clerk/nextjs/server";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import ReactSelect from "react-select";

type HomeProps = { locations: Location[] };

export default function Home({ locations }: HomeProps) {
  const { mutateAsync, isLoading } = api.users.create.useMutation();

  const router = useRouter();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [locationId, setLocationId] = useState("");
  const [nextStep, setNextStep] = useState(false);

  function handleChooseRole(role: string) {
    setRole(role);
  }

  function handleNext() {
    setNextStep(true);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await mutateAsync({ role, name, locationId });

    if (role === "candidate") {
      router.push("/candidato");
    } else {
      router.push("/empresa");
    }
  }

  function getLabel(next: boolean, role: string) {
    if (!next) {
      return "Selecione a opção que você se enquadra:";
    }

    if (role === "employer") {
      return "Qual o nome da empresa e região que você mora?";
    }

    return "Qual seu nome e região que você mora?";
  }

  const placeholder = role === "candidate" ? "Seu nome" : "Nome da sua empresa";

  return (
    <main className="flex min-h-screen flex-col gap-10 items-center justify-center list-none">
      <h1 className="text-lg px-8">{getLabel(nextStep, role)}</h1>

      {nextStep ? (
        <div className="space-y-4 relative w-full px-8">
          <div>
            <input
              type="text"
              placeholder={placeholder}
              className="px-4 py-2 w-full outline-none border rounded"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>

          <ReactSelect
            options={locations.map((location) => ({
              value: location.id,
              label: location.name,
            }))}
            placeholder="Selecione uma região"
            onChange={(option) => setLocationId(String(option?.value))}
            classNames={{
              control: () => "!py-0.5",
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row px-8 w-full md:w-auto md:px-0 items-center gap-4 text-zinc-700 ">
          <li
            onClick={() => handleChooseRole("employer")}
            className={classnames(
              role === "employer" ? "outline outline-primary" : "",
              "border shadow-md py-24 md:px-32 w-full md:w-auto flex justify-center md:inline-block  rounded cursor-pointer hover:outline hover:outline-primary transition-all"
            )}
          >
            <h2> Quero contratar </h2>
          </li>

          <li
            onClick={() => handleChooseRole("candidate")}
            className={classnames(
              role === "candidate" ? "outline outline-zinc-600" : "",
              "border shadow-md py-24 md:px-32 w-full md:w-auto flex justify-center md:inline-block rounded cursor-pointer hover:outline hover:outline-primary transition-all"
            )}
          >
            <h2> Quero emprego </h2>
          </li>
        </div>
      )}

      <div className="px-8 w-full">
        {nextStep ? (
          <button
            type="submit"
            onClick={handleSubmit}
            className={classnames(
              role ? "bg-primary" : "bg-indigo-600/20",
              "px-4 py-2 w-full rounded text-white hover:brightness-95 transition-all flex items-center justify-center gap-4"
            )}
          >
            <span>Entrar</span>
            {isLoading ? <Loading /> : null}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className={classnames(
              role ? "bg-primary" : "bg-indigo-600/20",
              "px-4 py-2 w-full rounded text-white hover:brightness-95 transition-all flex items-center justify-center"
            )}
          >
            Prosseguir
          </button>
        )}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const api = getSSRAppRouter(context);

  try {
    const user = await api.users.byUserId();

    if (user?.role === "employer") {
      return {
        redirect: {
          permanent: false,
          destination: "/empresa",
        },
        props: {},
      };
    }

    if (user?.role === "candidate") {
      return {
        redirect: {
          permanent: false,
          destination: "/candidato",
        },
        props: {},
      };
    }
  } catch (error: any) {
    if (error.code === "UNAUTHORIZED") {
      return {
        redirect: {
          permanent: false,
          destination: "/sign-in",
        },
        props: {},
      };
    }
  }

  const locations = await api.locations.getAll();

  return {
    props: {
      locations,
    },
  };
};

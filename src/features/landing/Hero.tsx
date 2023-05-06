import { Wrap } from "@/lib/word-wrap";
import { useRouter } from "next/router";
import { useAuth } from "../authentication/hooks/use-auth";
import { Logo } from "@/components/Logo";

export function Hero() {
  const { isSignedIn, isEmployer } = useAuth();

  const router = useRouter();

  function handleLogin() {
    if (isSignedIn) {
      if (isEmployer) {
        return router.push("/empresa");
      }

      return router.push("/candidato");
    }

    return router.push("/login");
  }

  return (
    <div className="md:container md:h-[calc(100vh-89px)] flex flex-col md:flex-row items-center justify-between">
      <div className="md:max-w-lg md:w-1/2 space-y-6 py-10 md:py-0 px-8 w-full md:px-0">
        <h1 className="md:text-5xl text-3xl leading-title">
          <Wrap>
            A plataforma mais eficiente para quem busca empregos locais
          </Wrap>
        </h1>
        <p className="md:text-xl text-lg leading-subtitle">
          <Wrap>
            Nossa plataforma oferece a maneira mais eficiente de encontrar
            empregos locais relevantes em sua cidade. Com um processo de busca
            simplificado e fácil de usar!
          </Wrap>
        </p>

        <button
          onClick={handleLogin}
          className="text-white font-bold bg-primary md:px-8 md:py-3 py-2 px-6 hover:brightness-90 uppercase rounded hover:bg-primary transition"
        >
          {isSignedIn ? "Entrar" : "Login"}
        </button>
      </div>

      {/* <div className="w-1/2 flex justify-center items-center">
        <div className="relative w-fit">
          <div className="text-lg font-semibold shadow-lg h-[220px] w-[220px] -left-48 -top-32 bg-primary absolute text-white flex items-center justify-center rounded-md">
            <h1>Empresas</h1>
          </div>

          <div className="rounded-md py-16 px-16 backdrop-blur-md  shadow-2xl">
            <Logo />
          </div>

          <div className="text-lg font-semibold shadow-lg -bottom-32 -right-48 -z-10 h-[220px] w-[220px] bg-primary text-white absolute flex items-center justify-center rounded-md">
            <h1>Profissionais</h1>
          </div>
        </div>
      </div> */}
    </div>
  );
}

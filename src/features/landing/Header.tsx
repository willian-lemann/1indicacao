import { Logo } from "@/components/Logo";
import Link from "next/link";
import { useAuth } from "../authentication/hooks/use-auth";
import { useRouter } from "next/router";

export function Header() {
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
    <>
      <header>
        <div className="hidden px-[11rem] md:flex items-center justify-between py-0 border-b">
          <Logo />
          <nav className="space-x-4">
            <Link href="/sobre">Sobre</Link>
            <a href="#solution">Nossa Solução</a>
          </nav>
          <button
            onClick={handleLogin}
            className="text-primary hover:text-white px-4 py-1 rounded hover:bg-primary transition"
          >
            {isSignedIn ? "Entrar" : "Login"}
          </button>
        </div>
      </header>

      <header></header>
    </>
  );
}

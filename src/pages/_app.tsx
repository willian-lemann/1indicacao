export { reportWebVitals } from "next-axiom";

import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Analytics } from "@vercel/analytics/react";

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { AlertProvider } from "@/components/Alert";

const publicPages = ["/sign-in", "/sign-up"];

const App = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider
      {...pageProps}
      localization={{
        socialButtonsBlockButton: "Continue com google",
        formFieldLabel__emailAddress: "E-mail",
        dividerText: "ou",

        footerActionLink__useAnotherMethod: "Usar outra forma de acesso",
        backButton: "Voltar",

        unstable__errors: {
          form_identifier_not_found: "Não encontramos essa conta.",
        },
        signIn: {
          emailCode: {
            title: "Cheque seu e-mail",
            subtitle: "Um código de verificação foi enviado pro seu e-mail",
            resendButton: "Re-enviar código",
            formSubtitle: "Digite o código",
            formTitle: "Código de Verificação",
          },

          alternativeMethods: {
            title: "Usar outro método",
            actionLink: "Ajuda?",
            blockButton__emailCode: "Enviar código para o seu e-mail",
            getHelp: {
              title: "Ajuda",
              blockButton__emailSupport: "Email suporte",
              content:
                "Se você está tendo dificuldades para entrar em sua conta, envie-nos um e-mail e trabalharemos com você para restaurar o acesso o mais rápido possível.",
            },
          },

          start: {
            title: "Faça login",
            subtitle: "para entrar no 1indicação",
            actionText: "Não tem uma conta?",
            actionLink: "Cadastrar-se",
          },
        },
        signUp: {
          emailCode: {
            title: "Cheque seu e-mail",
            subtitle: "Um código de verificação foi enviado pro seu e-mail",
            resendButton: "Re-enviar código",
            formSubtitle: "Digite o código",
            formTitle: "Código de Verificação",
          },
          start: {
            title: "Crie uma conta",
            subtitle: "para entrar no 1indicação",
            actionText: "Já tem uma conta?",
            actionLink: "Fazer Login",
          },
        },
      }}
    >
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
      <AlertProvider />
      <Analytics />
    </ClerkProvider>
  );
};

export default api.withTRPC(App);

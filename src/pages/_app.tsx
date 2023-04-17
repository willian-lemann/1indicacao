import "@/styles/globals.css";
import type { AppProps } from "next/app";

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

const publicPages = ["/login"];

const App = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();

  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider
      {...pageProps}
      localization={{
        socialButtonsBlockButton: "Continue com google",
        formFieldLabel__emailAddress: "Email",
        dividerText: "ou",
        signIn: {
          start: {
            title: "Faça login",
            subtitle: "para entrar no lokadin",
            actionText: "Não tem uma conta?",
            actionLink: "Cadastrar-se",
          },
        },
      }}
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(App);

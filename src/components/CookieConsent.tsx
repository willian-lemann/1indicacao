import { CookieConsent } from "@/lib/cookie-consent";
import { Wrap } from "@/lib/word-wrap";

export function Cookie() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Aceitar"
      cookieName="@1indicacao.cc"
      enableDeclineButton
      declineButtonText="Recusar"
      buttonWrapperClasses="w-full flex items-center justify-between"
      declineButtonStyle={{
        borderRadius: 120,
        background: "white",
        color: "#110634",
        padding: "0.5rem 2rem",
      }}
      buttonStyle={{
        background: "white",
        color: "#110634",
        padding: "0.5rem 2rem",
        borderRadius: 120,
      }}
      expires={150}
      style={{
        background: "#110634",
        fontSize: "28px",
        lineHeight: "150%",
        height: "500px",
        padding: "2rem 2rem",
      }}
    >
      <div className="bg-primary py-4">
        <h1>
          <Wrap>
            Aviso de cookies: Utilizamos cookies para garantir a melhor
            experiência em nosso site. Ao continuar navegando, você concorda com
            nossa política de privacidade e uso de cookies.
          </Wrap>
        </h1>
      </div>
    </CookieConsent>
  );
}

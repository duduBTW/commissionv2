import { signIn } from "next-auth/react";

// styles
import * as s from "./styles";

// components
import Typography from "components/typography";

interface LoginMethod {
  label: string;
  iconUrl: string;
}

const loginMethods: Record<string, LoginMethod> = {
  google: {
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
    label: "Continuar com Google",
  },
  discord: {
    iconUrl:
      "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png",
    label: "Continuar com Discord",
  },
  twitter: {
    iconUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968823.png",
    label: "Continue com Twitter",
  },
};

const LoginMethods = ({ redirectUrl = "/" }: { redirectUrl?: string }) => {
  return (
    <s.container>
      {Object.entries(loginMethods).map(([type, loginMethod]) => (
        <LoginMethod
          redirectUrl={redirectUrl}
          key={type}
          type={type}
          {...loginMethod}
        />
      ))}
    </s.container>
  );
};

const LoginMethod = ({
  type,
  iconUrl,
  label,
  redirectUrl,
}: LoginMethod & {
  type: string;
  redirectUrl: string;
}) => {
  return (
    <s.card onClick={() => signIn(type, { callbackUrl: redirectUrl })}>
      <s.cardIcon src={iconUrl} />
      <Typography variant="body-01">{label}</Typography>
    </s.card>
  );
};

export default LoginMethods;

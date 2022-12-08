// styles
import * as g from "styles/globalStyles";

// components
import Typography from "components/typography";
import LoginMethods from "components/login/methods";
import { Logo } from "components/Nav";

const LoginPage = () => {
  return (
    <>
      <div
        style={{
          padding: "1.6rem 2rem",
        }}
      >
        <Logo />
      </div>
      <g.paper size="small">
        <Typography center variant="title-01">
          Login
        </Typography>
        <LoginMethods />
      </g.paper>
    </>
  );
};

LoginPage.layout = false;

export default LoginPage;

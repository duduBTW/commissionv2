import styled from "@emotion/styled";

// styles
import * as g from "styles/globalStyles";

// components
import { Logo } from "components/Nav";
import Typography from "components/typography";
import LoginMethods from "components/login/methods";

const LoginPage = () => (
  <>
    <s.nav>
      <Logo />
    </s.nav>
    <g.paper size="small">
      <Typography center variant="title-01">
        Login
      </Typography>
      <LoginMethods />
    </g.paper>
  </>
);

LoginPage.layout = false;

const s = {
  nav: styled.div`
    padding: 1.6rem 2rem;
  `,
};

export default LoginPage;

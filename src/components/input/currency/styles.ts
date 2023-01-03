import styled from "@emotion/styled";
import CurrencyFormat from "react-currency-format";

interface InputProps {
  error?: boolean;
}
export const input = styled(CurrencyFormat)<InputProps>`
  outline: none;
  padding: 0;
  border: none;
  color: ${({ error }) =>
    error ? "var(--color-error)" : "var(--color-text-80)"};
  font-family: "Poppins";
  font-style: normal;
  font-weight: 275;
  font-size: 3.2rem;
  line-height: 4.8rem;
  width: 100%;

  // oh no, !important, heck (っ °Д °;)っ
  line-height: 100% !important;
`;

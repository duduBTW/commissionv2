import { TextColorVariant, TextVariant } from ".";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface StyledTextProps {
  variant: TextVariant;
  color?: TextColorVariant;
  ml: number;
}

export const styledText = styled.div<StyledTextProps>`
  ${({ variant }) => {
    switch (variant) {
      case "body-01":
        return css`
          font-family: "Nunito";
          font-style: normal;
          font-weight: 400;
          font-size: 1.6rem;
          line-height: 2.4rem;
        `;
      case "title-01":
        return css`
          font-family: "Poppins";
          font-style: normal;
          font-weight: 700;
          font-size: 2rem;
          line-height: 3.2rem;
        `;
      case "title-02":
        return css`
          font-family: "Poppins";
          font-style: normal;
          font-weight: 900;
          font-size: 2.2rem;
          line-height: 3.4rem;
        `;
      case "title-04":
        return css`
          font-family: "Poppins";
          font-style: normal;
          font-weight: 700;
          font-size: 1.6rem;
          line-height: 2.4rem;
        `;
      case "subtitle-01":
        return css`
          font-family: "Poppins";
          font-style: normal;
          font-weight: 600;
          font-size: 1.6rem;
          line-height: 2.4rem;
        `;
      case "subtitle-02":
        return css`
          font-family: "Nunito";
          font-style: normal;
          font-weight: 700;
          font-size: 1.4rem;
          line-height: 2.2rem;
        `;
      case "caption":
        return css`
          font-family: "Poppins";
          font-style: normal;
          font-weight: 500;
          letter-spacing: 0.02rem;
          font-size: 1.2rem;
          line-height: 1.8rem;
        `;

      default:
        break;
    }
  }}

  color: ${({ color }) => getColor(color)};
`;

const getColor = (color?: TextColorVariant): string => {
  switch (color) {
    case "primary.main":
      return "var(--color-primary)";
    case "text.80":
      return "var(--color-text-80)";
    case "text.60":
      return "var(--color-text-60)";
    case "text.40":
      return "var(--color-text-40)";
    case "success.main":
      return "var(--color-success)";

    default:
      return "";
  }
};
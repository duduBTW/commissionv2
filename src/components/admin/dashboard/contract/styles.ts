import styled from "@emotion/styled";
import Button from "components/button";
import Typography from "components/typography";
import { mq } from "styles/theme";

export const empty_title = styled(Typography)`
  margin-bottom: 1.2rem;
`;

export const empty_description = styled(Typography)`
  margin-bottom: 6rem;

  ${mq.fromDesktopSm} {
    max-width: 60%;
  }
`;

export const contract_grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;
`;

export const contract_card = styled.div`
  cursor: pointer;
  background-color: var(--color-content);
  border-radius: 1.2rem;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  &:hover {
    box-shadow: 0px 8px 16px var(--color-primary-l);
  }
`;

export const create_button = styled(Button)`
  margin-bottom: 2.4rem;
  width: auto;
`;

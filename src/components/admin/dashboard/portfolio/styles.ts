import styled from "@emotion/styled";
import Container from "components/container";

export const portfolio_container = styled(Container)`
  margin-bottom: 2.4rem;

  .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

export const portfolio_item = styled.button`
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  padding: 0.8rem 1.6rem;
  border: 0.1rem solid var(--color-divider);
  border-radius: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover,
  &:focus {
    border-color: var(--color-primary);
  }
`;

export const portfolio_link_commission_list = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const chip = styled.span`
  cursor: pointer;
`;

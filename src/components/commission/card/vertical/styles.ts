import styled from "@emotion/styled";
import Typography from "components/typography";
import { mq } from "styles/theme";

export const container = styled.div`
  /* margin: -1.2rem -2rem -2rem; */
  overflow: hidden;
  display: grid;
  grid-template-areas:
    "name"
    "price";
  // border-bottom: 0.1rem solid var(--color-primary-l);
  height: 16rem;
  grid-template-rows: 1fr auto;
  padding-left: 2rem;

  ${mq.fromDesktopSm} {
    height: 20rem;
    grid-template-areas:
      "name  pic"
      "price pic";
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr auto;
    /* margin-bottom: 0rem; */
    position: relative;
    padding-left: 2.4rem;
  }
`;

export const figure_name = styled(Typography)`
  padding: 2.4rem 0;
  grid-area: name;
`;
export const figure_price = styled(Typography)`
  padding: 1.2rem 0;
  grid-area: price;
`;

export const image = styled.img`
  display: none;
  grid-row: 1 / 3;
  grid-column: 1 / 2;
  width: 100%;
  object-fit: cover;
  object-position: right 20%;
  max-width: 100%;
  height: 16rem;
  opacity: 0.2;

  ${mq.fromDesktopSm} {
    display: block;
    min-width: 24rem;
    height: 20rem;
    grid-area: pic;
    opacity: 1;
  }
`;

export const container_dense = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-content);
  overflow: hidden;
  height: 4.8rem;
  border-radius: 1.2rem;
  padding-left: 2.4rem;
  gap: 1.6rem;
`;

export const image_dense = styled.img`
  width: 9.8rem;
  object-fit: cover;
`;

export const dense_spacer = styled.div`
  flex: 1;
`;

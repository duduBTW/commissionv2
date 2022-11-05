import { GetServerSideProps } from "next";

const Page = () => <></>;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    redirect: {
      destination: `${req.url}/commissions`,
      permanent: false,
    },
  };
};

export default Page;

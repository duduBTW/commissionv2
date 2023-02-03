import { GetServerSideProps } from "next";
import { useMemo, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import services from "service";
import styled from "@emotion/styled";

// styles
import * as g from "styles/globalStyles";

// components
import ArtistCommissionCategory from "components/commission/categorys";
import Button from "components/button";
import CheckBoxBase from "components/input/checkbox/base";
import Nav from "components/Nav";

interface ArtistCommissionOrderPageProps {
  params: ArtistCommissionOrderParams;
}

export interface ArtistCommissionOrderParams {
  commissionId: string;
  artistId: string;
}

const ArtistCommissionOrderPage = ({
  params,
}: ArtistCommissionOrderPageProps) => {
  const [readContract, setReadContract] = useState(false);

  const { data: contract, isLoading } = services.artist.useContract(
    params.artistId
  );

  if (isLoading) return <></>;

  if (!readContract && contract?.html) {
    return (
      <Contract
        contractHtml={contract.html}
        onReadContract={() => setReadContract(true)}
      />
    );
  }

  return <ArtistCommissionCategory {...params} />;
};

ArtistCommissionOrderPage.layout = false;

const Contract = ({
  onReadContract,
  contractHtml,
}: {
  onReadContract: () => void;
  contractHtml: string;
}) => {
  const purifiedContractHtml = useMemo(
    () => DOMPurify.sanitize(contractHtml),
    [contractHtml]
  );
  const [acceptContract, setAcceptContract] = useState<
    boolean | "indeterminate"
  >(false);

  return (
    <>
      <Nav />
      <g.paper>
        <s.contract_content
          dangerouslySetInnerHTML={{
            __html: purifiedContractHtml,
          }}
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (acceptContract) onReadContract();
          }}
        >
          <s.accept_container>
            <CheckBoxBase
              checked={acceptContract}
              onCheckedChange={setAcceptContract}
              id="accept"
            />
            <label htmlFor="accept">Li e aceito os termos e condições.</label>
          </s.accept_container>
          <Button type="submit" disabled={!acceptContract} fullWidth>
            Continuar
          </Button>
        </form>
      </g.paper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  ArtistCommissionOrderPageProps
> = async ({ params }) => {
  const commissionId = String(params?.commissionId);
  const artistId = String(params?.artistId);

  return {
    props: {
      params: { commissionId, artistId },
    },
  };
};

const s = {
  contract_content: styled.div`
    ${g.html}
  `,
  accept_container: styled.div`
    display: flex;
    gap: 1.2rem;
    margin-bottom: 1.6rem;
  `,
};

export default ArtistCommissionOrderPage;

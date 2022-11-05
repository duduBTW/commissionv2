import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db/client";
import { portfolioSchema } from "service/portfolio";

const portfolioApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const portfolioId = req.query["portfolioId"];
  if (typeof portfolioId !== "string") {
    return res.status(401).send({});
  }

  try {
    switch (req.method) {
      case "DELETE":
        return res.send(
          await deletePortfolio({
            portfolioId,
          })
        );
      case "PUT":
        return res.send(
          await updatePortfolio({
            body: req.body,
            portfolioId,
          })
        );

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const updatePortfolio = ({
  body,
  portfolioId,
}: {
  body: unknown;
  portfolioId: string;
}) => {
  const { hash, height, url, width } = portfolioSchema.parse(body);

  return prisma.portfolio.update({
    data: {
      hash,
      height,
      url,
      width,
    },
    where: {
      id: portfolioId,
    },
  });
};

const deletePortfolio = ({ portfolioId }: { portfolioId: string }) =>
  prisma.portfolio.delete({
    where: {
      id: portfolioId,
    },
  });

export default portfolioApi;

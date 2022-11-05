import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db/client";
import { portfolioSchema } from "service/portfolio";

const portfolioApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        return res.send(await getPortfolioList());
      case "POST":
        return res.send(
          await insetPortfolio({
            body: req.body,
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

const getPortfolioList = () => prisma.portfolio.findMany();
const insetPortfolio = ({ body }: { body: unknown }) => {
  const { hash, height, url, width } = portfolioSchema.parse(body);

  return prisma.portfolio.create({
    data: {
      url,
      hash,
      height,
      width,
    },
  });
};

export default portfolioApi;

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db/client";

const portfolioApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const artistId = req.query["artistId"];
  if (typeof artistId !== "string") {
    return res.status(401).send({});
  }

  try {
    switch (req.method) {
      case "GET":
        return res.send(await getArtistPortfolioList(artistId));

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const getArtistPortfolioList = async (id: string) => {
  return await prisma.portfolio.findMany({
    where: {
      user: {
        id,
      },
    },
    select: {
      id: true,
      url: true,
      hash: true,
      width: true,
      height: true,
    },
  });
};

export default portfolioApi;

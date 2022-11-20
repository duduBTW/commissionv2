import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db/client";

const artistPortfolioItemApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const artistId = req.query["artistId"];
  const portfolioId = req.query["portfolioId"];
  if (typeof artistId !== "string" || typeof portfolioId !== "string") {
    return res.status(401).send({});
  }

  try {
    switch (req.method) {
      case "GET":
        return res.send(await getArtistPortoflioItem(artistId, portfolioId));

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const getArtistPortoflioItem = async (
  artistId: string,
  commissionId: string
) => {
  return await prisma.portfolio.findFirst({
    where: {
      id: commissionId,
      user: {
        id: artistId,
      },
    },
    select: {
      id: true,
      url: true,
      hash: true,
      height: true,
      width: true,
    },
  });
};

export default artistPortfolioItemApi;

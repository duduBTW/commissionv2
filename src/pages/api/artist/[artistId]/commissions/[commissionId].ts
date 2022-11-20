import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db/client";

const artistItemApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const artistId = req.query["artistId"];
  const commissionId = req.query["commissionId"];
  if (typeof artistId !== "string" || typeof commissionId !== "string") {
    return res.status(401).send({});
  }

  try {
    switch (req.method) {
      case "GET":
        return res.send(await getArtistCommission(artistId, commissionId));

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const getArtistCommission = async (artistId: string, commissionId: string) => {
  return await prisma.commission.findFirst({
    where: {
      id: commissionId,
      user: {
        id: artistId,
      },
    },
    select: {
      id: true,
      name: true,
      price: true,
      descriptionHtml: true,
      images: {
        select: {
          id: true,
          hash: true,
          height: true,
          width: true,
          url: true,
        },
      },
    },
  });
};

export default artistItemApi;

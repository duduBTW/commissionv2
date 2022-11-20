import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db/client";

const artistItemApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const artistId = req.query["artistId"];
  if (typeof artistId !== "string") {
    return res.status(401).send({});
  }

  try {
    switch (req.method) {
      case "GET":
        return res.send(await getArtistCommissionList(artistId));

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const getArtistCommissionList = async (id: string) => {
  const commissions = await prisma.commission.findMany({
    where: {
      user: {
        id,
      },
    },
    include: {
      images: true,
    },
  });
  return commissions.map((commission) => {
    const { descriptionJson, name, price, id, images } = commission;

    return {
      descriptionHtml:
        JSON.parse(descriptionJson)?.content?.[0].content?.[0].text ?? "",
      name,
      price,
      id,
      miniature: images[0]?.url,
    };
  });
};

export default artistItemApi;

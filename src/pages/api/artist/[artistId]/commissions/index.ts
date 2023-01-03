import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import { z } from "zod";

export default apiMiddleware.public(async (req, res) => {
  try {
    const artistId = z.string().parse(req.query["artistId"]);

    switch (req.method) {
      case "GET":
        return res.send(await get(artistId));

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

export type AdminCommissionList = Awaited<ReturnType<typeof get>>;

const get = async (id: string) => {
  const commissions = await prisma.commission.findMany({
    where: {
      user: {
        id,
      },
      active: {
        not: false,
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
      miniature: images.find((image) => image.isMiniature)?.url,
    };
  });
};

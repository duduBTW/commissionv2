import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import { z } from "zod";

export default apiMiddleware.public(async (req, res) => {
  try {
    const artistId = z.string().parse(req.query["artistId"]);
    const commissionId = z.string().parse(req.query["commissionId"]);

    switch (req.method) {
      case "GET":
        // await new Promise((r) => setTimeout(r, 2000));
        return res.send(await get(artistId, commissionId));

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

export type AdminCommission = Awaited<ReturnType<typeof get>>;

const get = async (artistId: string, commissionId: string) => {
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

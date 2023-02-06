import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import { z } from "zod";

export default apiMiddleware.public(async (req, res) => {
  const artistId = z.string().parse(req.query["artistId"]);

  switch (req.method) {
    case "GET":
      return res.send(await get(artistId));

    default:
      return res.status(404).send({});
  }
});

export type ArtistStoreList = Awaited<ReturnType<typeof get>>;

async function get(artistId: string) {
  return await prisma.merch.findMany({
    where: {
      user: {
        id: artistId,
      },
      active: {
        not: false,
      },
    },
  });
}

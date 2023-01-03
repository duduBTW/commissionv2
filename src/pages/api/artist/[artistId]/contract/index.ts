import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import { z } from "zod";

export default apiMiddleware.user(async (req, res) => {
  const artistId = z.string().parse(req.query["artistId"]);

  switch (req.method) {
    case "GET":
      return res.send(
        await get({
          artistId,
        })
      );

    default:
      break;
  }
});

// -- GET
export type Contract = Awaited<ReturnType<typeof get>>;
export const get = async ({ artistId }: { artistId: string }) => {
  return prisma.contract.findFirst({
    where: {
      user: {
        id: artistId,
      },
      active: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

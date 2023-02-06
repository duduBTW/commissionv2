import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import { z } from "zod";

export default apiMiddleware.admin(async (req, res, user) => {
  const storeId = z.string().parse(req.query["storeId"]);

  switch (req.method) {
    case "GET":
      return res.send(
        await get({
          storeId,
          userId: user.id,
        })
      );

    default:
      break;
  }
});

export type AdminMerchReturn = Awaited<ReturnType<typeof get>>;
export async function get({
  userId,
  storeId,
}: {
  userId: string;
  storeId: string;
}) {
  return await prisma.merch.findFirst({
    where: {
      id: storeId,
      user: {
        id: userId,
      },
    },
  });
}

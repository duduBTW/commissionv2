import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import { createAdminMerchSchema } from "service/admin/store";
import { z } from "zod";

export default apiMiddleware.admin(async (req, res, user) => {
  const storeId = z.string().parse(req.query["storeId"]);

  switch (req.method) {
    case "PUT":
      return res.send(
        await put({
          storeId,
          userId: user.id,
          body: req.body,
        })
      );
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

export type AdminMerchUpdateReturn = Awaited<ReturnType<typeof put>>;
export async function put({
  userId,
  storeId,
  body,
}: {
  body: unknown;
  userId: string;
  storeId: string;
}) {
  const merchData = createAdminMerchSchema.parse(body);

  return await prisma.merch.updateMany({
    where: {
      id: storeId,
      user: {
        id: userId,
      },
    },
    data: merchData,
  });
}

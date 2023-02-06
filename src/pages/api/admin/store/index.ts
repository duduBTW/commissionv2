import apiMiddleware from "server/apiMiddleware";
import { createAdminMerchSchema } from "service/admin/store";
import { prisma } from "server/db/client";

export default apiMiddleware.admin(async (req, res, user) => {
  switch (req.method) {
    case "GET":
      return res.send(
        await get({
          userId: user.id,
        })
      );
    case "POST":
      return res.send(
        await post({
          body: req.body,
          userId: user.id,
        })
      );

    default:
      break;
  }
});

export type AdminMerchInsertReturn = Awaited<ReturnType<typeof post>>;
export const post = async ({
  body,
  userId,
}: {
  body: unknown;
  userId: string;
}) => {
  const merchData = createAdminMerchSchema.parse(body);

  return await prisma.merch.create({
    data: {
      ...merchData,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export type AdminMerchListReturn = Awaited<ReturnType<typeof get>>;
export const get = async ({ userId }: { userId: string }) => {
  return await prisma.merch.findMany({
    where: {
      user: {
        id: userId,
      },
    },
  });
};

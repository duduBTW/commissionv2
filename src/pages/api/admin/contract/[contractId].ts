import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import { z } from "zod";

export default apiMiddleware.admin(async (req, res, user) => {
  const contractId = z.string().parse(req.query["contractId"]);

  switch (req.method) {
    case "GET":
      return res.send(
        await get({
          userId: user.id,
          contractId,
        })
      );

    default:
      break;
  }
});

export type AdminContract = Awaited<ReturnType<typeof get>>;

const get = async ({
  contractId,
  userId,
}: {
  contractId: string;
  userId: string;
}) => {
  return prisma.contract.findFirst({
    where: {
      id: contractId,
      user: {
        id: userId,
      },
    },
  });
};

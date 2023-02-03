import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import { z } from "zod";

export default apiMiddleware.user(async (req, res) => {
  try {
    const commissionId = z.string().parse(req.query["commissionId"]);

    switch (req.method) {
      case "GET":
        return res.send(await get(commissionId));

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

export type CommissionCategorys = Awaited<ReturnType<typeof get>>;

const get = async (commissionId: string) => {
  return await prisma.commissionCategory.findMany({
    where: {
      Commission: {
        id: commissionId,
      },
    },
  });
};

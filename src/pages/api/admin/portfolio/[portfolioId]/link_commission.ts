import { z } from "zod";
import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";

export default apiMiddleware.admin(async (req, res) => {
  const portfolioId = z.string().parse(req.query["portfolioId"]);

  switch (req.method) {
    case "POST":
      return res.send(
        await post({
          portfolioId,
          body: req.body,
        })
      );

    default:
      break;
  }
});

const portfolioLinkCommission = z.object({
  commissionId: z.string(),
});
const post = async ({
  portfolioId,
  body,
}: {
  portfolioId: string;
  body: unknown;
}) => {
  const { commissionId } = portfolioLinkCommission.parse(body);

  return await prisma.portfolio.update({
    where: {
      id: portfolioId,
    },
    data: {
      commission: {
        connect: {
          id: commissionId,
        },
      },
    },
  });
};

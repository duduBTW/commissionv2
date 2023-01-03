import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import { portfolioSchema } from "service/admin/portfolio";

export default apiMiddleware.admin(async (req, res, user) => {
  try {
    switch (req.method) {
      case "GET":
        return res.send(
          await getPortfolioList({
            userId: user.id,
          })
        );
      case "POST":
        return res.send(
          await insetPortfolio({
            body: req.body,
            userId: user.id,
          })
        );

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

export type PortfolioList = Awaited<ReturnType<typeof getPortfolioList>>;

const getPortfolioList = ({ userId }: { userId: string }) =>
  prisma.portfolio.findMany({
    where: {
      user: {
        id: userId,
      },
    },
    select: {
      commission: {
        select: {
          id: true,
          name: true,
        },
      },
      hash: true,
      height: true,
      id: true,
      url: true,
      width: true,
    },
  });

export const insetPortfolio = ({
  body,
  userId,
}: {
  body: unknown;
  userId: string;
}) => {
  const { hash, height, url, width, commissionId } =
    portfolioSchema.parse(body);

  return prisma.portfolio.create({
    data: {
      url,
      hash,
      height,
      width,
      user: {
        connect: {
          id: userId,
        },
      },
      commission: {
        connect: commissionId
          ? {
              id: commissionId,
            }
          : undefined,
      },
    },
  });
};

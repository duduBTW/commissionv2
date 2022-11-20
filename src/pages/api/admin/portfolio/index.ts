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

const getPortfolioList = ({ userId }: { userId: string }) =>
  prisma.portfolio.findMany({
    where: {
      user: {
        id: userId,
      },
    },
  });
const insetPortfolio = ({
  body,
  userId,
}: {
  body: unknown;
  userId: string;
}) => {
  const { hash, height, url, width } = portfolioSchema.parse(body);

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
    },
  });
};

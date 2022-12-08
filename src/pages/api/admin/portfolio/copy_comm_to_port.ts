import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import { insetPortfolio } from ".";

export default apiMiddleware.admin(async (req, res, user) => {
  try {
    switch (req.method) {
      case "POST":
        return res.send(
          await copyImageFromCommissionToPort({
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

const copyImageFromCommissionToPort = async ({
  userId,
}: {
  userId: string;
}) => {
  const commissionImages = await prisma.commissionImage.findMany({
    where: {
      Commission: {
        user: {
          id: userId,
        },
      },
    },
  });

  const portfolioImages = await prisma.portfolio.findMany({
    where: {
      user: {
        id: userId,
      },
    },
  });
  console.log("commissionImages", commissionImages);
  console.log("portfolioImages", portfolioImages);
  let delay = 0;
  const delayIncrement = 200;

  return await Promise.all(
    commissionImages.map(async (commissionImage) => {
      const repeted = portfolioImages.some(
        (port) => port.url === commissionImage.url
      );
      if (repeted) return;

      delay += delayIncrement;
      return new Promise((resolve) => setTimeout(resolve, delay)).then(
        async () => {
          console.log("inserting", {
            body: commissionImage,
            userId,
          });

          await new Promise((r) => setTimeout(r, 200));
          return await insetPortfolio({
            body: commissionImage,
            userId,
          });
        }
      );
    })
  );
};

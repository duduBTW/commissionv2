import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import { z } from "zod";

export default apiMiddleware.admin(async (req, res) => {
  const imageId = z.string().parse(req.query["imageId"]);
  const commissionId = z.string().parse(req.query["commissionId"]);

  switch (req.method) {
    case "PUT":
      return res.send(
        await put({
          imageId,
          commissionId,
        })
      );

    default:
      break;
  }
});

export type AdminUpdateCommissionMiniature = Awaited<ReturnType<typeof put>>;

const put = async ({
  imageId,
  commissionId,
}: {
  imageId: string;
  commissionId: string;
}) => {
  await prisma.commissionImage.updateMany({
    where: {
      Commission: {
        id: commissionId,
      },
      isMiniature: true,
    },
    data: {
      isMiniature: false,
    },
  });

  return await prisma.commissionImage.update({
    where: {
      id: imageId,
    },
    data: {
      isMiniature: true,
    },
  });
};

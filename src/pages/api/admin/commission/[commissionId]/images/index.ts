import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import { commissionImageSchema } from "service/admin/commission";
import { z } from "zod";

export default apiMiddleware.admin(async (req, res) => {
  const commissionId = z.string().parse(req.query["commissionId"]);

  switch (req.method) {
    case "GET":
      return res.send(
        await get({
          commissionId,
        })
      );
    case "POST":
      return res.send(
        await post({
          body: req.body,
          commissionId,
        })
      );

    case "PUT":
      return res.send(
        await put({
          body: req.body,
        })
      );

    default:
      break;
  }
});

const post = ({
  body,
  commissionId,
}: {
  body: unknown;
  commissionId: string;
}) => {
  const { url, hash, height, width } = commissionImageSchema.parse(body);

  return prisma.commissionImage.create({
    data: {
      url,
      hash,
      height,
      width,
      Commission: {
        connect: {
          id: commissionId,
        },
      },
    },
  });
};

const get = ({ commissionId }: { commissionId: string }) =>
  prisma.commissionImage.findMany({
    where: {
      Commission: {
        id: commissionId,
      },
    },
  });

const put = ({ body }: { body: unknown }) => {
  const { id, ...data } = commissionImageSchema.parse(body);
  if (!id) return null;

  return prisma.commissionImage.update({
    data,
    where: {
      id,
    },
  });
};

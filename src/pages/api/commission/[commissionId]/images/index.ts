import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db/client";
import { commissionImageSchema } from "service/commission";

const commissionImagesApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const commissionId = req.query["commissionId"];
  if (typeof commissionId !== "string") {
    return res.status(401).send({});
  }

  try {
    switch (req.method) {
      case "GET":
        return res.send(
          await getImageCommission({
            commissionId,
          })
        );
      case "POST":
        return res.send(
          await insetImageCommission({
            body: req.body,
            commissionId,
          })
        );

      case "PUT":
        return res.send(
          await updateImageCommission({
            body: req.body,
          })
        );

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const insetImageCommission = ({
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

const getImageCommission = ({ commissionId }: { commissionId: string }) =>
  prisma.commissionImage.findMany({
    where: {
      Commission: {
        id: commissionId,
      },
    },
  });

const updateImageCommission = ({ body }: { body: unknown }) => {
  const { id, ...data } = commissionImageSchema.parse(body);
  if (!id) return null;

  return prisma.commissionImage.update({
    data,
    where: {
      id,
    },
  });
};

export default commissionImagesApi;

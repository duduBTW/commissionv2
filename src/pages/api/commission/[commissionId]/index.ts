import { NextApiRequest, NextApiResponse } from "next";
import { commissionSchema, CommissionSchema } from "service/commission";
import { prisma } from "server/db/client";

const commissionItemApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const commissionId = req.query["commissionId"];
  if (typeof commissionId !== "string") {
    return res.status(401).send({});
  }

  try {
    switch (req.method) {
      case "GET":
        const commission = await getCommission({
          commissionId,
        });
        if (!commission) res.status(404).send("Commission not found");
        return res.send(commission);

      case "PUT":
        return res.send(
          await updateCommission({
            commissionId,
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

export const updateCommission = async ({
  commissionId,
  body,
}: {
  commissionId: string;
  body: unknown;
}) => {
  const {
    description: { html, json },
    name,
    price,
  } = commissionSchema.parse(body);

  return await prisma.commission.update({
    where: {
      id: commissionId,
    },
    data: {
      descriptionHtml: html,
      descriptionJson: json,
      name,
      price,
    },
  });
};

export const getCommission = async ({
  commissionId,
}: {
  commissionId: string;
}): Promise<CommissionSchema | null> => {
  const commission = await prisma.commission.findUnique({
    where: {
      id: commissionId,
    },
  });

  if (!commission) return null;

  const { descriptionHtml, descriptionJson, name, price, id } = commission;
  return {
    description: {
      html: descriptionHtml,
      json: descriptionJson,
    },
    name,
    price,
    id,
  };
};

export default commissionItemApi;

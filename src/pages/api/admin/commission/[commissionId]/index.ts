import { commissionSchema, CommissionSchema } from "service/admin/commission";
import { prisma } from "server/db/client";
import apiMiddleware from "server/apiMiddleware";

export default apiMiddleware.admin(async (req, res) => {
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
});

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
    active,
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
      active,
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

  const { descriptionHtml, descriptionJson, name, price, id, active } =
    commission;
  return {
    description: {
      html: descriptionHtml,
      json: descriptionJson,
    },
    name,
    price,
    id,
    active,
  };
};

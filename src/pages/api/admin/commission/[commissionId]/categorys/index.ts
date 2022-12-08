import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import {
  commissionCategoryCreateSchema,
  CommissionCategorySchema,
} from "service/admin/commission";

export default apiMiddleware.admin(async (req, res) => {
  const commissionId = req.query["commissionId"];
  if (typeof commissionId !== "string") {
    return res.status(401).send({});
  }

  try {
    switch (req.method) {
      case "GET":
        return res.send(
          await getCategoryCommission({
            commissionId,
          })
        );
      case "POST":
        return res.send(
          await insetCategoryCommission({
            body: req.body,
            commissionId,
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

const getCategoryCommission = async ({
  commissionId,
}: {
  commissionId: string;
}): Promise<CommissionCategorySchema[]> => {
  const categorys = await prisma.commissionCategory.findMany({
    where: {
      Commission: {
        id: commissionId,
      },
    },
  });

  return categorys.map(({ id, descriptionHtml, descriptionJson, name }) => ({
    name,
    id,
    description: {
      html: descriptionHtml,
      json: descriptionJson,
    },
  }));
};

const insetCategoryCommission = ({
  body,
  commissionId,
}: {
  body: unknown;
  commissionId: string;
}) => {
  const { description, name } = commissionCategoryCreateSchema.parse(body);

  return prisma.commissionCategory.create({
    data: {
      name,
      descriptionHtml: description?.html,
      descriptionJson: description?.json,
      Commission: {
        connect: {
          id: commissionId,
        },
      },
    },
  });
};

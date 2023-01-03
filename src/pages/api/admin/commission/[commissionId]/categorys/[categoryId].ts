import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import { commissionCategoryCreateSchema } from "service/admin/commission";

export default apiMiddleware.admin(async (req, res) => {
  const commissionId = req.query["commissionId"];
  const categoryId = req.query["categoryId"];
  if (typeof commissionId !== "string" || typeof categoryId !== "string") {
    return res.status(401).send({});
  }

  switch (req.method) {
    case "PUT":
      return res.send(
        await updateCommissionCategory({
          body: req.body,
          categoryId,
          commissionId,
        })
      );
    case "DELETE":
      return res.send(
        await deteleCommissionCategory({
          categoryId,
          commissionId,
        })
      );

    default:
      break;
  }
});

const updateCommissionCategory = ({
  body,
  categoryId,
  commissionId,
}: {
  body: unknown;
  commissionId: string;
  categoryId: string;
}) => {
  const { name, description } = commissionCategoryCreateSchema.parse(body);
  return prisma.commissionCategory.updateMany({
    data: {
      name,
      descriptionHtml: description?.html,
      descriptionJson: description?.json,
    },
    where: {
      id: categoryId,
      commissionId,
    },
  });
};

const deteleCommissionCategory = ({
  categoryId,
  commissionId,
}: {
  commissionId: string;
  categoryId: string;
}) => {
  return prisma.commissionCategory.deleteMany({
    where: {
      id: categoryId,
      commissionId,
    },
  });
};

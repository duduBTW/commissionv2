import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";

export default apiMiddleware.admin(async (req, res) => {
  const imageId = req.query["imageId"];
  if (typeof imageId !== "string") {
    return res.status(401).send({});
  }

  switch (req.method) {
    case "DELETE":
      return res.send(
        await deleteImageCommission({
          id: imageId,
        })
      );

    default:
      break;
  }
});

const deleteImageCommission = ({ id }: { id: string }) => {
  return prisma.commissionImage.delete({
    where: {
      id,
    },
  });
};

import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";

export default apiMiddleware.admin(async (req, res) => {
  const imageId = req.query["imageId"];
  if (typeof imageId !== "string") {
    return res.status(401).send({});
  }

  try {
    switch (req.method) {
      case "DELETE":
        res.send(
          await deleteImageCommission({
            id: imageId,
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

const deleteImageCommission = ({ id }: { id: string }) => {
  return prisma.commissionImage.delete({
    where: {
      id,
    },
  });
};

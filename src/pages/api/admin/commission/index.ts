import { commissionSchema } from "service/admin/commission";
import { prisma } from "server/db/client";
import apiMiddleware from "server/apiMiddleware";
import { ArtistCommissionList } from "pages/api/artist/[artistId]/commissions";

export default apiMiddleware.admin(async (req, res, user) => {
  switch (req.method) {
    case "GET":
      return res.send(
        await getCommissionList({
          userId: user.id,
        })
      );
    case "POST":
      return res.send(
        await insetCommission({
          body: req.body,
          userId: user.id,
        })
      );

    default:
      break;
  }
});

export const insetCommission = async ({
  body,
  userId,
}: {
  body: unknown;
  userId: string;
}) => {
  const {
    description: { html, json },
    name,
    price,
    active,
  } = commissionSchema.parse(body);

  return await prisma.commission.create({
    data: {
      descriptionHtml: html,
      descriptionJson: json,
      name,
      price,
      active,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const getCommissionList = async ({
  userId,
}: {
  userId: string;
}): Promise<ArtistCommissionList | null> => {
  const commissions = await prisma.commission.findMany({
    where: {
      user: {
        id: userId,
      },
    },
    include: {
      images: true,
    },
  });

  return commissions.map((commission) => {
    const { descriptionJson, name, price, id, images } = commission;

    return {
      descriptionHtml:
        JSON.parse(descriptionJson)?.content?.[0].content?.[0].text ?? "",
      name,
      price,
      id,
      miniature: images.find((image) => image.isMiniature)?.url,
    };
  });
};

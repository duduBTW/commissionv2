import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import { confirmationSchema } from "service/artist/order";
import { UserSession } from "types/next-auth";
import { z } from "zod";

export default apiMiddleware.user(async (req, res, user) => {
  const artistId = z.string().parse(req.query["artistId"]);
  const commissionId = z.string().parse(req.query["commissionId"]);

  try {
    switch (req.method) {
      case "POST":
        return res.send(
          await post({
            artistId,
            commissionId,
            body: req.body,
            user: user,
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

const post = async ({
  artistId,
  commissionId,
  body = {},
  user,
}: {
  artistId: string;
  commissionId: string;
  body: Record<string, unknown>;
  user?: UserSession;
}) => {
  const messages = z.record(z.string(), z.string()).parse(body?.messages);
  const buyer = confirmationSchema.parse(body?.user);
  const artist = await prisma.admin.findFirst({
    where: {
      user: {
        id: artistId,
      },
    },
    select: {
      id: true,
    },
  });

  if (!artist) throw new Error("No artist found");

  return await prisma.order.create({
    data: {
      artist: {
        connect: {
          id: artist.id,
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
      commission: {
        connect: {
          id: commissionId,
        },
      },
      ...buyer,
      messages: {
        create: Object.entries(messages).map(([id, content]) => ({
          content: content,
          category: {
            connect: {
              id: id,
            },
          },
        })),
      },
    },
    select: {
      id: true,
    },
  });
};

import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "server/common/get-server-auth-session";
import { prisma } from "server/db/client";
import {
  messageCreateSchema,
  orderUserCreateSchema,
} from "service/artist/order";
import { UserSession } from "types/next-auth";

const orderApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const artistId = req.query["artistId"];
  const commissionId = req.query["commissionId"];
  if (typeof artistId !== "string" || typeof commissionId !== "string") {
    return res.status(401).send({});
  }

  const session = await getServerAuthSession({ req, res });

  try {
    switch (req.method) {
      case "POST":
        return res.send(
          await orderCommission({
            artistId,
            commissionId,
            body: req.body,
            user: session?.user,
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

const orderCommission = async ({
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
  const messages = messageCreateSchema.array().parse(body?.messages);
  const buyer = orderUserCreateSchema.parse(body?.user);
  const artist = await prisma.admin.findFirst({
    where: {
      users: {
        some: {
          id: artistId,
        },
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
      discord: buyer.discord,
      twitter: buyer.twitter,
      messages: {
        create: messages.map((message) => ({
          content: message.value,
          type: message.type,
          category: {
            connect: {
              id: message.categoryId,
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

export default orderApi;

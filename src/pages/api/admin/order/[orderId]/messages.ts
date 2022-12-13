import adminApiRoute from "server/apiMiddleware/admin";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { UserSession } from "types/next-auth";
import { prisma } from "server/db/client";
import { Message, Category } from "components/order/category";

export default adminApiRoute(async (req, res, session) => {
  try {
    switch (req.method) {
      case "GET":
        return res.send(await get(req, res, session));

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

const get = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: UserSession
) => {
  const { query } = req;
  const orderId = z.string().parse(query.orderId);
  const content: Record<string, Message[]> = {};
  const categorys: Record<string, Category> = {};

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      artist: {
        users: {
          some: {
            id: user.id,
          },
        },
      },
    },
    select: {
      messages: {
        include: {
          category: true,
        },
      },
    },
  });

  order?.messages.forEach((message) => {
    content[message.category.id] = [
      {
        id: message.id,
        type: message.type as "text" | "image",
        value: message.content,
      },
      ...(content[message.category.id] ?? []),
    ];

    categorys[message.category.id] = {
      id: message.category.id,
      name: message.category.name,
      description: {
        html: message.category.descriptionHtml,
      },
    };
  });

  return {
    content,
    categorys: Object.values(categorys),
  };
};

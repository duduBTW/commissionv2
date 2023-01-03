import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { UserSession } from "types/next-auth";
import { prisma } from "server/db/client";
import { Message, Category } from "components/order/category";
import { getServerAuthSession } from "server/common/get-server-auth-session";

const orderApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const orderId = req.query["orderId"];
  if (typeof orderId !== "string") {
    return res.status(401).send({});
  }

  const session = await getServerAuthSession({ req, res });
  if (!session?.user) return res.status(404).send({});

  try {
    switch (req.method) {
      case "GET":
        return res.send(await get(req, session.user));

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const get = async (req: NextApiRequest, user: UserSession) => {
  const { query } = req;
  const orderId = z.string().parse(query.orderId);
  const content: Record<string, Message[]> = {};
  const categorys: Record<string, Category> = {};

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      user: {
        id: user.id,
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

  if (!order) throw new Error("No order found");

  order.messages.forEach((message) => {
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

export default orderApi;

import adminApiRoute from "server/apiMiddleware/admin";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { UserSession } from "types/next-auth";
import { prisma } from "server/db/client";

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

export type AdminOrderMessages = Awaited<ReturnType<typeof get>>;
const get = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: UserSession
) => {
  const { query } = req;
  const orderId = z.string().parse(query.orderId);

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      artist: {
        user: {
          id: user.id,
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

  return order?.messages;
};

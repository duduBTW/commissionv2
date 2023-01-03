import adminApiRoute from "server/apiMiddleware/admin";
import { NextApiRequest } from "next";
import { UserSession } from "types/next-auth";
import { z } from "zod";
import { prisma } from "server/db/client";

export default adminApiRoute(async (req, res, session) => {
  try {
    switch (req.method) {
      case "GET":
        return res.send(await get(req, session));
      case "POST":
        return res.send(await post(req, session));

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

export type OrderProgressList = Awaited<ReturnType<typeof get>>;

const get = async ({ query }: NextApiRequest, user: UserSession) => {
  const orderId = z.string().parse(query.orderId);

  return await prisma.orderProgress.findMany({
    where: {
      Order: {
        id: orderId,
      },
    },
  });
};

const orderProgressCreateSchema = z.object({
  type: z.string(),
  content: z.object({
    html: z.string(),
    json: z.string(),
  }),
});

export type OrderProgressCreateSchema = z.infer<
  typeof orderProgressCreateSchema
>;
export type OrderProgressCreateReturn = Awaited<ReturnType<typeof post>>;

const post = async ({ query, body }: NextApiRequest, user: UserSession) => {
  const orderId = z.string().parse(query.orderId);
  const {
    content: { html },
    type,
  } = orderProgressCreateSchema.parse(body);

  await prisma.orderProgress.updateMany({
    where: {
      Order: {
        id: orderId,
      },
    },
    data: {
      active: false,
    },
  });

  const progress = await prisma.orderProgress.create({
    data: {
      active: true,
      type,
      html,
      Order: {
        connect: {
          id: orderId,
        },
      },
    },
  });

  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      type,
      currentTypeId: progress.id,
    },
  });

  return progress;
};

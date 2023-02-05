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
      case "PUT":
        return res.send(await put(req, res, session));

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

const put = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: UserSession
) => {
  const { query, body } = req;
  const orderId = z.string().parse(query.orderId);
  const type = z.string().parse(body.type);

  const order = prisma.order.findFirst({
    where: {
      id: orderId,
      artist: {
        user: {
          id: user.id,
        },
      },
    },
  });

  if (!order) throw new Error("");

  return res.send(
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        type,
      },
    })
  );
};

export type AdminOrder = Awaited<ReturnType<typeof get>>;

const get = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: UserSession
) => {
  const { query } = req;
  const orderId = z.string().parse(query.orderId);

  return await prisma.order.findFirst({
    where: {
      id: orderId,
      artist: {
        user: {
          id: user.id,
        },
      },
    },
    select: {
      id: true,
      commission: {
        select: {
          id: true,
          name: true,
          price: true,
          images: {
            select: {
              url: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          userName: true,
          profilePicture: true,
        },
      },
      type: true,
      contact: true,
      progress: true,
      currentTypeId: true,
      birthDate: true,
      payingType: true,
      fullName: true,
    },
  });
};

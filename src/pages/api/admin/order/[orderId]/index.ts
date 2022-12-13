import adminApiRoute from "server/apiMiddleware/admin";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { UserSession } from "types/next-auth";
import { prisma } from "server/db/client";

export default adminApiRoute(async (req, res, session) => {
  try {
    switch (req.method) {
      case "GET":
        return await get(req, res, session);

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

  return res.send(
    await prisma.order.findFirst({
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
        discord: true,
        twitter: true,
      },
    })
  );
};

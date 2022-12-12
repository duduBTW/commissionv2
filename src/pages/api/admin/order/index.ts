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

const safeParseToQuery = <A, B>(value: z.SafeParseReturnType<A, B>) =>
  value.success ? value.data : undefined;

const get = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: UserSession
) => {
  const { query } = req;
  const type = safeParseToQuery(z.string().safeParse(query.type));
  const exclude_type = safeParseToQuery(
    z.string().safeParse(query.exclude_type)
  );

  return res.send(
    await prisma.order.findMany({
      where: {
        artist: {
          users: {
            some: {
              id: user.id,
            },
          },
        },
        type: {
          not: exclude_type,
          equals: type,
        },
      },
      select: {
        id: true,
        commission: {
          select: {
            id: true,
            name: true,
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
      },
    })
  );
};

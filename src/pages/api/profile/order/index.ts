import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "server/common/get-server-auth-session";
import { prisma } from "server/db/client";
import {} from "service/artist/order";
import { UserSession } from "types/next-auth";

const orderApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session?.user) return res.status(401).send({});

  try {
    switch (req.method) {
      case "GET":
        return res.send(
          await getOrderList({
            user: session.user,
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

const getOrderList = async ({ user }: { user: UserSession }) => {
  return await prisma.order.findMany({
    where: {
      user: {
        id: user.id,
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
      artist: {
        include: {
          users: {
            select: {
              id: true,
              userName: true,
              profilePicture: true,
            },
          },
        },
      },
      type: true,
    },
  });
};

export default orderApi;

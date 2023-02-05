import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "server/common/get-server-auth-session";
import { prisma } from "server/db/client";
import {} from "service/artist/order";
import { UserSession } from "types/next-auth";

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
        return res.send(
          await get({
            orderId,
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

export type ProfileOrder = Awaited<ReturnType<typeof get>>;
const get = async ({
  orderId,
  user,
}: {
  user: UserSession;
  orderId: string;
}) => {
  return await prisma.order.findFirst({
    where: {
      id: orderId,
      user: {
        id: user.id,
      },
    },
    select: {
      id: true,
      commission: {
        select: {
          id: true,
          images: true,
          name: true,
          price: true,
        },
      },
      artist: {
        include: {
          user: {
            select: {
              id: true,
              userName: true,
              profilePicture: true,
            },
          },
        },
      },
      type: true,
      messages: true,
      contact: true,
      progress: true,
      currentTypeId: true,
    },
  });
};

export default orderApi;

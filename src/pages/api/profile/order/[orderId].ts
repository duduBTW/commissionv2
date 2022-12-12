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

  try {
    switch (req.method) {
      case "GET":
        return res.send(
          await getOrderCommission({
            orderId,
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

const getOrderCommission = async ({
  orderId,
}: {
  user?: UserSession;
  orderId: string;
}) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
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
      artist: true,
      messages: true,
      discord: true,
    },
  });

  return {
    ...order,
    discord: order?.discord?.split("#")[0],
  };
};

export default orderApi;

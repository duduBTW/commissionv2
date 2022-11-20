import { getServerAuthSession } from "server/common/get-server-auth-session";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { UserSession } from "types/next-auth";
import { prisma } from "server/db/client";

const adminApiRoute = (
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    user: UserSession
  ) => unknown | Promise<unknown>
): NextApiHandler => {
  return async (req, res) => {
    const session = await getServerAuthSession({ req, res });
    if (!session?.user) return res.status(401).send({});

    const admin = await prisma.user.findFirst({
      where: {
        adminId: {
          not: null,
        },
        id: session.user.id,
      },
      select: {
        id: true,
      },
    });
    if (!admin) return res.status(401).send({});

    return handler(req, res, session.user);
  };
};

export default adminApiRoute;

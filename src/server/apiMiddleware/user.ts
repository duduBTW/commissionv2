import { getServerAuthSession } from "server/common/get-server-auth-session";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { UserSession } from "types/next-auth";

const userApiRoute = (
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    user: UserSession
  ) => unknown | Promise<unknown>
): NextApiHandler => {
  return async (req, res) => {
    const session = await getServerAuthSession({ req, res });
    if (!session?.user)
      return res.status(401).send({
        messaage: "Login invalid :(",
      });

    try {
      return await handler(req, res, session.user);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  };
};

export default userApiRoute;

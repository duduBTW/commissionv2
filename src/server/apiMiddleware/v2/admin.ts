import apiMiddleware from "..";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { UserSession } from "types/next-auth";

type handler = (
  req: NextApiRequest,
  res: NextApiResponse,
  user: UserSession
) => unknown | Promise<unknown>;

const adminApiRoutev2 = (
  routes: Record<string, handler>,
  validator?: (req: NextApiRequest) => object | undefined
): NextApiHandler => {
  return apiMiddleware.admin(async (req, res, user) => {
    try {
      Object.entries(routes).map(([method, handler]) => {
        if (method !== req.method) return;

        const params = validator?.(req);
        if (!params) return res.status(401).send({});
        handler(req, res, user);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  });
};

export default adminApiRoutev2;

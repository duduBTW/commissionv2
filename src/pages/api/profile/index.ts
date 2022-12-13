import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db/client";
import { getServerAuthSession } from "server/common/get-server-auth-session";
import { createProfileSchema } from "service/profile";

const profileApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session?.user) return res.status(401).send({});

  try {
    switch (req.method) {
      case "GET":
        return res.send(await getUser(session.user.id));

      case "PUT":
        return res.send(
          await updateUser({ id: session.user.id, body: req.body })
        );

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const updateUser = ({ body, id }: { id: string; body: unknown }) => {
  const data = createProfileSchema.parse(body);

  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

const getUser = (id: string) =>
  prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      adminId: true,
      profilePicture: true,
      discord: true,
      twitter: true,
      banner: true,
      userName: true,
    },
  });

export default profileApi;

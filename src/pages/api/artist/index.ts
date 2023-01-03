import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db/client";

const artistApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        return res.send(await get());

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

export type ArtistList = Awaited<ReturnType<typeof get>>;

const get = async () => {
  const admins = await prisma.admin.findMany({
    include: {
      user: {
        select: {
          id: true,
          userName: true,
          profilePicture: true,
          banner: true,
        },
      },
    },
  });

  return admins.map((admin) => admin.user);
};

export default artistApi;

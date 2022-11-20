import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db/client";

const artistApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        return res.send(await getArtistList());

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const getArtistList = () =>
  prisma.user.findMany({
    where: {
      adminId: {
        not: null,
      },
      userName: {
        not: null,
      },
    },
    select: {
      id: true,
      userName: true,
      profilePicture: true,
      banner: true,
    },
  });

export default artistApi;

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db/client";

const artistItemApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const artistId = req.query["artistId"];
  if (typeof artistId !== "string") {
    return res.status(401).send({});
  }

  try {
    switch (req.method) {
      case "GET":
        return res.send(await getArtist(artistId));

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const getArtist = (id: string) =>
  prisma.user.findFirst({
    where: {
      adminId: {
        not: null,
      },
      userName: {
        not: null,
      },
      id,
    },
    select: {
      id: true,
      userName: true,
      profilePicture: true,
      banner: true,
    },
  });

export default artistItemApi;

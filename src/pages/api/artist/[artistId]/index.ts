import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db/client";
import { z } from "zod";

const artistItemApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const artistId = z.string().parse(req.query["artistId"]);

    switch (req.method) {
      case "GET":
        return res.send(await get(artistId));

      default:
        return res.status(404).send({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

export type Artist = Awaited<ReturnType<typeof get>>;
const get = (id: string) =>
  prisma.user.findFirst({
    where: {
      Admin: {
        userId: id,
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

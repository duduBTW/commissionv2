import apiMiddleware from "server/apiMiddleware";
import { prisma } from "server/db/client";
import { z } from "zod";

export default apiMiddleware.admin(async (req, res, user) => {
  switch (req.method) {
    case "POST":
      return res.send(
        await post({
          userId: user.id,
          body: req.body,
        })
      );

    case "GET":
      return res.send(
        await get({
          userId: user.id,
        })
      );

    default:
      break;
  }
});

// -- GET
export type ContractList = Awaited<ReturnType<typeof get>>;
export const get = async ({ userId }: { userId: string }) => {
  return prisma.contract.findMany({
    where: {
      user: {
        id: userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// -- POST
export type CreateContractReturn = Awaited<ReturnType<typeof post>>;
export type CreateContractSchema = z.infer<typeof createContractSchema>;

const createContractSchema = z.object({
  html: z.string(),
  json: z.string(),
});

const post = async ({ body, userId }: { body: unknown; userId: string }) => {
  const { html, json } = createContractSchema.parse(body);

  await prisma.contract.updateMany({
    where: {
      user: {
        id: userId,
      },
      active: true,
    },
    data: {
      active: false,
    },
  });

  return prisma.contract.create({
    data: {
      active: true,
      html,
      json,
      createdAt: new Date().toISOString(),
      user: {
        connect: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
    },
  });
};

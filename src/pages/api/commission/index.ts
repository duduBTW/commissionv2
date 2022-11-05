import { NextApiRequest, NextApiResponse } from "next";
import { CommissionListSchema, commissionSchema } from "service/commission";
import { prisma } from "server/db/client";

const commissionApi = async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await getServerAuthSession({ req, res });
  // if (!session)
  //   return res.status(401).send({
  //     error:
  //       "You must be signed in to view the protected content on this page.",
  //   });

  try {
    switch (req.method) {
      case "GET":
        return res.send(await getCommissionList());
      case "POST":
        return res.send(
          await insetCommission({
            body: req.body,
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

export const insetCommission = async ({ body }: { body: unknown }) => {
  const {
    description: { html, json },
    name,
    price,
  } = commissionSchema.parse(body);

  return await prisma.commission.create({
    data: {
      descriptionHtml: html,
      descriptionJson: json,
      name,
      price,
    },
  });
};

export const getCommissionList = async (): Promise<
  CommissionListSchema[] | null
> => {
  const commissions = await prisma.commission.findMany({
    include: {
      images: true,
    },
  });

  return commissions.map((commission) => {
    const { descriptionJson, name, price, id, images } = commission;

    return {
      descriptionHtml:
        JSON.parse(descriptionJson)?.content?.[0].content?.[0].text ?? "",
      name,
      price,
      id,
      miniature: images[0]?.url,
    };
  });
};

export default commissionApi;

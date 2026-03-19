import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      currency: true,
      inventory: {
        include: {
          warehouse: true,
        },
      },
      product_attributes: {
        include: {
          attribute: true,
        },
      },
    },
    orderBy: {
      product_id: "asc",
    },
  });

  return Response.json(products);
}

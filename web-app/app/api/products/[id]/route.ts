import { prisma } from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return Response.json({ message: "Invalid product id" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { product_id: productId },
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
  });

  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }

  return Response.json(product);
}

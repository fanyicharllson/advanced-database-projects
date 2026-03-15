import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: { currency: true, inventory: true }
  });
  return Response.json(products);
}
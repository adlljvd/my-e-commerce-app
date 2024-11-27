import Product from "@/db/models/Product";

//eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
  const products = await Product.findAll();

  return Response.json(products);
}

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { ecommerceApi } from "@/lib/ecommerce";
import { retriveProductPrice } from "@/utils/retrive-product-price";

const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

const updateProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  priceId: z.string(),
});

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const products = await ecommerceApi.products.list();

    const mappedProductsWithPrice = await Promise.all(
      products.data.map(retriveProductPrice)
    );

    return mappedProductsWithPrice;
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;

      const product = await ecommerceApi.products.retrieve(id);

      const mappedProductWithPrice = retriveProductPrice(product);

      return mappedProductWithPrice;
    }),

  create: publicProcedure
    .input(createProductSchema)
    .mutation(async ({ input }) => {
      const { name, description, price } = input;

      const newProduct = await ecommerceApi.products.create({
        name,
        description,
        default_price_data: { currency: "brl", unit_amount: price },
        type: "good",
      });

      return newProduct;
    }),

  update: publicProcedure
    .input(updateProductSchema)
    .mutation(async ({ input }) => {
      const { id, ...data } = input;

      const newUpdatedProduct = await ecommerceApi.products.update(id, {
        ...data,
        default_price: data.priceId,
      });

      return newUpdatedProduct;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      await ecommerceApi.products.del(id);
    }),
});

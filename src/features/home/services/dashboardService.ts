import { dummyJsonAPI } from "../../../services/api";
import type { ProductList } from "../types/product.types";

export const getFeaturedProducts = async (): Promise<ProductList> => {
  const { data } = await dummyJsonAPI.get<ProductList>("/products");
  return data;
};

export const getCategoryProducts = async ({
  category,
}: {
  category: string;
}): Promise<ProductList> => {
  const { data } = await dummyJsonAPI.get<ProductList>(
    `products/category/${category}`,
  );
  return data;
};

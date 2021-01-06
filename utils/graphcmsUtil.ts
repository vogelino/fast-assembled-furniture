import { Product } from "../components/ProductList";

type ProductWithoutDescription = Omit<Product, 'description'>
export interface ProductUnmapped extends ProductWithoutDescription {
  description: {
    markdown?: string;
  };
}

export const mapProductToProps: (product: ProductUnmapped) => Product = ({ description, ...product }) => ({
  ...product,
  description: description?.markdown || ''
})

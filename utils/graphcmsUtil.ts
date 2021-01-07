import { Product, Thumbnail } from '../components/ProductList';

type ProductWithoutDescription = Omit<Product, 'description'>;
export interface RawProject extends ProductWithoutDescription {
  description: {
    markdown?: string;
  };
}
export interface RawThumbnail {
  slug: string;
  thumbnail: Thumbnail;
}
export interface RawSeoPage {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}
export interface RawSeoCommons {
  siteTitle: string;
  themeTextColor: string;
  twitterUsername: string;
}
export interface MappedSeoProps extends RawSeoCommons {
  title: string;
  description: string;
  keywords: string[];
}

export const mapProductToProps: (product: RawProject) => Product = ({
  description,
  ...product
}) => ({
  ...product,
  description: description?.markdown || '',
});

export const mapProductsToProps: (
  products: RawProject[],
  thumbnails?: RawThumbnail[]
) => Product[] = (products, thumbnails) =>
  products.map((product: RawProject) => ({
    ...mapProductToProps(product),
    ...(thumbnails
      ? {
          thumbnail: thumbnails.find((thumb) => thumb.slug === product.slug)?.thumbnail,
        }
      : {}),
  }));

export const mapSeoToProps = ({
  pages,
  seoCommons,
}: {
  pages: RawSeoPage[];
  seoCommons: RawSeoCommons[];
}): MappedSeoProps => ({
  title: pages[0].seoTitle || '',
  description: pages[0].seoDescription || '',
  keywords: pages[0].seoKeywords || [],
  ...seoCommons[0],
});

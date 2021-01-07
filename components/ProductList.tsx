import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import Button from './Button';

const shortenText: (text: string) => string = (text) => (text.length > 80 ? `${text.slice(0, 80)}...` : text);

const ProductListItem: React.FC<Product> = ({
  slug,
  title = 'Untitled',
  startPrice = 10,
  description = 'No description yet.',
  thumbnail,
}) => {
  const { t, lang } = useTranslation();
  const currency = new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' });

  return (
    <Link href={`/${slug}`}>
      <a className="group border-black rounded-lg overflow-hidden border-2 hover:border-gray-300 transition-all">
        {thumbnail && (
          <Image
            src={thumbnail.url}
            alt={title}
            layout="responsive"
            width="1000"
            height="600"
            objectFit="cover"
          />
        )}
        <div className="p-6 border-t-2 border-black group-hover:border-gray-300 transition-all">
          <h3 className="font-bold text-xl">{title}</h3>
          {startPrice && (
            <h4 className="text-mmd mb-2">
              {t('product:priceStartingFrom', { price: currency.format(startPrice) })}
            </h4>
          )}
          <p className="text-sm mt-1 text-gray-400 mb-4">{shortenText(description)}</p>
          <Button type="button">{t('common:buttons.learnMore')}</Button>
        </div>
      </a>
    </Link>
  );
};

export interface Thumbnail {
  slug?: string;
  url: string;
}

export interface Product {
  slug: string;
  title?: string;
  startPrice?: number;
  description?: string;
  thumbnail?: Thumbnail;
}

export interface Products {
  products: Product[];
}

const ProductList: React.FC<Products> = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {products.map((product) => (
      <ProductListItem
        key={product.slug}
        slug={product.slug}
        description={product.description}
        startPrice={product.startPrice}
        thumbnail={product.thumbnail}
        title={product.title}
      />
    ))}
  </div>
);

export default ProductList;

import { sanitizeString } from '@lib/helpers/string';
import type { ProductItem } from '../types/entities/product';
import MockProductListAPIResponse from './mocks/product.json';

type GetProductListArgs = {
  searchKeyword?: string;
};

export const getProductList: (args: GetProductListArgs) => Promise<ProductItem[]> = async ({
  searchKeyword
}) => {
  // Note: Supposedly we need to fetch API here, but there's no endpoint provided.
  //       We will mock using promise + setTimeout for this case.
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = MockProductListAPIResponse?.products ?? [];
      const sanitizedSearchKeyword = sanitizeString(searchKeyword || '');

      if (sanitizedSearchKeyword) {
        return resolve(
          data.filter((productObj) => {
            const finalProductObj = productObj || ({} as ProductItem);

            return (finalProductObj.name || '').toLowerCase().includes(sanitizedSearchKeyword);
          })
        );
      }

      return resolve(data);
    }, 1000);
  });
};

export const getProductDetail: (productSlug: string) => Promise<ProductItem | undefined> = async (
  productSlug
) => {
  // Note: Supposedly we need to fetch API here, but there's no endpoint provided.
  //       We will mock using promise + setTimeout for this case.
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = MockProductListAPIResponse?.products ?? [];

      if (productSlug) {
        return resolve(
          data.find((productObj) => {
            const finalProductObj = productObj || ({} as ProductItem);

            return (finalProductObj.productUrl || '').includes(productSlug);
          })
        );
      }

      resolve(undefined);
    }, 1000);
  });
};

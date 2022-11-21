import { FilterQuery, HydratedDocument } from 'mongoose';
import Product from '../database/product.model';
import HttpError from '../errors/http.error';
import { ProductEntity } from '../interfaces/database';

export async function findProductByQuery(param: FilterQuery<ProductEntity>): Promise<HydratedDocument<ProductEntity>> {
  return Product.findOne(param);
}

export async function findAllProducts(): Promise<Array<HydratedDocument<ProductEntity>>> {
  return Product.find();
}

export async function findProductById(_id: string): Promise<HydratedDocument<ProductEntity>> {
  return Product.findById({ _id });
}

export async function createProduct(product: ProductEntity): Promise<HydratedDocument<ProductEntity>> {
  const alreadyExists = await findProductByQuery({ name: product.name });
  if (alreadyExists) {
    throw new HttpError(400, 'There is the same product');
  }

  return Product.create(product);
}

export async function findByIdAndUpdate(_id: string, params: ProductEntity): Promise<HydratedDocument<ProductEntity>> {
  if (params.name) {
    const alreadyExists = await findProductByQuery({ name: params.name });
    if (alreadyExists) {
      throw new HttpError(400, 'There is the same name of product');
    }
  }
  return Product.findByIdAndUpdate({ _id }, params, { new: true });
}

export async function findByIdAndDelete(_id: string): Promise<HydratedDocument<ProductEntity>> {
  return Product.findByIdAndDelete({ _id });
}

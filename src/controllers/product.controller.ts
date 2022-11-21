import { Request, Response } from 'express';
import HttpError from '../errors/http.error';
import * as productService from '../services/product.service';
import productValidator from '../validators/product.validator';

export async function getProducts(req: Request, res: Response) {
  return res.json(await productService.findAllProducts());
}

export async function getProduct(req: Request, res: Response) {
  if (!req.params.id) {
    throw new HttpError(400, 'Params is empty');
  }
  return res.json(await productService.findProductById(req.params.id));
}

export async function createProduct(req: Request, res: Response) {
  const { error } = productValidator.createProductValidator.validate(req.body);
  if (error) {
    throw new HttpError(400, error.details[0].message);
  }

  const createdUser = await productService.createProduct(req.body);

  return res.json(createdUser);
}

export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params as { id: string };
  const infoToUpdate = req.body;

  const { error } = productValidator.updateProductValidator.validate(infoToUpdate);
  if (error) {
    throw new HttpError(400, error.details[0].message);
  }

  const updatedProduct = await productService.findByIdAndUpdate(id, infoToUpdate);

  return res.json(updatedProduct);
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params as { id: string };
  return res.json(await productService.findByIdAndDelete(id));
}

import { ObjectId } from 'mongoose';

export interface ProductEntity {
  _id: ObjectId | string;
  name: string;
  price: number;
}

import { model, Schema } from 'mongoose';
import { ProductEntity } from '../interfaces/database';

const productSchema = new Schema<ProductEntity>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const Product = model('product', productSchema);
export default Product;

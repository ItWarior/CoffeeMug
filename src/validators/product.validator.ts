import Joi from 'joi';

export default {
  createProductValidator: Joi.object({
    name: Joi.string().alphanum().min(4).max(100).required(),
    price: Joi.number().min(0).required(),
  }),
  updateProductValidator: Joi.object({
    name: Joi.string().alphanum().min(4).max(100),
    price: Joi.number().min(0),
  }),
};

import Joi from 'joi';

class OrderSchema {
  public orderValidation = Joi.object({
    productsIds: Joi.array().has(Joi.number()).required()
      .messages({
        'any.required': '400|"productsIds" is required',
        'array.base': '422|"productsIds" must be an array',
        'array.hasUnknown': '422|"productsIds" must include only numbers',
      }),
  });
}

export default OrderSchema;
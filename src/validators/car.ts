import Joi from 'joi';
import { TBodyValidator } from '../types';

export const carSchema = Joi.object({
  _id: Joi.string().hex().length(24).messages({
    'string.base': '400|Car ID must be a string',
    'string.hex': '400|Car ID must be a hexadecimal string',
    'string.length': '400|Car ID must be 24 characters long',
  }),
  model: Joi.string().trim().min(3).required()
    .messages({
      'string.base': '400|Model must be a string',
      'string.empty': '400|Model is required',
      'string.min': '400|Model must be at least 3 characters long',
      'any.required': '400|Model is required',
    }),
  year: Joi.number().integer().min(1900).max(2022)
    .required()
    .messages({
      'number.base': '400|Year must be a number',
      'number.integer': '400|Year must be an integer',
      'number.min': '400|Year must be at least 1900',
      'number.max': '400|Year must be at most 2022',
      'any.required': '400|Year is required',
    }),
  color: Joi.string().trim().min(3).required()
    .messages({
      'string.base': '400|Color must be a string',
      'string.empty': '400|Color is required',
      'string.min': '400|Color must be at least 3 characters long',
      'any.required': '400|Color is required',
    }),
  status: Joi.boolean().messages({
    'boolean.base': '400|Status must be a boolean',
  }),
  buyValue: Joi.number().integer().positive().required()
    .messages({
      'number.base': '400|Buy value must be a number',
      'number.integer': '400|Buy value must be an integer',
      'number.positive': '400|Buy value must be a positive number',
      'any.required': '400|Buy value is required',
    }),
  doorsQty: Joi.number().integer().min(2).max(4)
    .required()
    .messages({
      'number.base': '400|Doors quantity must be a number',
      'number.integer': '400|Doors quantity must be an integer',
      'number.min': '400|Doors quantity must be at least 2',
      'number.max': '400|Doors quantity must be at most 4',
      'any.required': '400|Doors quantity is required',
    }),
  seatsQty: Joi.number().integer().min(2).max(7)
    .required()
    .messages({
      'number.base': '400|Seats quantity must be a number',
      'number.integer': '400|Seats quantity must be an integer',
      'number.min': '400|Seats quantity must be at least 2',
      'number.max': '400|Seats quantity must be at most 7',
      'any.required': '400|Seats quantity is required',
    }),
}).messages({
  'object.unknown': '400|Property {{#label}} is not allowed',
});

export const carValidator: TBodyValidator = (body) => {
  const { error, value } = carSchema.validate(body);

  return { error, value };
};
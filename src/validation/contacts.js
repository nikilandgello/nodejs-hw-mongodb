import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 20 characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      'string.base': 'Phone number should be a string',
      'string.pattern.base': 'Phone number should only contain digits',
      'string.min': 'Phone number should have at least 10 characters',
      'string.max': 'Phone number should have at most 15 characters',
      'any.required': 'Phone number is required',
    }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Please provide a valid email address',
  }),
  isFavourite: Joi.boolean().optional().default(false).messages({
    'boolean.base': 'isFavourite should be a boolean value',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .optional()
    .default('personal')
    .messages({
      'string.base': 'Contact type should be a string',
      'any.only': 'Contact type should be one of [work, home, personal]',
    }),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
});

export const updateContactsSchema = createContactsSchema
  .fork(['name', 'phoneNumber'], (schema) => schema.optional())
  .min(1);

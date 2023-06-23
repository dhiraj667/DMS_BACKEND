import Joi from 'joi'

const attrs = {
  name: Joi.string().required(),
  label: Joi.string().required(),
  input: Joi.string().required()
}

export const fieldsSchema = Joi.object(attrs)

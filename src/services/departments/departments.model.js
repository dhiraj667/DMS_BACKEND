import Joi from 'joi'
const attrs = {
  departmentName: Joi.string().min(3).max(50).required()
}

export const departmentsSchema = Joi.object(attrs)

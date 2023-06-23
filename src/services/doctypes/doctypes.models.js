import Joi from 'joi'

import ObjectId from 'joi-objectid'
const JoiObjectId = ObjectId(Joi)

const attrs = {
  docType: Joi.string().min(5).max(50).required(),
  docTypeCode: Joi.string().required(),
  departmentId: JoiObjectId().required()
}

export const doctypesSchema = Joi.object(attrs)

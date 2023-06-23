import Joi from 'joi'
import ObjectId from 'joi-objectid'
const JoiObjectId = ObjectId(Joi)

const attrs = {
  departmentId: JoiObjectId(),
  doctypeId: JoiObjectId().required(),
  fieldId: JoiObjectId().required(),
  isRequired: Joi.boolean()
}

export const doctypefieldsSchema = Joi.object(attrs)

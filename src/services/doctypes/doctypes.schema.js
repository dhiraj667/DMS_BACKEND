// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const doctypesSchema = {
  $id: 'Doctypes',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'docType', 'docTypeCode', 'department'],
  properties: {
    _id: ObjectIdSchema(),
    docType: { type: 'string' },
    docTypeCode: { type: 'string' },
    department: { type: 'object' }
  }
}
export const doctypesValidator = getValidator(doctypesSchema, dataValidator)
export const doctypesResolver = resolve({})

export const doctypesExternalResolver = resolve({})

// Schema for creating new data
export const doctypesDataSchema = {
  $id: 'DoctypesData',
  type: 'object',
  additionalProperties: false,
  required: ['docType', 'docTypeCode', 'department'],
  properties: {
    ...doctypesSchema.properties
  }
}
export const doctypesDataValidator = getValidator(doctypesDataSchema, dataValidator)
export const doctypesDataResolver = resolve({})

// Schema for updating existing data
export const doctypesPatchSchema = {
  $id: 'DoctypesPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...doctypesSchema.properties
  }
}
export const doctypesPatchValidator = getValidator(doctypesPatchSchema, dataValidator)
export const doctypesPatchResolver = resolve({})

// Schema for allowed query properties
export const doctypesQuerySchema = {
  $id: 'DoctypesQuery',
  type: 'object',
  additionalProperties: true,
  properties: {
    ...querySyntax(doctypesSchema.properties)
    // departmentName: { type: 'string' }
  }
}
export const doctypesQueryValidator = getValidator(doctypesQuerySchema, queryValidator)
export const doctypesQueryResolver = resolve({})

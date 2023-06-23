// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const fieldsSchema = {
  $id: 'Fields',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'fieldName'],
  properties: {
    _id: ObjectIdSchema(),
    fieldName: {
      type: 'object',
      properties: { name: { type: 'string' }, label: { type: 'string' }, input: { type: 'string' } }
    }
  }
}
export const fieldsValidator = getValidator(fieldsSchema, dataValidator)
export const fieldsResolver = resolve({})

export const fieldsExternalResolver = resolve({})

// Schema for creating new data
export const fieldsDataSchema = {
  $id: 'FieldsData',
  type: 'object',
  additionalProperties: false,
  required: ['fieldName'],
  properties: {
    ...fieldsSchema.properties
  }
}
export const fieldsDataValidator = getValidator(fieldsDataSchema, dataValidator)
export const fieldsDataResolver = resolve({})

// Schema for updating existing data
export const fieldsPatchSchema = {
  $id: 'FieldsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...fieldsSchema.properties
  }
}
export const fieldsPatchValidator = getValidator(fieldsPatchSchema, dataValidator)
export const fieldsPatchResolver = resolve({})

// Schema for allowed query properties
export const fieldsQuerySchema = {
  $id: 'FieldsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(fieldsSchema.properties)
  }
}
export const fieldsQueryValidator = getValidator(fieldsQuerySchema, queryValidator)
export const fieldsQueryResolver = resolve({})

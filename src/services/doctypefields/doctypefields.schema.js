// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const doctypefieldsSchema = {
  $id: 'Doctypefields',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'department', 'doctype', 'field'],
  properties: {
    _id: ObjectIdSchema(),
    department: { type: 'object' },
    doctype: { type: 'object' },
    field: { type: 'object' },
    isRequired: { type: 'boolean' }
  }
}
export const doctypefieldsValidator = getValidator(doctypefieldsSchema, dataValidator)
export const doctypefieldsResolver = resolve({})

export const doctypefieldsExternalResolver = resolve({})

// Schema for creating new data
export const doctypefieldsDataSchema = {
  $id: 'DoctypefieldsData',
  type: 'object',
  additionalProperties: false,
  required: ['doctype', 'field', 'department'],
  properties: {
    ...doctypefieldsSchema.properties
  }
}
export const doctypefieldsDataValidator = getValidator(doctypefieldsDataSchema, dataValidator)
export const doctypefieldsDataResolver = resolve({})

// Schema for updating existing data
export const doctypefieldsPatchSchema = {
  $id: 'DoctypefieldsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...doctypefieldsSchema.properties
  }
}
export const doctypefieldsPatchValidator = getValidator(doctypefieldsPatchSchema, dataValidator)
export const doctypefieldsPatchResolver = resolve({})

// Schema for allowed query properties
export const doctypefieldsQuerySchema = {
  $id: 'DoctypefieldsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(doctypefieldsSchema.properties),
    departmentName: { type: 'string' },
    doctype: { type: 'string' }
  }
}
export const doctypefieldsQueryValidator = getValidator(doctypefieldsQuerySchema, queryValidator)
export const doctypefieldsQueryResolver = resolve({})

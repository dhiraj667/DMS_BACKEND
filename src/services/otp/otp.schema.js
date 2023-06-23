// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const otpSchema = {
  $id: 'Otp',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'otp'],
  properties: {
    _id: ObjectIdSchema(),
    email: { type: 'string' },
    otp: { type: 'string' }
  }
}
export const otpValidator = getValidator(otpSchema, dataValidator)
export const otpResolver = resolve({})

export const otpExternalResolver = resolve({})

// Schema for creating new data
export const otpDataSchema = {
  $id: 'OtpData',
  type: 'object',
  additionalProperties: false,
  required: ['otp'],
  properties: {
    ...otpSchema.properties
  }
}
export const otpDataValidator = getValidator(otpDataSchema, dataValidator)
export const otpDataResolver = resolve({})

// Schema for updating existing data
export const otpPatchSchema = {
  $id: 'OtpPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...otpSchema.properties
  }
}
export const otpPatchValidator = getValidator(otpPatchSchema, dataValidator)
export const otpPatchResolver = resolve({})

// Schema for allowed query properties
export const otpQuerySchema = {
  $id: 'OtpQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(otpSchema.properties)
  }
}
export const otpQueryValidator = getValidator(otpQuerySchema, queryValidator)
export const otpQueryResolver = resolve({})

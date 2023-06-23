// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const forgetPasswordSchema = {
  $id: 'ForgetPassword',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'email', 'newPassword', 'confirmPassword'],
  properties: {
    id: { type: 'number' },
    email: { type: 'string' },
    newPassword: { type: 'string' },
    confirmPassword: { type: 'string' }
  }
}
export const forgetPasswordValidator = getValidator(forgetPasswordSchema, dataValidator)
export const forgetPasswordResolver = resolve({})

export const forgetPasswordExternalResolver = resolve({})

// Schema for creating new data
export const forgetPasswordDataSchema = {
  $id: 'ForgetPasswordData',
  type: 'object',
  additionalProperties: false,
  required: ['email', 'newPassword', 'confirmPassword'],
  properties: {
    ...forgetPasswordSchema.properties
  }
}
export const forgetPasswordDataValidator = getValidator(forgetPasswordDataSchema, dataValidator)
export const forgetPasswordDataResolver = resolve({})

// Schema for updating existing data
export const forgetPasswordPatchSchema = {
  $id: 'ForgetPasswordPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...forgetPasswordSchema.properties
  }
}
export const forgetPasswordPatchValidator = getValidator(forgetPasswordPatchSchema, dataValidator)
export const forgetPasswordPatchResolver = resolve({})

// Schema for allowed query properties
export const forgetPasswordQuerySchema = {
  $id: 'ForgetPasswordQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(forgetPasswordSchema.properties)
  }
}
export const forgetPasswordQueryValidator = getValidator(forgetPasswordQuerySchema, queryValidator)
export const forgetPasswordQueryResolver = resolve({})

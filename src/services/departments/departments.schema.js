// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const departmentsSchema = {
  $id: 'Departments',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'departmentName'],
  properties: {
    _id: ObjectIdSchema(),
    departmentName: { type: 'string' }
  }
}
export const departmentsValidator = getValidator(departmentsSchema, dataValidator)
export const departmentsResolver = resolve({})

export const departmentsExternalResolver = resolve({})

// Schema for creating new data
export const departmentsDataSchema = {
  $id: 'DepartmentsData',
  type: 'object',
  additionalProperties: false,
  required: ['departmentName'],
  properties: {
    ...departmentsSchema.properties
  }
}
export const departmentsDataValidator = getValidator(departmentsDataSchema, dataValidator)
export const departmentsDataResolver = resolve({})

// Schema for updating existing data
export const departmentsPatchSchema = {
  $id: 'DepartmentsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...departmentsSchema.properties
  }
}
export const departmentsPatchValidator = getValidator(departmentsPatchSchema, dataValidator)
export const departmentsPatchResolver = resolve({})

// Schema for allowed query properties
export const departmentsQuerySchema = {
  $id: 'DepartmentsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(departmentsSchema.properties)
  }
}
export const departmentsQueryValidator = getValidator(departmentsQuerySchema, queryValidator)
export const departmentsQueryResolver = resolve({})

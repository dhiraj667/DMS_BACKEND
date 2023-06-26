// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  departmentsDataValidator,
  departmentsPatchValidator,
  departmentsQueryValidator,
  departmentsResolver,
  departmentsExternalResolver,
  departmentsDataResolver,
  departmentsPatchResolver,
  departmentsQueryResolver
} from './departments.schema.js'
import { DepartmentsService, getOptions } from './departments.class.js'
import { departmentsPath, departmentsMethods } from './departments.shared.js'
import { departmentsSchema } from './departments.model.js'
import validate from 'feathers-validate-joi'

export * from './departments.class.js'
export * from './departments.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const departments = (app) => {
  // Register our service on the Feathers application
  app.use(departmentsPath, new DepartmentsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: departmentsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(departmentsPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(departmentsExternalResolver),
        schemaHooks.resolveResult(departmentsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(departmentsQueryValidator),
        schemaHooks.resolveQuery(departmentsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        authenticate('jwt'),
        validate.form(departmentsSchema, { abortEarly: false }),
        schemaHooks.validateData(departmentsDataValidator),
        schemaHooks.resolveData(departmentsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(departmentsPatchValidator),
        schemaHooks.resolveData(departmentsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import validate from 'feathers-validate-joi'
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  doctypesDataValidator,
  doctypesPatchValidator,
  doctypesQueryValidator,
  doctypesResolver,
  doctypesExternalResolver,
  doctypesDataResolver,
  doctypesPatchResolver,
  doctypesQueryResolver
} from './doctypes.schema.js'
import { DoctypesService, getOptions } from './doctypes.class.js'
import { doctypesPath, doctypesMethods } from './doctypes.shared.js'
import { doctypesSchema } from './doctypes.models.js'
import { FetchDepartment } from './hooks/FetchDepartment.js'

export * from './doctypes.class.js'
export * from './doctypes.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const doctypes = (app) => {
  // Register our service on the Feathers application
  app.use(doctypesPath, new DoctypesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: doctypesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(doctypesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(doctypesExternalResolver),
        schemaHooks.resolveResult(doctypesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(doctypesQueryValidator),
        schemaHooks.resolveQuery(doctypesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        validate.form(doctypesSchema, { abortEarly: false }),
        FetchDepartment(),
        schemaHooks.validateData(doctypesDataValidator),
        schemaHooks.resolveData(doctypesDataResolver)
      ],
      patch: [
        // validate.form(doctypesSchema,{abortEarly:false}),
        FetchDepartment(),
        schemaHooks.validateData(doctypesPatchValidator),
        schemaHooks.resolveData(doctypesPatchResolver)
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

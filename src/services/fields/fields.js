// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import validate from 'feathers-validate-joi'
import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  fieldsDataValidator,
  fieldsPatchValidator,
  fieldsQueryValidator,
  fieldsResolver,
  fieldsExternalResolver,
  fieldsDataResolver,
  fieldsPatchResolver,
  fieldsQueryResolver
} from './fields.schema.js'
import { FieldsService, getOptions } from './fields.class.js'
import { fieldsPath, fieldsMethods } from './fields.shared.js'
import { fieldsSchema } from './fields.models.js'
import { createFieldObject } from './hooks/createfieldsObject.js'

export * from './fields.class.js'
export * from './fields.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const fields = (app) => {
  // Register our service on the Feathers application
  app.use(fieldsPath, new FieldsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: fieldsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(fieldsPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(fieldsExternalResolver),
        schemaHooks.resolveResult(fieldsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(fieldsQueryValidator), schemaHooks.resolveQuery(fieldsQueryResolver)],
      find: [],
      get: [],
      create: [
        validate.form(fieldsSchema, { abortEarly: false }),
        createFieldObject(),
        schemaHooks.validateData(fieldsDataValidator),
        schemaHooks.resolveData(fieldsDataResolver)
      ],
      patch: [
        // validate.form(fieldsSchema, { abortEarly: false }),
        createFieldObject(),
        schemaHooks.validateData(fieldsPatchValidator),
        schemaHooks.resolveData(fieldsPatchResolver)
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

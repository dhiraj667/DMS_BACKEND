// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  doctypefieldsDataValidator,
  doctypefieldsPatchValidator,
  doctypefieldsQueryValidator,
  doctypefieldsResolver,
  doctypefieldsExternalResolver,
  doctypefieldsDataResolver,
  doctypefieldsPatchResolver,
  doctypefieldsQueryResolver
} from './doctypefields.schema.js'
import { DoctypefieldsService, getOptions } from './doctypefields.class.js'
import { doctypefieldsPath, doctypefieldsMethods } from './doctypefields.shared.js'
import validate from 'feathers-validate-joi'
import { doctypefieldsSchema } from './doctypefields.model.js'
import { fetchDoctype } from './hooks/fetchDoctype.js'
import { fetchField } from './hooks/fetchField.js'
import { FetchDepartment } from '../doctypes/hooks/FetchDepartment.js'
import { findByDocAndDept } from './hooks/findByDocTypeAndDept.js'

export * from './doctypefields.class.js'
export * from './doctypefields.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const doctypefields = (app) => {
  // Register our service on the Feathers application
  app.use(doctypefieldsPath, new DoctypefieldsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: doctypefieldsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(doctypefieldsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(doctypefieldsExternalResolver),
        schemaHooks.resolveResult(doctypefieldsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(doctypefieldsQueryValidator),
        schemaHooks.resolveQuery(doctypefieldsQueryResolver)
      ],
      find: [findByDocAndDept()],
      get: [],
      create: [
        // authenticate('jwt'),
        validate.form(doctypefieldsSchema, { abortEarly: false }),
        fetchDoctype(),
        fetchField(),
        FetchDepartment(),
        schemaHooks.validateData(doctypefieldsDataValidator),
        schemaHooks.resolveData(doctypefieldsDataResolver)
      ],
      patch: [
        fetchDoctype(),
        fetchField(),
        FetchDepartment(),
        schemaHooks.validateData(doctypefieldsPatchValidator),
        schemaHooks.resolveData(doctypefieldsPatchResolver)
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

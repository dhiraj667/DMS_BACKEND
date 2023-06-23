// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  forgetPasswordDataValidator,
  forgetPasswordPatchValidator,
  forgetPasswordQueryValidator,
  forgetPasswordResolver,
  forgetPasswordExternalResolver,
  forgetPasswordDataResolver,
  forgetPasswordPatchResolver,
  forgetPasswordQueryResolver
} from './forget-password.schema.js'
import { ForgetPasswordService, getOptions } from './forget-password.class.js'
import { forgetPasswordPath, forgetPasswordMethods } from './forget-password.shared.js'
import { changePassword } from './hooks/change-password.js'
import { mailSender } from '../../hooks/mailSender.js'

export * from './forget-password.class.js'
export * from './forget-password.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const forgetPassword = (app) => {
  // Register our service on the Feathers application
  app.use(forgetPasswordPath, new ForgetPasswordService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: forgetPasswordMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(forgetPasswordPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(forgetPasswordExternalResolver),
        schemaHooks.resolveResult(forgetPasswordResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(forgetPasswordQueryValidator),
        schemaHooks.resolveQuery(forgetPasswordQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        changePassword(),
        schemaHooks.validateData(forgetPasswordDataValidator),
        schemaHooks.resolveData(forgetPasswordDataResolver)
      ],
      patch: [
        schemaHooks.validateData(forgetPasswordPatchValidator),
        schemaHooks.resolveData(forgetPasswordPatchResolver)
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

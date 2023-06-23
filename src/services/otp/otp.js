// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  otpDataValidator,
  otpPatchValidator,
  otpQueryValidator,
  otpResolver,
  otpExternalResolver,
  otpDataResolver,
  otpPatchResolver,
  otpQueryResolver
} from './otp.schema.js'
import { OtpService, getOptions } from './otp.class.js'
import { otpPath, otpMethods } from './otp.shared.js'

export * from './otp.class.js'
export * from './otp.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const otp = (app) => {
  // Register our service on the Feathers application
  app.use(otpPath, new OtpService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: otpMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(otpPath).hooks({
    // around: {
    //   all: [schemaHooks.resolveExternal(otpExternalResolver), schemaHooks.resolveResult(otpResolver)]
    // },
    before: {
      // all: [schemaHooks.validateQuery(otpQueryValidator), schemaHooks.resolveQuery(otpQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(otpDataValidator), schemaHooks.resolveData(otpDataResolver)],
      patch: [schemaHooks.validateData(otpPatchValidator), schemaHooks.resolveData(otpPatchResolver)],
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

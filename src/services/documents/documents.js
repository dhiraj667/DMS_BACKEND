// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import multer from 'multer'
import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  documentsDataValidator,
  documentsPatchValidator,
  documentsQueryValidator,
  documentsResolver,
  documentsExternalResolver,
  documentsDataResolver,
  documentsPatchResolver,
  documentsQueryResolver
} from './documents.schema.js'
import { DocumentsService, getOptions } from './documents.class.js'
import { documentsPath, documentsMethods } from './documents.shared.js'
import validate from 'feathers-validate-joi'
// import { documentsSchema } from './documents.model.js'
import { date } from './hooks/date.js'
import { dcn } from './hooks/dcn.js'
import { uploadFile } from './hooks/uploadFile.js'
import { createIndexingInfo } from './hooks/createIndexingInfo.js'

export * from './documents.class.js'
export * from './documents.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const documents = (app) => {
  // Register our service on the Feathers application

  app.use(
    documentsPath,

    multer({
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'src/uploads')
        },
        filename: function (req, file, cb) {
          const ext = file.originalname.split('.')
          console.log(ext[1])
          cb(null, file.originalname, +'.' + ext[1])
        }
      })
    }).single('file'),
    (req, res, next) => {
      req.feathers.file = req.file
      next()
    },

    new DocumentsService(getOptions(app)),
    {
      // A list of all methods this service exposes externally
      methods: documentsMethods,
      // You can add additional custom events to be sent to clients here
      events: []
    }
  )
  // Initialize hooks
  app.service(documentsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(documentsExternalResolver),
        schemaHooks.resolveResult(documentsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(documentsQueryValidator),
        schemaHooks.resolveQuery(documentsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        // authenticate('jwt'),
        dcn(),
        uploadFile(),
        date(),
        createIndexingInfo(),
        schemaHooks.validateData(documentsDataValidator),
        schemaHooks.resolveData(documentsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(documentsPatchValidator),
        schemaHooks.resolveData(documentsPatchResolver)
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

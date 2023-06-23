// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import { otpClient } from './services/otp/otp.shared.js'

import { forgetPasswordClient } from './services/forget-password/forget-password.shared.js'

import { fieldsClient } from './services/fields/fields.shared.js'

import { doctypesClient } from './services/doctypes/doctypes.shared.js'

import { userClient } from './services/users/users.shared.js'
import { documentsClient } from './services/documents/documents.shared.js'

import { doctypefieldsClient } from './services/doctypefields/doctypefields.shared.js'

import { departmentsClient } from './services/departments/departments.shared.js'

/**
 * Returns a  client for the dmsBackend app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = (connection, authenticationOptions = {}) => {
  const client = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)

  client.configure(doctypesClient)

  client.configure(fieldsClient)

  client.configure(departmentsClient)

  client.configure(doctypefieldsClient)

  client.configure(documentsClient)

  client.configure(forgetPasswordClient)

  client.configure(otpClient)

  return client
}

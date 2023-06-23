export const doctypefieldsPath = 'doctypefields'

export const doctypefieldsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const doctypefieldsClient = (client) => {
  const connection = client.get('connection')

  client.use(doctypefieldsPath, connection.service(doctypefieldsPath), {
    methods: doctypefieldsMethods
  })
}

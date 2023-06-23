export const doctypesPath = 'doctypes'

export const doctypesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const doctypesClient = (client) => {
  const connection = client.get('connection')

  client.use(doctypesPath, connection.service(doctypesPath), {
    methods: doctypesMethods
  })
}

export const fieldsPath = 'fields'

export const fieldsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const fieldsClient = (client) => {
  const connection = client.get('connection')

  client.use(fieldsPath, connection.service(fieldsPath), {
    methods: fieldsMethods
  })
}

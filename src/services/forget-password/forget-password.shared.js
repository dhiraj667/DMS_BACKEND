export const forgetPasswordPath = 'forget-password'

export const forgetPasswordMethods = ['find', 'get', 'create', 'patch', 'remove']

export const forgetPasswordClient = (client) => {
  const connection = client.get('connection')

  client.use(forgetPasswordPath, connection.service(forgetPasswordPath), {
    methods: forgetPasswordMethods
  })
}

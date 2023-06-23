export const otpPath = 'otp'

export const otpMethods = ['find', 'get', 'create', 'patch', 'remove']

export const otpClient = (client) => {
  const connection = client.get('connection')

  client.use(otpPath, connection.service(otpPath), {
    methods: otpMethods
  })
}

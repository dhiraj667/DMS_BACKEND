export const departmentsPath = 'departments'

export const departmentsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const departmentsClient = (client) => {
  const connection = client.get('connection')

  client.use(departmentsPath, connection.service(departmentsPath), {
    methods: departmentsMethods
  })
}

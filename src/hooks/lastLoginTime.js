import { NotFound } from '@feathersjs/errors'
export const lastLogin = (app) => {
  app.on('login', async (data) => {
    const userService = app.service('users')
    const user = await userService.get(data.user._id)
    if (!user) throw new NotFound('user Not Found')
    await userService.patch(user._id, { lastLoggedIn: new Date().toString() })
  })
}

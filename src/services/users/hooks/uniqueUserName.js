export const fetchUniqueUserName = () => {
  return async (context) => {
    const userService = context.app.service('users')
    const user = await userService.find({ query: { userName: context.data.userName } })
    if (!(user.data.length == 0)) throw new Error('user already exist, Try different name')
    return context
  }
}

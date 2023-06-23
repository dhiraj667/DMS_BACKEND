export const date = () => {
  return async (context) => {
    const date = new Date()
    context.data.date = date
    return context
  }
}
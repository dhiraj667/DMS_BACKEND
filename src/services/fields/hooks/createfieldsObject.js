export const createFieldObject = () => {
  return async (context) => {
    const fieldName = {
      name: context.data.name,
      label: context.data.label,
      input: context.data.input
    }
    context.data.fieldName = fieldName
    delete context.data.name
    delete context.data.label
    delete context.data.input
    return context
  }
}

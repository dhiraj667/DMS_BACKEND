export const findByDocAndDept = () => {
  return (context) => {
    console.log(context.params.query)
    const departmentNameRegeX = new RegExp(context.params.query.departmentName, 'i')
    context.params.query['department.departmentName'] = { $regex: departmentNameRegeX }
    delete context.params.query.departmentName

    const doctypeRegeX = new RegExp(context.params.query.doctype, 'i')
    context.params.query['doctype.docType'] = { $regex: doctypeRegeX }
    delete context.params.query.doctype
    return context
  }
}

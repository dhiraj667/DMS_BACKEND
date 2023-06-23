export const createIndexingInfo = () => {
  return (context) => {
    const documentName = context.data.doctype
    const path = context.data.path
    const date = context.data.date
    const dcn = context.data.dcn
    const driveFile_Id = context.data.driveFile_Id
    const url = context.data.local_Url
    const local_Url = url.slice(5)

    //deleteing
    delete context.data.date
    delete context.data.path
    delete context.data.dcn
    delete context.data.doctype
    delete context.data.driveFile_Id
    delete context.data.local_Url

    const indexingInfo = { ...context.data } //data from index addDoc from indexing info form
    context.data = {}
    console.log(context.data)

    // creating new context as we require

    context.data.documentName = documentName
    context.data.path = path
    context.data.date = date
    context.data.dcn = dcn
    context.data.driveFile_Id = driveFile_Id
    context.data.local_Url = local_Url
    context.data.indexingInfo = indexingInfo

    return context
  }
}

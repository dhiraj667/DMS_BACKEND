export const fetchDoctype = ()=>{
    return async(context)=>{
        const doctypeService=context.app.service('/doctypes')
        const doctype =await doctypeService.get(context.data.doctypeId)
        if(!doctype) throw new Error("Department Id which you provided is not present in DB")
        context.data.doctype=doctype;
        delete context.data.doctypeId;
        return context
    }
}
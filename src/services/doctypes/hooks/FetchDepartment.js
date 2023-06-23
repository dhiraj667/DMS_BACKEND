export const FetchDepartment=()=>{
    return async (context)=>{
        const departmentsService=context.app.service('/departments')
        const department =await departmentsService.get(context.data.departmentId)
        if(!department) throw new Error("Department Id which you provided is not present in DB")
        context.data.department=department;
        delete context.data.departmentId;
        return context
    }
}
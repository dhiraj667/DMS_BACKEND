export const fetchField = ()=>{
    return async(context)=>{
        const fieldService = context.app.service("fields");
        const field = await fieldService.get(context.data.fieldId);
        if(!field) throw new Error("Field ID not found");
        context.data.field= field;
        delete context.data.fieldId;
        return context;
    }
}


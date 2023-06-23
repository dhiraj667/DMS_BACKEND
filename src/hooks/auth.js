// import { Forbidden } from '@feathersjs/errors'

// export const admin = () => {
//   return async (context) => {
//     if (!(context.params.user.role === 'Admin')) throw new Forbidden({ message: 'Access Forbidden' })
//     return context
//   }
// }

// export const indexer = () => {
//   return async (context) => {
//     if (!(context.params.user.role === 'indexer')) throw new Forbidden({ message: 'Access Forbidden' })
//     return context
//   }
// }

// export const generalUser = () => {
//   return async (context) => {
//     if (!(context.params.user.role === 'generalUser')) throw new Forbidden({ message: 'Access Forbidden' })
//     return context
//   }
// }

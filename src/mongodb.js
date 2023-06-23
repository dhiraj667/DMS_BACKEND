// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import { MongoClient, ServerApiVersion } from 'mongodb'

export const mongodb = (app) => {
  // const connection = app.get('mongodb')
  const connection = process.env.DATABASE || app.get('mongodb')
  // const database = new URL(connection).pathname.substring(1)
  // const connection =
  //   ''
  const mongoClient = MongoClient.connect(connection, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
      useNewUrlParser: true
    }
  })
    .then((client) => client.db('DMS'))
    .catch((err) => {
      console.log(err.message)
    })

  app.set('mongodbClient', mongoClient)
}

import { google } from 'googleapis'
// import path from 'path'
import * as fs from 'fs'
// import { fileURLToPath } from 'url'

export const uploadFile = () => {
  return async (context) => {
    // const __filename = fileURLToPath(import.meta.url)
    // const __dirname = path.dirname(__filename)
    const client_ID = '880259044402-hfi17gskf26gfo5ajudg52c1m2l7kvv0.apps.googleusercontent.com'
    const client_Secret = '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'
    const REDIRECT_URL = 'https://developers.google.com/oauthplayground'

    const REFRESH_TOEKN =
      '1//04T7hDRJdO6RfCgYIARAAGAQSNwF-L9IrL_3ZC88hw6OXfSgh3FHP0xH5JkX98mEfB8rZKOSGvPTxa92_gt54iVIYv1Oh11F0Vlw'

    const oauth2Client = new google.auth.OAuth2(client_ID, client_Secret, REDIRECT_URL)

    oauth2Client.setCredentials({ refresh_token: REFRESH_TOEKN })

    const drive = google.drive({
      version: 'v3',
      auth: oauth2Client
    })

    const filePath = `src/uploads/${context.params.file.filename}`
    let driveFile_Id
    try {
      let response = await drive.files.create({
        requestBody: {
          name: context.data.dcn,
          mimeType: context.params.file.mimetype
        },
        media: {
          mimeType: context.params.file.mimetype,
          body: fs.createReadStream(filePath)
        }
      })
      driveFile_Id = response.data.id
    } catch (error) {
      console.log(error.message)
    }

    let file_Url
    try {
      await drive.permissions.create({
        fileId: driveFile_Id,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      })
      const response = await drive.files.get({
        fileId: driveFile_Id,
        fields: 'webViewLink, webContentLink'
      })
      file_Url = response.data
    } catch (error) {
      console.log(error.message)
    }

    delete context.data.file
    context.data.driveFile_Id = driveFile_Id
    context.data.path = file_Url.webViewLink
    return context
  }
}

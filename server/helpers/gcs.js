const { Storage } = require('@google-cloud/storage');
const CLOUD_BUCKET = process.env.cloud_bucket;

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    keyFilename: process.env.FILE_PATH
})

const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

function uploadToGcs(payload) {
    const gcsname = Date.now() + payload.originalname
    const file = bucket.file(gcsname)
  
    const stream = file.createWriteStream({
      metadata: {
        contentType: payload.mimetype
      }
    })
    
    stream.on('error', (err) => {
      payload.cloudStorageError = err
      return err
    })
  
    stream.on('finish', () => {
      payload.cloudStorageObject = gcsname
      file.makePublic().then(() => {
        return getPublicUrl(gcsname)
      })
    })
    stream.end(req.file.buffer)
}
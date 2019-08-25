const { Storage } = require('@google-cloud/storage')
const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.FILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
    if(req.body.image && !req.file) {
        next()
    }
    else if (!req.file) {
        throw({
            status: 406,
            message: "Image cannot be empty"
        })
    }
    else if (!req.file.mimetype.includes('image')) {
        throw({
            status: 406,
            message: "File type should be image"
        })
    }
    else {
          const gcsname = Date.now() + req.file.originalname
          const file = bucket.file(gcsname)
        
          const stream = file.createWriteStream({
            metadata: {
              contentType: req.file.mimetype
            }
          })
        
          stream.on('error', (err) => {
            req.file.cloudStorageError = err
            next(err)
          })
        
          stream.on('finish', () => {
            req.file.cloudStorageObject = gcsname
            file.makePublic().then(() => {
              req.body.image = getPublicUrl(gcsname)
              next()
            })
          })
        
          stream.end(req.file.buffer)
    }
}

const Multer = require('multer'),
      multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        }
        // dest: '../images'
      })

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}
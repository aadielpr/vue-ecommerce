const { Storage } = require('@google-cloud/storage')
const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.FILE_PATH
})

const bucket = storage.bucket(CLOUD_BUCKET)
module.exports = (req, res, next) => {
    const file = bucket.file(req.file)
    file.delete()
    .then(() => {
        res.status(200).json("Delete Success")
    })
    .catch(next)
}
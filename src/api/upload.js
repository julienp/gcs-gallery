const { Storage } = require("@google-cloud/storage")

const LOCAL = process.env.LOCAL
const GOOGLE_PROJECT_ID = process.env.GOOGLE_PROJECT_ID
const GOOGLE_SA_CLIENT_EMAIL = process.env.GOOGLE_SA_CLIENT_EMAIL
const GOOGLE_SA_PRIVATE_KEY = LOCAL
  ? process.env.GOOGLE_SA_PRIVATE_KEY
  : JSON.parse(`"${process.env.GOOGLE_SA_PRIVATE_KEY}"`)
const BUCKET = process.env.BUCKET

console.log({
  GOOGLE_PROJECT_ID,
  GOOGLE_SA_CLIENT_EMAIL,
  GOOGLE_SA_PRIVATE_KEY:
    GOOGLE_SA_PRIVATE_KEY.slice(0, 30) +
    `...` +
    GOOGLE_SA_PRIVATE_KEY.slice(-30),
  BUCKET,
})

const storage = new Storage({
  projectId: GOOGLE_PROJECT_ID,
  credentials: {
    project_id: GOOGLE_PROJECT_ID,
    location_id: "us-central-1",
    client_email: GOOGLE_SA_CLIENT_EMAIL,
    private_key: GOOGLE_SA_PRIVATE_KEY,
  },
})

const bucket = storage.bucket(BUCKET)

async function handler(req, res) {
  console.log(`in the function`)
  const [files] = await bucket.getFiles()
  console.log({ files })
  res.json({ files })
  res.end(200)
}

export default handler

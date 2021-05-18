const { Storage } = require("@google-cloud/storage")

const GOOGLE_PROJECT_ID = process.env.GOOGLE_PROJECT_ID
const GOOGLE_SA_CLIENT_EMAIL = process.env.GOOGLE_SA_CLIENT_EMAIL
const GOOGLE_SA_PRIVATE_KEY = process.env.GOOGLE_SA_PRIVATE_KEY
const BUCKET = process.env.BUCKET

async function handler(req, res) {
  const env = JSON.stringify(process.env)
  const env2 = JSON.stringify(process[`env`])
  console.log({ env })
  console.log({ env2 })

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
  const [files] = await storage.bucket(bucket).getFiles()
  console.log({ files })
  res.json({ files })
}

export default handler

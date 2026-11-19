import { MongoClient, ObjectId } from 'mongodb'

const DEFAULT_URI = 'mongodb://127.0.0.1:27017'
const DEFAULT_DB = 'becon_field'
const COLLECTION = 'leads'

let clientPromise = null
let cachedUri = null

function connectionString(env = {}) {
  return env.MONGODB_URI || DEFAULT_URI
}

function databaseName(env = {}) {
  return env.MONGODB_DB || DEFAULT_DB
}

/**
 * Lazily connect to MongoDB and cache the client. Throws if the database
 * cannot be reached so callers can degrade gracefully.
 */
export async function getDb(env = {}) {
  const uri = connectionString(env)
  if (!clientPromise || cachedUri !== uri) {
    cachedUri = uri
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    })
    clientPromise = client
      .connect()
      .then((connected) => connected.db(databaseName(env)))
      .catch((error) => {
        clientPromise = null
        cachedUri = null
        // Log details server-side only — never include the URI in a response,
        // because it can contain database credentials.
        console.error('[db] connection failed:', error.message)
        const friendly = new Error(
          'Cannot reach the database. Check MONGODB_URI and MongoDB network access.',
        )
        friendly.statusCode = 503
        throw friendly
      })
  }
  return clientPromise
}

export async function pingDatabase(env = {}) {
  const db = await getDb(env)
  await db.command({ ping: 1 })
  return true
}

function serialize(doc) {
  return {
    id: doc._id.toString(),
    name: doc.name || '',
    email: doc.email || '',
    phone: doc.phone || '',
    service: doc.service || '',
    date: doc.date || '',
    time: doc.time || '',
    details: doc.details || '',
    status: doc.status || 'pending',
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : doc.createdAt,
    reviewedAt: doc.reviewedAt instanceof Date ? doc.reviewedAt.toISOString() : doc.reviewedAt ?? null,
  }
}

export async function saveLead(env, lead) {
  const db = await getDb(env)
  const doc = {
    name: lead.name,
    email: lead.email,
    phone: lead.phone || '',
    service: lead.service,
    date: lead.date || '',
    time: lead.time || '',
    details: lead.details || '',
    status: 'pending',
    createdAt: new Date(),
    reviewedAt: null,
  }
  const result = await db.collection(COLLECTION).insertOne(doc)
  return { id: result.insertedId.toString() }
}

export async function listLeads(env, { status = 'all' } = {}) {
  const db = await getDb(env)
  const filter = status && status !== 'all' ? { status } : {}
  const docs = await db
    .collection(COLLECTION)
    .find(filter)
    .sort({ createdAt: -1 })
    .limit(500)
    .toArray()
  return docs.map(serialize)
}

export async function countLeads(env, { status = 'all' } = {}) {
  const db = await getDb(env)
  const filter = status && status !== 'all' ? { status } : {}
  return db.collection(COLLECTION).countDocuments(filter)
}

export async function updateLeadStatus(env, id, status) {
  if (!ObjectId.isValid(id)) {
    const error = new Error('Unknown lead.')
    error.statusCode = 404
    throw error
  }
  const db = await getDb(env)
  const update = {
    $set: {
      status,
      reviewedAt: status === 'reviewed' ? new Date() : null,
    },
  }
  const result = await db
    .collection(COLLECTION)
    .findOneAndUpdate({ _id: new ObjectId(id) }, update, { returnDocument: 'after' })
  const doc = result?.value ?? result
  if (!doc) {
    const error = new Error('Unknown lead.')
    error.statusCode = 404
    throw error
  }
  return serialize(doc)
}

export async function deleteLead(env, id) {
  if (!ObjectId.isValid(id)) {
    const error = new Error('Unknown lead.')
    error.statusCode = 404
    throw error
  }
  const db = await getDb(env)
  const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) })
  if (result.deletedCount === 0) {
    const error = new Error('Unknown lead.')
    error.statusCode = 404
    throw error
  }
  return { ok: true }
}

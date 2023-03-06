import low, { LowdbSync } from 'lowdb'
import { join } from 'path'
import FileSync from 'lowdb/adapters/FileSync'

type Database = {
  posts: Post[]
}

type Post = {
  id: string
  title: string
  body: string
}

const adapter = new FileSync<Database>(join(process.cwd(), 'db.json'))
const db: LowdbSync<Database> = low(adapter)

db.defaults({ posts: [] }).write()

export default db

import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../lib/db'

type Post = {
  id: string
  title: string
  body: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | Post>
) {
  if (req.method === 'GET') {
    const posts = db.get('posts').value()
    res.status(200).json(posts)
  } else if (req.method === 'POST') {
    const { title, body } = req.body
    const post: Post = {
      id: Date.now().toString(),
      title,
      body,
    }
    db.get('posts')
      .push(post)
      .write()
    res.status(201).json(post)
  } else {
    res.status(405).json([])
  }
}
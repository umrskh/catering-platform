// pages/api/caterers/[id].js

import path from 'path'
import fs from 'fs'

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'caterers.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const caterer = data.find(c => c.id === parseInt(req.query.id))
  if (!caterer) return res.status(404).json({ message: 'Not found' })
  res.status(200).json(caterer)
}
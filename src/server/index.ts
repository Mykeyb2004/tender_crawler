import express from 'express'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const app = express()
app.use(express.json())

const dbPromise = open({
  filename: './database.sqlite',
  driver: sqlite3.Database
})

// Initialize database
dbPromise.then(async (db) => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tender (
      id INTEGER PRIMARY KEY,
      href TEXT UNIQUE,
      title TEXT,
      area TEXT,
      post_date DATE,
      has_crawled INTEGER DEFAULT 0,
      html TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      weight REAL(5, 2) DEFAULT NULL,
      title_weight REAL(5, 2) DEFAULT NULL
    )
  `)
})

// CRUD operations
app.get('/api/tenders', async (req, res) => {
  const db = await dbPromise
  const tenders = await db.all('SELECT * FROM tender')
  res.json(tenders)
})

app.get('/api/tenders/:id', async (req, res) => {
  const db = await dbPromise
  const tender = await db.get('SELECT * FROM tender WHERE id = ?', req.params.id)
  if (tender) {
    res.json(tender)
  } else {
    res.status(404).json({ error: 'Tender not found' })
  }
})

app.post('/api/tenders', async (req, res) => {
  const db = await dbPromise
  const { href, title, area, post_date } = req.body
  try {
    const result = await db.run(
      'INSERT INTO tender (href, title, area, post_date) VALUES (?, ?, ?, ?)',
      [href, title, area, post_date]
    )
    res.status(201).json({ id: result.lastID })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.put('/api/tenders/:id', async (req, res) => {
  const db = await dbPromise
  const { href, title, area, post_date } = req.body
  try {
    await db.run(
      'UPDATE tender SET href = ?, title = ?, area = ?, post_date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [href, title, area, post_date, req.params.id]
    )
    res.json({ message: 'Tender updated successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.delete('/api/tenders/:id', async (req, res) => {
  const db = await dbPromise
  await db.run('DELETE FROM tender WHERE id = ?', req.params.id)
  res.json({ message: 'Tender deleted successfully' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
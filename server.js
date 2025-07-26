const express = require('express')
const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'

const app = express()
app.use(express.json())

let db, trips, expenses

async function connectToMongoDB() {
    try {
        const client = new MongoClient(url)
        await client.connect()
        db = client.db('tripcost')
        trips = db.collection('trips')
        expenses = db.collection('expenses')
        console.log('Connected to MongoDB')
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err)
        process.exit(1)
    }
}

connectToMongoDB()

app.post('/trip', async (req, res) => {
    try {
        const name = req.body.name
        const result = await trips.insertOne({ name: name })
        console.log(result)
        res.status(200).json({ ok: true })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})
app.get('/trips', async (req, res) => {
    try {
        const items = await trips.find().toArray()
        res.status(200).json({ trips: items })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})
app.post('/expense', async (req, res) => {
    try {
        const result = await expenses.insertOne({
            trip: req.body.trip,
            date: req.body.date,
            amount: req.body.amount,
            category: req.body.category,
            description: req.body.description
        })
        res.status(200).json({ ok: true })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})

app.get('/expenses', async (req, res) => {
    try {
        const items = await expenses.find({ trip: req.body.trip }).toArray()
        res.status(200).json({ expenses: items })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})

app.listen(3000, () => console.log('Server ready'))





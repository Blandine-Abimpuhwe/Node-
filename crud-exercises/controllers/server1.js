import express from 'express'
import mongoose from 'mongoose'
import items from '../models/items'


const app = express()

//middleware to parse incoming JSON request bodies
app.use(express.json())

//MongoDB connection
const dbURI= 'mongodb+srv://blandine0045_db_user:9Xbypg8lkXwytFZo@node-practice.hh8v4qs.mongodb.net/?appName=node-practice'

//connect to MongoDB
await mongoose.connect(dbURI)
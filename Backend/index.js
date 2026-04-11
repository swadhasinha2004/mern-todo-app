require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

// Health check
app.get("/", (req, res) => {
  res.send("API is running ")
})

// Routes
app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})

app.post("/add", (req, res) => {
  const task = req.body.task

  TodoModel.create({
    task,
    done: false
  })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})

app.put('/update/:id', (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndUpdate(id, { done: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
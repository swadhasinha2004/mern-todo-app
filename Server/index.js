const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
   TodoModel.findByIdAndUpdate({_id: id}, {done: true})
   .then(result => res.json(result))
   .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

const path = require("path");

// absolute root directory (Render safe)
const root = process.cwd();

// correct React build location
const frontendPath = path.join(root, "todolist", "dist");

// serve static files
app.use(express.static(frontendPath));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
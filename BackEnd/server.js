// Importing required modules
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const path = require('path');

// Serving static files from the build directory
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

// Enable CORS
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configuring body-parser middleware for handling request bodies
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connecting to MongoDB using Mongoose
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://cormacmangan22:pass@cluster0.rphffbk.mongodb.net/');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Defining a task schema for MongoDB
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String
});

// Creating a model based on the task schema
const taskModel = mongoose.model('645634fggh', taskSchema);

// Handling DELETE requests to delete a task by ID
app.delete('/api/task/:id', async (req, res) => {
    console.log("Delete: " + req.params.id);
    let task = await taskModel.findByIdAndDelete(req.params.id);
    res.send(task);
});

// Handling PUT requests to update a task by ID
app.put('/api/task/:id', async (req, res) => {
    console.log("Update: " + req.params.id);
    let task = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(task);
});

// Handling POST requests to create a new task
app.post('/api/task', (req, res) => {
    console.log(req.body);
    taskModel.create({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    })
    .then(() => { res.send("Task Created"); })
    .catch(() => { res.send("Task NOT Created"); });
});

// Handling GET requests to retrieve all tasks
app.get('/api/tasks', async (req, res) => {
    let tasks = await taskModel.find({});
    res.json(tasks);
});

// Handling GET requests to retrieve a task by ID
app.get('/api/task/:identifier', async (req, res) => {
    console.log(req.params.identifier);
    let task = await taskModel.findById(req.params.identifier);
    res.send(task);
});

// Handling all other routes by serving the React app's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
});

// Starting the server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

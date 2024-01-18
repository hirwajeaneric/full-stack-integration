require('dotenv').config();
const express = require('express');
const contactRouter = require('./routes/contact.routes');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
app.use(express.json());

var corsOptions = {
    origin: ['http://localhost:5173', 'https://192.168.196.82:5273', 'http://localhost:5173', 'https://127.0.0.1:5273'],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}

app.use(cors(corsOptions));

app.use('/api/v1/contactapp/', contactRouter);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(3000, () => {
        console.log(`Server running on port 3000...`);
    })
})
.catch(err => {
    console.error(err);
})
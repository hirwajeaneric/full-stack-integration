require('dotenv').config();
const express = require('express');
const contactRouter = require('./routes/contact.routes');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

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
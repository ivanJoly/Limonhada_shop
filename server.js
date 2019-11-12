// require("./config/config");

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const app = express();

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).array('images'));

app.use(require('./routes/index'));

mongoose.connect(
    process.env.MONGO_URI,
    { useUnifiedTopology: true, useNewUrlParser: true }
)
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
})
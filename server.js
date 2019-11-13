const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const app = express();

// --Settings--
app.set('port', process.env.PORT || 5000);

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}else{
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

// --Middlewares--
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

// --Routes--
app.use(require('./routes/index'));

// --Database--
require('./config/database');

// --Server--
app.listen(app.get('port'), () => {
    console.log(`Escuchando el puerto ${app.get('port')}`);
})
const mongoose = require('mongoose');
let urlDB;

if(process.env.NODE_ENV !== 'production'){
    urlDB = process.env.MONGO_URI_DEV
}else{
    urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB;

mongoose.connect(
    process.env.URLDB,
    { useUnifiedTopology: true, useNewUrlParser: true }
)
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));
mongoose.set('useCreateIndex', true);
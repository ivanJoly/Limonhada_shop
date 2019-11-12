const {Router} = require("express");
const router = Router();
const fs = require('fs-extra');

const Bag = require('../models/bags');

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


function deleteFiles(files, callback){
    var i = files.length;
    files.forEach(function(filepath){
        fs.unlink(filepath.path, function(err) {
        i--;
        if (err) {
            callback(err);
            return;
        } else if (i <= 0) {
            callback(null);
        }
        });
    });
}

router.post('/bags', async function(req, res) {
    const {name, price, description, alto, ancho, model} = req.body;
    let uploadImages;
    const slug = name.toLowerCase().replace(/ /g, '-');

    let sizeObj = {};
    sizeObj.alto = alto;
    sizeObj.ancho = ancho;

    let res_promises = req.files.map(file => new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file.path, { use_filename: true, unique_filename: false }, function (error, result) {
            if(error) reject(error)
            else resolve(result)
        })
    })
    )
    // Promise.all will fire when all promises are resolved 
    await Promise.all(res_promises)
    .then(result =>  {
        uploadImages = result;
        console.log('promise');
    })
    .catch((error) => {
        res.json({
            ok: false,
            err: error
        })
    })

    const bag = new Bag({
        name,
        slug,
        images: uploadImages,
        price,
        description,
        size: sizeObj,
        model
    })

    let newBag = await bag.save();

    deleteFiles(req.files, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('all files removed');
        }
      });

    res.json({
        ok:true,
        bags: newBag
    })
});

module.exports = router;
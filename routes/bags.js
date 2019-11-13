const {Router} = require("express");
const router = Router();

const Bags = require('../models/bags');
const cloudinary = require('../config/cloudinary');

const { deleteFiles } = require('../functions/functions');
const { verifyExist } = require('../middlewares/verifySlug');

router.post('/bags', verifyExist, async function(req, res) {
    const {name, price, description, model, slug, size} = req.body;

    let res_promises = req.files.map(file => new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file.path, { use_filename: true, unique_filename: false }, function (error, result) {
            if(error) reject(error)
            else resolve(result)
        })
    })
    )

    await Promise.all(res_promises)
    .then(result =>  {

        const bag = new Bags({
            name,
            slug,
            images: result,
            price,
            description,
            size,
            model
        })
    
        bag.save((err, bagDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Fallo al guardar',
                    err
                })
            }
    
            deleteFiles(req.files, function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('all files removed');
                }
              });
    
            res.json({bagDB});
        });

    })
    .catch((error) => {
        return res.json({
            ok: false,
            message: 'Cloudinary error',
            err: error
        })
    })
});

router.get('/bags', function(req,res) {
    Bags.find({}).exec((err, bags) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        Bags.countDocuments((err, quantity) => {
            res.json({
                ok: true,
                quantity,
                bags
            })
        })
    })
})

router.get('/bags/:name', function(req, res) {
    let slug = req.params.name

    Bags.findOne({slug:slug}, (err, bag) => {
        if (err){
            return res.status(400).json({
                ok: true,
                err
            })
        }

        if(!bag){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'Bag not found'
                }
            })
        }

        res.json({
            ok: true,
            bag
        })

    })
})
module.exports = router;
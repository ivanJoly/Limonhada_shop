const {Router} = require("express");
const router = Router();
const multer = require('multer');
const path = require('path');
var upload = multer({ dest: path.join(__dirname, '../public/img/uploads')})

const Bags = require('../models/bags');
const cloudinary = require('../config/cloudinary');

const { deleteFiles } = require('../functions/functions');
const { verifyExist } = require('../middlewares/verifySlug');

router.post('/', async function(req, res) {
    console.log(req.body);
    const {name, price, description, model, slug, size, stars, facts} = req.body;
    var imagesArr = req.files.images.slice().concat(req.files.image_profile);

    let res_promises = imagesArr.map(file => new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file.path, { use_filename: true, unique_filename: false }, function (error, result) {
            if(error){reject(error)
            } else if(file.fieldname === 'image_profile') {
                result.profile = true
                resolve(result)
            } else {
                resolve(result)  
            }
        })
    })
    )

    await Promise.all(res_promises)

    .then(result =>  {

        let indexFind;

        images = result.filter((img, index) => {
            if(img.profile){
                indexFind = index
            }
            return !img.profile
        });

        const bag = new Bags({
            name,
            slug,
            image_profile: result[indexFind],
            images,
            price: Number(price),
            description,
            size: JSON.parse(size),
            model,
            stars: Number(stars),
            facts: JSON.parse(facts)
        })
    
        bag.save((err, bagDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Fallo al guardar',
                    err
                })
            }
    
            deleteFiles(imagesArr, function(err) {
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

// router.post('/', async function(req, res) {
//     const {name, price, description, model, slug, size, stars, facts} = req.body;

//     const bag = new Bags({
//         name,
//         slug,
//         image_profile: '',
//         images: [],
//         price: Number(price),
//         description,
//         size: JSON.parse(size),
//         model,
//         stars: Number(stars),
//         facts: JSON.parse(facts)
//     })

//     bag.save((err, bagDB) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 message: 'Fallo al guardar',
//                 err
//             })
//         }

//         res.json({bagDB});
//     });
// });


router.get('/', function(req,res) {
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

router.get('/:name', function(req, res) {
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
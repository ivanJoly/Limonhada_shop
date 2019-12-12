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

            res.set({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
    
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

            res.set({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })

            res.json({
                ok: true,
                quantity,
                bags
            })
        })
    })
})

router.get('/:slug/:model', function(req, res) {
    let slug = req.params.slug
    let model = req.params.model

    Bags.findOne({slug: slug, "model.0": model}, (err, bag) => {
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

        Bags.find({}).exec((err, bags) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            let arrNumbers = [];
            let arrFilter = bags.filter(bagRelated => {
                let BRid = JSON.stringify(bagRelated._id);
                let Bid = JSON.stringify(bag._id);

                return  BRid != Bid ? bagRelated : false;
            });

            while (!(arrNumbers.length == 4)) {
                let alt = Math.floor(Math.random() * ((arrFilter.length) - 1) + 1);
                if(arrNumbers.length == 0){
                    arrNumbers.push(alt)
                }else{
                    let valid = true
                    for (let b = 0; b < arrNumbers.length; b++) {
                        if (arrNumbers[b] == alt){
                            valid = false
                        }
                    }
        
                    if(valid){
                        arrNumbers.push(alt)
                    }
                }
            }

            let related = arrNumbers.map(number => {
                return arrFilter[number - 1];
            })

            res.set({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
   

            res.json({
                ok: true,
                bag,
                related
            })

        })       
    })
})

router.get('/cart', function(req,res) {
    Bags.find({}).exec((err, bags) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        Bags.countDocuments((err, quantity) => {
            res.set({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })

            res.json({
                ok: true,
                quantity,
                bags
            })
        })
    })
})

router.post('/cart', async function(req, res) {

    let res_promises = req.body.map(id => new Promise((resolve, reject) => {
            Bags.findOne({_id: id}, "_id name image_profile price", (err, bag) => {
                if (err){
                    reject(err)
                }
        
                if(!bag){
                    reject(err)
                }

                resolve(bag)
            })
        })
    )

    await Promise.all(res_promises)
    .then(result => {

        res.set({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })

        res.json({
            ok: true,
            bags: result
        })
    })
    .catch(err => {

        res.json({
            ok: false,
            err
        })
    })
})

module.exports = router;
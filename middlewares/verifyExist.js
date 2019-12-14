const Bags = require('../models/bags');

let verifyExist = (req, res, next) => {
    
    const slug = req.body.name.toLowerCase().replace(/ /g, '-');
    const model = req.body.model;
    
    Bags.findOne({slug:slug, "model.0": model}, (err, bagExist) => {
        if(bagExist){
            return res.status(400).json({
                ok:false,
                message: 'Ya existe un producto con esas caracteristicas'
            })
        }else{
            req.body.slug = slug;
            // req.body.size = {alto: req.body.alto, ancho: req.body.ancho};
            next();
        }
    });
}

module.exports = {verifyExist};
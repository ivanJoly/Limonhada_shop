require('dotenv').config();

const {Router} = require("express");
const router = Router();
const nodemailer = require('nodemailer');

router.post('/sendmail', function (req, res){

    /*
        Add subscriber model & check mails previous to send mail (if already is a susbcriber now).
    */

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })

    let mailOptions = {
        from: '"Limonhada Bolsos" <limonhada.bolso@gmail.com>',
        to: req.body.mail,
        subject: 'Thanks for subscribe us',
        text: 'It works'
    }

    transporter.sendMail(mailOptions, function(err, data){
        if(err){

            res.set({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })

            return res.status(500).json({
                ok: false,
                msg: 'An error ocurred, try again!',
                err
            })
        }

        res.set({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })

        res.status(200).json({
            ok: true,
            msg: 'Thanks for subscribing',
            data
        })
    })

})

module.exports = router;
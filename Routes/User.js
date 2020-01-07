const Sequelize = require("sequelize")

const Email = require("../Models/Email.js")
const Argument = require("../Models/Arguments.js")
const Feedback = require("../Models/Answers.js")
const Encuesta = require("../Models/Encuesta.js")

const express = require("express")
const app = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../Models/User.js")
const Rol = require("../Models/Rol.js")

const nodemailer = require("nodemailer")

app.use(cors())

process.env.SECRET_KEY = 'secret'

app.post('/send', (req, res) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sergioesteban2049@gmail.com',
            pass: 'Ecfw2000'
        }
    });

    let mailOptions = {
        from: 'TUGÓ',
        to: req.body.emails,
        subject: 'Cuéntanos tu experiencia en nuestra tienda online tugo.co',
        text: 'Notificacion NPS TUGÓ',
        html: req.body.html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Mensaje Enviado', info.messageId);
        res.json('112233')
    });
})

app.get('/summarynps', (req, res) => {
    const op = Sequelize.Op

    var respuesta = new Array;

    var to;
    var pro;
    var detr;

    const total = Feedback
        .findAll({
            attributes: [
                [
                    Sequelize.fn('COUNT', Sequelize.col('respuesta')),
                    'Total'
                ]
            ]
        })
        .then(response => {
            respuesta.push(response[0]);
            to = respuesta[0].dataValues.Total;
        });

    const promoters = Feedback
        .findAll({
            attributes: [
                [
                    Sequelize.fn('COUNT', Sequelize.col('respuesta')),
                    'Promoters'
                ]
            ],
            where: {
                respuesta: {
                    [op.gte]: 9
                }
            }
        })
        .then(response => {
            respuesta.push(response[0]);
            pro = respuesta[1].dataValues.Promoters;
        });

    const detractors = Feedback
        .findAll({
            attributes: [
                [
                    Sequelize.fn('COUNT', Sequelize.col('respuesta')),
                    'Detractors'
                ]
            ],
            where: {
                respuesta: {
                    [op.lte]: 6
                }
            }
        })
        .then(response => {
            respuesta.push(response[0])
            detr = respuesta[2].dataValues.Detractors;
        });

    Feedback
        .findAll({
            attributes: [
                [
                    Sequelize.fn('COUNT', Sequelize.col('respuesta')),
                    'Passives'
                ]
            ],
            where: {
                respuesta: {
                    [op.or]: {
                        [op.eq]: 7,
                        [op.or]: {
                            [op.eq]: 8
                        }
                    }
                }
            }

        })
        .then(response => {
            respuesta.push(response[0])
            var promotersTotal = (pro - to);
            var detractorsTotal = (detr - to);
            var percentage = (promotersTotal - detractorsTotal);
            var result = (100 - percentage) + ' %';
            respuesta.push({"Percentage": result});
            res.format({
                'text/plain': function () {
                    res.send(respuesta)
                }
            })
        });
})

app.post('/feedback', (req, res) => {
    var fechaactual = Date.now()
    const userFeedback = {
        nombre: req.body.nombre,
        clasificacion: req.body.clasificacion,
        argumento: req.body.argumento,
        fecha: fechaactual,
        respuesta: req.body.respuesta
    }
    Feedback
        .create(userFeedback)
        .then(response => {
            res.json('ok')
        })
        .catch(err => {
            res.send(err)
        })
    })

app.post('/argumentemail', (req, res) => {
    Email.findOne({
            attributes: ['emails'],
            where: {
                id: req.body.id,
                idformulario: req.body.idformulario,
                clasificacion: req.body.clasificacion
            }
        })
        .then(argEmail => {            
            res.json(argEmail)
        })
        .catch(err => {
            res.send(err)
        })
    })

app.post('/argument', (req, res) => {
    Argument
        .findAll({
            attributes: [
                'id', 'pregunta'
            ],
            where: {
                clasificacion: req.body.clasificacion,
                idformulario: req.body.idformulario
            }
        })
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.send(err)
        })
    })

app.put('/argument', (req, res) => {

    const argument = {
        pregunta: req.body.pregunta,
        idformulario: req.body.idformulario,
        emails: req.body.emails,
        clasificacion: req.body.clasificacion
    }

    Argument
        .create(argument)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.send(err)
        })
    })

app.get('/encuestas', (req, res) => {
    Encuesta
        .findAll()
        .then(encuesta => {
            res.json(encuesta)
        })
        .catch(err => {
            res.send(err)
        })
    })

app.post('/encuesta', (req, res) => {
    Encuesta
        .findAll({
            attributes: ['pregunta', 'textoClasificacion1', 'textoClasificacion2', 'textoClasificacion3'],
            where: {
                id: req.body.id
            }
        })
        .then(encuesta => {
            res.json(encuesta)
        })
        .catch(err => {
            res.send(err)
        })
    })

app.put('/encuesta', (req, res) => {
    const encuesta = {
        nombre: req.body.nombre,
        pregunta: req.body.pregunta,
        textoClasificacion1: req.body.texto1,
        textoCkasificacion2: req.body.texto2,
        textoClasificacion3: req.body.texto3
    }
    Encuesta
        .create(encuesta)
        .then(encuesta => {
            res.json(encuesta)
        })
        .catch(err => {
            res.json(err)
        })
    })

app.get('/getRoles', (req, res) => {

    Rol
        .findAll({attributes: ['rol']})
        .then(rol => {
            res.json({status: rol})
        })
        .catch(err => {
            res.send(err)
        })

    })

app.post('/register', (req, res) => {

    const today = new Date()
    const userData = {
        email: req.body.email,
        password: req.body.password,
        rol: req.body.rol,
        fecha: today
    }
    User
        .findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User
                        .create(userData)
                        .then(user => {
                            res.json({
                                status: user.email + 'registered'
                            })
                        })
                        .catch(err => {
                            res.send('error:' + err)
                        })
                    })
            } else {
                res.json({error: "Registered Previously"})
            }
        })
        .catch(err => {
            res.send('error:' + err)
        })
    })

app.post('/login', (req, res) => {
    User
        .findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let tok = jwt.sign(user.dataValues, process.env.SECRET_KEY, {expiresIn: 1440})
                    res.send(tok)
                }
            } else {
                res
                    .status(400)
                    .json({error: 'User does not exist'})
            }
        })
        .catch(err => {
            res
                .status(400)
                .json({error: err})
        })
    })

app.get('/dashboard', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User
        .findOne({
            where: {
                id: decoded.id
            }
        })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res
                    .status(400)
                    .json({error: 'Usuario no Registrado'})
            }
        })
        .catch(err => {
            res
                .status(400)
                .json({error: err})
        })
    })

module.exports = app
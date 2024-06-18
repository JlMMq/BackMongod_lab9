const jwt = require('jsonwebtoken')

//Definimos eschema
const User = require('../models/User')
const config = require('../config/global')

exports.crearUsuario = async (req, res) => {
    try
    {
        const { username, email, password } = req.body
        const user = new User({
            username,
            email,
            password
        })

        user.password = await user.encryptPassword(user.password)
        await user.save()

        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 60*60*24
        })

        res.json({auth : true, token})
    }
    catch(error){
        console.log(error)
        res.status(500).send('Ocurrio un error en crearUsuario')
    } 
}

exports.obtenerUsuario = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)

    try{
        const { email, password } = req.body
        const user = await User.findOne({email : email})

        if(!user){
            return res.status(404).send("The user doesnt exists")
        }

        const validPassword = await user.validatePassword(password)
        if(!validPassword){
            return res.status(404).json({auth: false, token: null})
        }

        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 60*60*24
        })

        res.json({auth: true, token})
    }
    catch(error){
        console.log(error)
        req.status(500).send('Ocurrio un error en obtenerUsuario')
    } 
}
//Aqui se crea el modelo de la tabla
const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10) 
    //segun el profe se usa un hash
    return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = function (password){
    return bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema)

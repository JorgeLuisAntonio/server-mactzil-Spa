
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  ,

  repeatPassword: {
    type: String,
    required: true
  }
  ,
  active: Boolean


}


);

//crear el modelo se guardan en la coleccion administrador
module.exports = mongoose.model('usuario', usuarioSchema);

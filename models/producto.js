const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombreProducto: String,
    precioVenta: Number,
    existencia: Number,
    costoProveedor: Number,
    tipoProducto: String,
    proveedor: String


}


);

//crear el modelo se guardan en la coleccion administrador
module.exports = mongoose.model('producto', productoSchema);
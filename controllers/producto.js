const Producto = require("../models/producto");

function add(req, res) {
    //console.log("Endpoint de signUp");
    //creamos un objeto del modelo producto
    const producto = new Producto();
    const { nombreProducto, precioVenta, existencia, costoProveedor, tipoProducto, proveedor } = req.body;
    producto.nombreProducto = nombreProducto;
    producto.precioVenta = precioVenta;
    producto.existencia = existencia;
    producto.costoProveedor = costoProveedor;
    producto.tipoProducto = tipoProducto;
    producto.proveedor = proveedor;

    producto.save((err, productoStored) => {

        if (err) {
            res.status(500).send({ message: "error del servidor" });
        } else {
            if (!productoStored) {
                res.status(404).send({ message: "error al añadir" });
            } else {
                res.status(200).send({ producto: productoStored });

            }
        }

    })
}
function list(req, res) {

    Producto.find((err, lista_productos) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudieron listar los productos',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los productos se listaron adecuadamente',
                lista_productos
            });
        }
    });
}

function deleteProduct(req, res) {
    const { id } = req.params;
    Producto.deleteOne({ _id: id }, function (err, question) {
        if (err) throw err;
        console.log('the document is deleted')
        res.send(question);
    })
}
function updateNameProduct() {
    User.updateOne({},
        { name: "ABCD" }, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Updated Docs : ", docs);
            }
        });
}
function updateProduct(req, res) {
    const producto = new Producto();
    const { id } = req.params;
    const { nombreProducto, precioVenta, existencia, costoProveedor, tipoProducto, proveedor } = req.body;
    producto.nombreProducto = nombreProducto;
    producto.precioVenta = precioVenta;
    producto.existencia = existencia;
    producto.costoProveedor = costoProveedor;
    producto.tipoProducto = tipoProducto;
    producto.proveedor = proveedor;
    Producto.updateOne({ _id: id },
        {
            nombreProducto: nombreProducto, precioVenta: precioVenta, existencia: existencia,
            costoProveedor: costoProveedor, tipoProducto: tipoProducto, proveedor: proveedor
        }, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Updated Docs : ", docs);
            }
        });
}
module.exports = {
    add,
    list,
    deleteProduct,
    updateProduct
};
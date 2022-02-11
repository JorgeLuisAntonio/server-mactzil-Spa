const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/user");

function signUp(req, res) {
    //console.log("Endpoint de signUp");
    //creamos un objeto del modelo user
    const user = new User();
    const { name, email, password, repeatPassword } = req.body;
    user.name = name;
    user.email = email;
    user.repeatPassword = repeatPassword;
    user.active = true;
    if (!password || !repeatPassword) {
        res.status(404).send({ message: "Las contraseñas son obligatorias" });
    } else {
        if (password != repeatPassword) {
            res.status(404).send({ message: "Las contraseñas deben ser iguales" });
        } else {
            // res.status(200).send({message:"Tienes acceso"});
            bcrypt.hash(password, null, null, function (err, hash) {
                if (err) {
                    res.status(500).send({ message: "error al encriptar la contraseña" });
                } else {
                    // res.status(200).send({message: hash});
                    user.password = hash;
                    user.save((err, userStored) => {

                        if (err) {
                            res.status(500).send({ message: "error del servidor" });
                        } else {
                            if (!userStored) {
                                res.status(404).send({ message: "error al crear el usuario" });
                            } else {
                                res.status(200).send({ user: userStored });


                            }
                        }

                    })
                }
            })
        }
    }
}

function signIn(req, res) {
    const params = req.body;
    const email = params.email.toLowerCase();
    const password = params.password;

    User.findOne({ email }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Usuario no encontrado." });
            } else {
                bcrypt.compare(password, userStored.password, (err, check) => {
                    if (err) {
                        res.status(500).send({ message: "Error del servidor." });
                    } else if (!check) {
                        res.status(404).send({ message: "La contraseña es incorrecta." });
                    } else {
                        if (!userStored.active) {
                            res
                                .status(200)
                                .send({ code: 200, message: "El usuario no se ha activado." });
                        } else {
                            res.status(200).send({
                                accessToken: jwt.createAccessToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored)
                            });
                        }
                    }
                });
            }
        }
    });
}

module.exports = {
    signUp,
    signIn
};
//el request body manda los valores enviados por el json en el body -> raw -> JSON
//console.log(req.body);


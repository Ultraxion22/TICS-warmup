const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

const UsuariosModel = require('./models/Usuarios');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://admin:lolito100@cluster0.ftaza.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    {
    useNewUrlParser: true,
    }
);

app.post('/registro', async (req,res) => {
    const nombre = req.body.nombre;
    const rut = req.body.rut;
    const password = req.body.password;
    const usuario = new UsuariosModel({ nombre: nombre, rut: rut, password: password});

    try{
        await usuario.save();
        res.send("inserted data");
    }catch (err) {
        console.log(err);
    }
});

app.get("/login", async (req, res) => {
    const rut = req.query.rut;
    const password = req.query.password;
    UsuariosModel.find({ rut: rut, password: password}, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
        console.log(result)
    })
})
app.listen(3001, () =>{
    console.log("Server running on port 3001");
})
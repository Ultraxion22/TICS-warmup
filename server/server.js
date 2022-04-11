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

//LOGIN
app.get("/login", (req, res) => {
    const rut = req.query.rut;
    const password = req.query.password;
    console.log(rut);
    console.log(password);
    UsuariosModel.find({ rut: rut, password: password}, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
        console.log(result)
    })
})

app.get("/id", (req, res) => {
    const id = req.query.id;
    console.log(id);
    UsuariosModel.find({ _id: id }, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
        console.log(result)
    })
})

app.put('/update', async (req,res) => {
    const sueldos = req.body.sueldos;
    const imps = req.body.imps;
    const honorarios = req.body.honorarios;
    const imph = req.body.imph;
    const id = req.body.id;
    try{
        await UsuariosModel.findById(id, (err, updatedSueldos) => {
            updatedSueldos.sueldo = sueldos;
            updatedSueldos.imps = imps;
            updatedSueldos.honorarios = honorarios;
            updatedSueldos.imph = imph;
            updatedSueldos.save();
            console.log('updated');
        })
    }catch (err) {
        console.log(err);
    }
});



app.listen(3001, () =>{
    console.log("Server running on port 3001");
})
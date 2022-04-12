import Axios from "axios";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const cookies = new Cookies();

export default function(){

    const [rut, setRut] = useState();
    const [password, setPassword] = useState();
    
    const submitButton = () => {
        Axios.get(`http://localhost:3001/login`, {params: {rut: rut, password: password}})
        .then(response => {
            console.log(response);
            return response.data;
            })
            .then(response=>{
                if(response.length>0){
                var respuesta = response[0];
                cookies.set('id', respuesta._id, {path: "/"});
                cookies.set('nombre', respuesta.nombre, {path: "/"});
                window.location.href="/tabla";
                }
                else{
                    alert("Usuario o contraseña incorrectos");
                }
            })
            .catch(error=>{
                console.log(error)
            })
    }

    return(
        <div>
            <div className="m-5 d-flex justify-content-center">
            <form className="w-50">
                <div class="form-group mb-3 ">
                    <label for="exampleInputEmail1">Ingrese su rut</label>
                    <input type="text" class="form-control" onChange={(e) => {
                                setRut(e.target.value);
                            }} placeholder="20048133-k"/>
                </div>
                <div class="form-group mb-3">
                    <label for="exampleInputPassword1">Contraseña</label>
                    <input type="password" class="form-control" onChange={(e) => {
                                setPassword(e.target.value);
                            }} placeholder="Password"/>
                    <div className= "mt-2">
                    <Link to="/registro">No tiene cuenta? Registrese aqui!</Link>
                    </div>
                </div>
                <Button onClick={submitButton} className="btn btn-primary">Ingresar</Button>
            </form>
            </div>
        </div>
    );
}
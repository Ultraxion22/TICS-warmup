import Axios from "axios";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function(){

    const [rut, setRut] = useState("");
    const [password, setPassword] = useState("");

    const submitButton = () => {
        Axios.get("http://localhost:3001/login", {params: {rut: rut, password: password}})
        .then(response => {
            return response.data;
            })
            .then(response=>{
                if(response.length>0){
                    var respuesta = response[0];
                    cookies.set('rut', respuesta.rut, {path: "/"});
                    cookies.set('nombre', respuesta.nombre, {path: "/"});
                    cookies.set('sueldo', respuesta.sueldo, {path: "/"});
                    cookies.set('imps', respuesta.imps, {path: "/"});
                    cookies.set('honorarios', respuesta.honorarios, {path: "/"});
                    cookies.set('imph', respuesta.imph, {path: "/"});
                    window.location.href="/tabla";
                }else{
                    alert("El usuario o contrasena son incorrectos");
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
                
                <button type="submit" onClick={submitButton} class="btn btn-primary">Ingresar</button>
            </form>
            </div>
        </div>
    );
}
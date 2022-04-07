import Axios from "axios";
import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function(){

    const [nombre, setNombre] = useState("");
    const [rut, setRut] = useState("");
    const [password, setPassword] = useState("");


    const submitButton = () => {
        Axios.post("http://localhost:3001/registro", {
            nombre: nombre, 
            rut: rut, 
            password: password}).then(()=>{
                alert("Completado")
            });
    }

    return(
        <div>
            <div className="d-flex justify-content-center m-4 mb-2">
                <h1>REGISTRO</h1>
            </div>
            <div className="d-flex justify-content-center">
                
            <form className="w-50">
                <div class="form-group mb-3 ">
                    <label for="exampleInputEmail1">Ingrese su nombre</label>
                    <input type="text" className="form-control" onChange={(e) => {
                                setNombre(e.target.value);}}  placeholder="Antonio Vargas"/>
                    </div>
                <div class="form-group mb-3 ">
                    <label for="exampleInputEmail1">Ingrese su rut</label>
                    <input type="text" className="form-control" placeholder="20048133-k" onChange={(e) => {
                                setRut(e.target.value);}} />
                </div>
                <div class="form-group mb-3">
                    <label for="exampleInputPassword1">Contraseña</label>
                    <input type="password" className="form-control" placeholder="*********" onChange={(e) => {
                                setPassword(e.target.value);}} />
                </div>
                <button type="submit" onClick={submitButton} class="btn btn-primary"><Link to="/" >Registro</Link></button>
            </form>
            </div>
        </div>
    );
}
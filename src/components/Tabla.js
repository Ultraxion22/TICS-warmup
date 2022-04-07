import { Axios } from "axios";
import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Tabla() {

   
    return(
        <div>
            <div className="m-3 ">
                <h1>Bienvenido {cookies.get('nombre')}</h1>
                <div class="container">
                    <div class="row">
                    <div class="row">
                        <div class="col">
                        <table className="table">
                            <thead className="">
                                <tr>
                                <th scope="col">Sueldo liquido</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {cookies.get('sueldo').map((val, index) => {
                                    return (
                                        <tr>
                                        <td><h5 className="d-inline">{index+1} </h5><input type="text"/> {val}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            
                            </table>
                        </div>
                        <div class="col">
                            <table className="table">
                                <thead className="">
                                    <tr>
                                    <th scope="col">Impuesto retenido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {cookies.get('imps').map((val, index) => {
                                        return (
                                            <tr>
                                            <td><input type="text"/> {val*100}%</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div class="col">
                            <table className="table">
                                <thead className="">
                                    <tr>
                                    <th scope="col">Honorarios imponibles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {cookies.get('honorarios').map((val, index) => {
                                        return (
                                            <tr>
                                            <td><input type="text"/> {val}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div class="col">
                        <table className="table">
                            <thead className="">
                                <tr>
                                <th scope="col">Impuesto retenido</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {cookies.get('imph').map((val, index) => {
                                    return (
                                        <tr>
                                        <td><input type="text"/> {val*100}%</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            
                            </table>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                <button type="button" className=" m-2 btn btn-primary btn-lg btn-block">Calcular</button>
                <button type="button" className=" m-2 btn btn-primary btn-lg btn-block">Actualizar</button>
                </div>
            </div>
        </div>
    </div>
    );
}
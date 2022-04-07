import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Navbar() {
    
    const [botonActivo, setBotonActivo] = useState(false);

    const cerrarSesion = () => {
        cookies.remove('rut', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('password', {path: "/"});
        cookies.remove('sueldo', {path: "/"});
        cookies.remove('imps', {path: "/"});
        cookies.remove('honorarios', {path: "/"});
        cookies.remove('imph', {path: "/"});
        window.location.href="/";
    }

    useEffect(()=>{
        if(cookies.get('rut')){
        setBotonActivo(true);
        }
    })

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand"to = "/">TAX help</Link>
                </div>
                <div hidden={!botonActivo} class="nav-button">
                      <div class="p-3 bd-highlight">
                          <button onClick={() => {cerrarSesion()}} className='btn btn-primary'>Cerrar Sesion</button>
                      </div>
                </div>
            </nav>
        </div>

    );
}
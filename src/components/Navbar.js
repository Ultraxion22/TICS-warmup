import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Navbar() {
    
    const [botonActivo, setBotonActivo] = useState(false);

    const cerrarSesion = () => {
        cookies.remove('id');
        cookies.remove('nombre');
        window.location.href="/";
    }

    useEffect(()=>{
        if(cookies.get('id')){
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
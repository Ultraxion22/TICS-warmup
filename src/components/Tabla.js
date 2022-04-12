import Axios, * as others from 'axios';
import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { isElementOfType } from 'react-dom/test-utils';

const cookies = new Cookies();

export default function Tabla() {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'CLP',
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

    const[show, popup] = useState(false);
    const modalOpen = () => popup(true);
    const modalClose = () => popup(false);
    
    const [total, setTotal] = useState(0);
    const [devolucion, setDevolucion] = useState(false);
        

    const [userList, setUserList] = useState([]);
    const [sueldoList, setSueldoList] = useState([{
        uno: 0,
        dos: 0,
        tres: 0,
        cuatro: 0,
        cinco: 0,
        seis: 0,
        siete: 0,
        ocho: 0,
        nueve: 0,
        diez: 0,
        once: 0,
        doce: 0
    }]);

    const [impsList, setImpsList] = useState([{
        uno: 0,
        dos: 0,
        tres: 0,
        cuatro: 0,
        cinco: 0,
        seis: 0,
        siete: 0,
        ocho: 0,
        nueve: 0,
        diez: 0,
        once: 0,
        doce: 0
    }]);

    const [honorariosList, setHonorariosList] = useState([{
        uno: 0,
        dos: 0,
        tres: 0,
        cuatro: 0,
        cinco: 0,
        seis: 0,
        siete: 0,
        ocho: 0,
        nueve: 0,
        diez: 0,
        once: 0,
        doce: 0
    }]);

    const [imphList, setImphList] = useState([{
        uno: 0,
        dos: 0,
        tres: 0,
        cuatro: 0,
        cinco: 0,
        seis: 0,
        siete: 0,
        ocho: 0,
        nueve: 0,
        diez: 0,
        once: 0,
        doce: 0
    }]);

    const mostrar = () => {
        if(!devolucion){
            return(
                <h5>Usted debera pagar: </h5>
            );
        }
        else{
            return(
                <h5>Usted recibira de devolucion: </h5>
            );
        }
    }
    const sueldoActual = [];
    const impsActual = [];
    const honorariosActual = [];
    const imphActual = [];

    useEffect(()=> {
        Axios.get('http://localhost:3001/id', {params:{id: cookies.get('id')}}).then((response)=> {
        setUserList(response.data)
        });
    }, []);

    
    userList.forEach(function(elemento, indice, array) {
        for(var i=0;i<elemento.sueldo.length;i++){
            sueldoActual[i] = Number(elemento.sueldo[i]);
            impsActual[i] = Number(elemento.imps[i]);
            honorariosActual[i] = Number(elemento.honorarios[i]);
            imphActual[i] = Number(elemento.imph[i]);
        }
    })
    
    const actualizar = () =>{

        let sueldos = [sueldoList.uno, sueldoList.dos, sueldoList.tres, sueldoList.cuatro, sueldoList.cinco, sueldoList.seis, sueldoList.siete, sueldoList.ocho, sueldoList.nueve, sueldoList.diez, sueldoList.once, sueldoList.doce];
        let imps = [impsList.uno, impsList.dos, impsList.tres, impsList.cuatro, impsList.cinco, impsList.seis, impsList.siete, impsList.ocho, impsList.nueve, impsList.diez, impsList.once, impsList.doce]; 
        let honorarios = [honorariosList.uno, honorariosList.dos, honorariosList.tres, honorariosList.cuatro, honorariosList.cinco, honorariosList.seis, honorariosList.siete, honorariosList.ocho, honorariosList.nueve, honorariosList.diez, honorariosList.once, honorariosList.doce]; 
        let imph = [imphList.uno, imphList.dos, imphList.tres, imphList.cuatro, imphList.cinco, imphList.seis, imphList.siete, imphList.ocho, imphList.nueve, imphList.diez, imphList.once, imphList.doce];

        for(var i=0;i<sueldoActual.length;i++){
            if(sueldos[i] == null){
                sueldos[i] = sueldoActual[i];
            }
            if(imps[i] == null){
                imps[i] = impsActual[i];
            }
            if(honorarios[i] == null){
                honorarios[i] = honorariosActual[i];
            }
            if(imph[i] == null){
                imph[i] = imphActual[i];
            }
        }
        

        Axios.put('http://localhost:3001/update', {
            sueldos: sueldos,
            imps: imps,
            honorarios: honorarios,
            imph: imph,
            id: cookies.get('id')
        })
        window.location.href="/tabla";
    }

    const calcular = () =>{

        

        let sueldos = [];
        let imps = [];
        let honorarios = [];
        let imph = [];
        let totalSueldos = 0;
        let totalHonorarios = 0;
        let totalRetencionS = 0;
        let totalRetencionH = 0;
        let total = 0;
        let presuncion = 0;

        userList.forEach(function(elemento, indice, array) {
            for(var i=0;i<elemento.sueldo.length;i++){
                sueldos[i] = Number(elemento.sueldo[i]);
                imps[i] = Number(elemento.imps[i]);
                honorarios[i] = Number(elemento.honorarios[i]);
                imph[i] = Number(elemento.imph[i]);
            }
        })

        for(var i=0; i<sueldos.length; i++) {
            totalRetencionS += sueldos[i]*imps[i];
            totalRetencionH += honorarios[i]*imph[i];
            totalSueldos += sueldos[i];
            totalHonorarios += honorarios[i];
        }

        presuncion = totalHonorarios*0.3;
        
        if(presuncion > 9799560){
            presuncion = 9799560;
        }
     
        total = totalSueldos+totalHonorarios-presuncion;
        
        if(total<=8266698){
            total = total;
        }else if(total<=18370440){
            total = (total*0.04)-330667.92;
        }else if(total<=30617400){
            total = (total*0.08)-1065485.52;
        }else if(total<=42864360){
            total= (total*0.135)-2749442.52;
        }else if(total<=55111320){
            total = (total*0.23)-6821556.72;
        }else if(total<=73481760){
            total = (total*0.304)-10899794.40;
        }else if(total<=189827880){
            total = (total*0.35)-14279955.36;
        }else{
            total = (total*0.4)-23771349.36;
        }
        
        total = total - totalRetencionS - totalRetencionH;
        
        if(total<0){
            total = total * -1;
            setDevolucion(true);
        }
        setTotal(total);

        modalOpen();
    }

    
    return(
        <div>
            <div className="m-3 ">
                <h1>Bienvenido {cookies.get("nombre")}</h1>
                {userList.filter((val) => {
                    return val})
                    .map((val) => {
                    return(
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Meses</th>
                                    <th scope="col">Sueldo liquido</th>
                                    <th scope="col">Impuesto Retenido</th>
                                    <th scope="col">Honorarios Imponibles</th>
                                    <th scope="col">Impuesto Retenido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th scope="row">1</th>
                                    <td><input type="number" min='0'  defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, uno: e.target.value }});}}/> {val.sueldo[0]*1}</td>
                                    <td><input type="number" min='0'  defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, uno: (e.target.value)/100 }});}}/> {val.imps[0]*100}%</td>
                                    <td><input type="number" min='0'  defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, uno: e.target.value }});}}/> {val.honorarios[0]*1}</td>
                                    <td><input type="number" min='0'  defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, uno: (e.target.value)/100 }});}}/> {val.imph[0]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">2</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, dos: e.target.value }});}}/> {val.sueldo[1]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, dos: (e.target.value)/100 }});}}/> {val.imps[1]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, dos: e.target.value }});}}/> {val.honorarios[1]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, dos: (e.target.value)/100 }});}}/> {val.imph[1]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">3</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, tres: e.target.value }});}}/> {val.sueldo[2]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, tres: (e.target.value)/100 }});}}/> {val.imps[2]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, tres: e.target.value }});}}/> {val.honorarios[2]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, tres: (e.target.value)/100 }});}}/> {val.imph[2]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">3</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, cuatro: e.target.value }});}}/> {val.sueldo[3]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, cuatro: (e.target.value)/100 }});}}/> {val.imps[3]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, cuatro: e.target.value }});}}/> {val.honorarios[3]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, cuatro: (e.target.value)/100 }});}}/> {val.imph[3]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">5</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, cinco: e.target.value }});}}/> {val.sueldo[4]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, cinco: (e.target.value)/100 }});}}/> {val.imps[4]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, cinco: e.target.value }});}}/> {val.honorarios[4]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, cinco: (e.target.value)/100 }});}}/> {val.imph[4]*100}%</td>
                                    </tr> 
                                    <tr>
                                    <th scope="row">6</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, seis: e.target.value }});}}/> {val.sueldo[5]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, seis: (e.target.value)/100 }});}}/> {val.imps[5]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, seis: e.target.value }});}}/> {val.honorarios[5]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, seis: (e.target.value)/100 }});}}/> {val.imph[5]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">7</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, siete: e.target.value }});}}/> {val.sueldo[6]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, siete: (e.target.value)/100 }});}}/> {val.imps[6]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, siete: e.target.value }});}}/> {val.honorarios[6]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, siete: (e.target.value)/100 }});}}/> {val.imph[6]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">8</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, ocho: e.target.value }});}}/> {val.sueldo[7]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, ocho: (e.target.value)/100 }});}}/> {val.imps[7]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, ocho: e.target.value }});}}/> {val.honorarios[7]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, ocho: (e.target.value)/100 }});}}/> {val.imph[7]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">9</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, nueve: e.target.value }});}}/> {val.sueldo[8]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, nueve: (e.target.value)/100 }});}}/> {val.imps[8]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, nueve: e.target.value }});}}/> {val.honorarios[8]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, nueve: (e.target.value)/100 }});}}/> {val.imph[8]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">10</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, diez: e.target.value }});}}/> {val.sueldo[9]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, diez: (e.target.value)/100 }});}}/> {val.imps[9]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, diez: e.target.value }});}}/> {val.honorarios[9]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, diez: (e.target.value)/100 }});}}/> {val.imph[9]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">11</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, once: e.target.value }});}}/> {val.sueldo[10]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, once: (e.target.value)/100 }});}}/> {val.imps[10]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, once: e.target.value }});}}/> {val.honorarios[10]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, once: (e.target.value)/100 }});}}/> {val.imph[10]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">12</th>
                                    <td><input type="number"  min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, doce: e.target.value }});}}/> {val.sueldo[11]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, doce: (e.target.value)/100 }});}}/> {val.imps[11]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, doce: e.target.value }});}}/> {val.honorarios[11]*1}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, doce: (e.target.value)/100 }});}}/> {val.imph[11]*100}%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    );
                })}
                
                <div className="d-flex justify-content-center">
                <button type="submmit" onClick={actualizar} className=" m-2 btn btn-primary btn-lg btn-block">Actualizar</button>
                <button type="button"  onClick={calcular} className=" m-2 btn btn-primary btn-lg btn-block">Calcular</button>
                
                    <Modal show={show} onHide={modalClose}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                        <Modal.Body>
                            <div className='m-3'>
                                <div className='d-flex justify-content-center'>
                                {
                                mostrar() 
                                }
                                </div>
                                <div className='d-flex justify-content-center'>
                                <h5> $ {formatter.format(Math.trunc(total))} pesos</h5>
                                </div>
                            </div>
                            
                        </Modal.Body>

                    </Modal>
                
                </div>
            </div>
        </div>
    );
}
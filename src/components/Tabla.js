import Axios, * as others from 'axios';
import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Tabla() {

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


    
    useEffect(()=> {
        Axios.get('http://localhost:3001/id', {params:{id: cookies.get('id')}}).then((response)=> {
        setUserList(response.data)
        });
    }, []);


    
    const actualizar = () =>{

        let sueldos = [sueldoList.uno, sueldoList.dos, sueldoList.tres, sueldoList.cuatro, sueldoList.cinco, sueldoList.seis, sueldoList.siete, sueldoList.ocho, sueldoList.nueve, sueldoList.diez, sueldoList.once, sueldoList.doce];
        let imps = [impsList.uno, impsList.dos, impsList.tres, impsList.cuatro, impsList.cinco, impsList.seis, impsList.siete, impsList.ocho, impsList.nueve, impsList.diez, impsList.once, impsList.doce]; 
        let honorarios = [honorariosList.uno, honorariosList.dos, honorariosList.tres, honorariosList.cuatro, honorariosList.cinco, honorariosList.seis, honorariosList.siete, honorariosList.ocho, honorariosList.nueve, honorariosList.diez, honorariosList.once, honorariosList.doce]; 
        let imph = [imphList.uno, imphList.dos, imphList.tres, imphList.cuatro, imphList.cinco, imphList.seis, imphList.siete, imphList.ocho, imphList.nueve, imphList.diez, imphList.once, imphList.doce];
        

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
        const sueldos = [];
        let honorarios = [];
        let totalSueldos = 0;
        userList.filter((val) => {
            return val
        }).map((val, index) =>{
            sueldos[index] = val.sueldo;
            honorarios[index] = val.honorarios;
        })

        for (let i = 0; i < sueldos.length; i++) {
                totalSueldos = sueldos[i];
        }
        
        
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
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, uno: e.target.value }});}}/> {val.sueldo[0]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, uno: (e.target.value)/100 }});}}/> {val.imps[0]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, uno: e.target.value }});}}/> {val.honorarios[0]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, uno: (e.target.value)/100 }});}}/> {val.imph[0]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">2</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, dos: e.target.value }});}}/> {val.sueldo[1]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, dos: (e.target.value)/100 }});}}/> {val.imps[1]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, dos: e.target.value }});}}/> {val.honorarios[1]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, dos: (e.target.value)/100 }});}}/> {val.imph[1]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">3</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, tres: e.target.value }});}}/> {val.sueldo[2]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, tres: (e.target.value)/100 }});}}/> {val.imps[2]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, tres: e.target.value }});}}/> {val.honorarios[2]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, tres: (e.target.value)/100 }});}}/> {val.imph[2]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">3</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, cuatro: e.target.value }});}}/> {val.sueldo[3]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, cuatro: (e.target.value)/100 }});}}/> {val.imps[3]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, cuatro: e.target.value }});}}/> {val.honorarios[3]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, cuatro: (e.target.value)/100 }});}}/> {val.imph[3]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">5</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, cinco: e.target.value }});}}/> {val.sueldo[4]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, cinco: (e.target.value)/100 }});}}/> {val.imps[4]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, cinco: e.target.value }});}}/> {val.honorarios[4]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, cinco: (e.target.value)/100 }});}}/> {val.imph[4]*100}%</td>
                                    </tr> 
                                    <tr>
                                    <th scope="row">6</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, seis: e.target.value }});}}/> {val.sueldo[5]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, seis: (e.target.value)/100 }});}}/> {val.imps[5]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, seis: e.target.value }});}}/> {val.honorarios[5]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, seis: (e.target.value)/100 }});}}/> {val.imph[5]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">7</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, siete: e.target.value }});}}/> {val.sueldo[6]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, siete: (e.target.value)/100 }});}}/> {val.imps[6]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, siete: e.target.value }});}}/> {val.honorarios[6]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, siete: (e.target.value)/100 }});}}/> {val.imph[6]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">8</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, ocho: e.target.value }});}}/> {val.sueldo[7]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, ocho: (e.target.value)/100 }});}}/> {val.imps[7]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, ocho: e.target.value }});}}/> {val.honorarios[7]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, ocho: (e.target.value)/100 }});}}/> {val.imph[7]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">9</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, nueve: e.target.value }});}}/> {val.sueldo[8]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, nueve: (e.target.value)/100 }});}}/> {val.imps[8]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, nueve: e.target.value }});}}/> {val.honorarios[8]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, nueve: (e.target.value)/100 }});}}/> {val.imph[8]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">10</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, diez: e.target.value }});}}/> {val.sueldo[9]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, diez: (e.target.value)/100 }});}}/> {val.imps[9]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, diez: e.target.value }});}}/> {val.honorarios[9]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, diez: (e.target.value)/100 }});}}/> {val.imph[9]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">11</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, once: e.target.value }});}}/> {val.sueldo[10]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, once: (e.target.value)/100 }});}}/> {val.imps[10]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, once: e.target.value }});}}/> {val.honorarios[10]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImphList(previousState => {return { ...previousState, once: (e.target.value)/100 }});}}/> {val.imph[10]*100}%</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">12</th>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setSueldoList(previousState => {return { ...previousState, doce: e.target.value }});}}/> {val.sueldo[11]}</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setImpsList(previousState => {return { ...previousState, doce: (e.target.value)/100 }});}}/> {val.imps[11]*100}%</td>
                                    <td><input type="number" min='0' defaultValue="0" onChange={(e)  => {setHonorariosList(previousState => {return { ...previousState, doce: e.target.value }});}}/> {val.honorarios[11]}</td>
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
                </div>
            </div>
        </div>
    );
}
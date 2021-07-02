import './Pages.css'
import React, {Fragment, useState} from 'react';
import uuid from 'react-uuid'
import axios from 'axios';

export default function Destinos(){

    
    //creando el registro
    const [registro, guardarRegistro] =useState({
        name: '',
        direccion: ''
    })
    //funcion que se ejecuta al llenar datos

    const actualizarState = e => {
        guardarRegistro({
            ...registro,
            [e.target.name]:e.target.value
        })
    }
    const { name, direccion} = registro;
    const [error, actualizarError] = useState(false);
    

   const submitForm = async (e) => {
        e.preventDefault();
//Validando datos
        if (name.trim() === '' || direccion.trim() === '' ) {
                 //Eliminar mensaje de error
                actualizarError(true);
                return;
            }     
        const url = 'https://abc-shipping-default-rtdb.firebaseio.com/destinos.json';
        registro.id = uuid();
        let  payload = {
            data: [{"IdProveedor":registro.id, "Proveedor":name,"Direccion":direccion}]
        };
        console.log(payload);
            actualizarError(false);
             //Asignando un ID
           
          
    /*sin hooks
            await axios({
                url: url,
                method: 'post',
                data: payload
              }) */
              //Enviar el Registro
              await axios.post(url,payload).then(function (response) {
                // your action after success
                console.log(response);
            })
            .catch(function (error) {
               // your action on error success
                console.log(error);
            });
            //Reiniciar el form
            guardarRegistro({
                name: '',
                direccion: '',
            })
            } 
    return(
        <div className="container">  
        <div className="m-5">
    </div>
                <div className="row">
                    <div className="ml-3 mt-3 p-2 mr-2 one-half">
        <Fragment>
            
        <h2>Destinos, Puertos, Aerepuertos, Aduanas</h2>
        <form
        onSubmit={submitForm}
        >
            { error ? <p className="alerta-error">Todos 
            los campos son obligatorios  </p>
                 : null
                }
                <div class="row align-items-start mt-2">
            <label className="w-50">Nombre:  </label>
            <input
                type="text"
                name="name"
                className="w-50"
                placeholder="Destino"
                onChange={actualizarState}
                value={name}
                /> </div>  <div class="row align-items-start mt-2">
                <label className="w-50">Direccion:  </label>
                 <input
                type="text"
                name="direccion"
                className="w-50"
                placeholder="Direccion"
                onChange={actualizarState}
                value={direccion}
                /> </div>  <div class="row align-items-start mt-2">
                <button 
                type="submit"
                className="btn btn-primary w-100 ml-3 mb-2"
                >Agregar Destino</button>  </div>  
        </form>
        </Fragment>
        </div>
      
        </div>
        </div>
    )
}

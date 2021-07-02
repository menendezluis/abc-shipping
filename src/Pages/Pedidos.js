import './Pages.css'
import React, {Fragment, useState} from 'react';
import uuid from 'react-uuid'
import axios from 'axios';
import DatatablePage from './DatatablePage';
import { Button, Modal } from 'react-bootstrap';

export default function Pedidoes(){
    //const [ Pedidoes, guardarPedidoes ] = useState([]);
    
   // const [ busqueda, guardarBusqueda ] = useState('');
    const [show, setShow] = useState(false);
    //const url = 'https://abc-shipping-default-rtdb.firebaseio.com/Pedidoes.json';
    //useEffect(() => {
      //const consultarApi = async () => {
       // const respuesta = await fetch(url);
       // const resultado = await respuesta.json();
       // guardarPedidoes(resultado);
       // const entries = Object.entries(resultado);

        //const { name, image, premiered,officialSite} = Object.entries(entries[1][1].data);
        
      //const entri = Object.entries(entries[1][1]);

        //for (const record in entri) {
          //if (resultado[entri]) {
            //console.log(entri[0]);
          //}
        //}
    //  }
     // consultarApi();
    //},[]);

    const handleClose = () => setShow(false);
  
    const handleShow = () => setShow(true);
    //creando el registro
    const [registro, guardarRegistro] =useState({
      idcontenedor: '',
        destino: '',
        fechallegada: '',
        fechareal: '',
        origen: '',
        fechasalida: ''
    })
    //funcion que se ejecuta al llenar datos

    const actualizarState = e => {
        guardarRegistro({
            ...registro,
            [e.target.name]:e.target.value
        })
    }
    const {idcontenedor, destino,fechallegada,fechareal,origen,fechasalida} = registro;
    const [error, actualizarError] = useState(false);
    

    const submitForm = async (e) => {
      e.preventDefault();
//Validando datos
      if (idcontenedor.trim() === '' || destino.trim() === '' ||
      origen.trim() === '' || fechasalida.trim() === '' ||  
      fechallegada.trim() === ''  ) {
               //Eliminar mensaje de error
              actualizarError(true);
              return;
          }     
      const url = 'https://abc-shipping-default-rtdb.firebaseio.com/pedido.json';
      registro.id = uuid();
      let  payload = {
          data: [{"IdPedido":registro.id, 
          "Contenedor":idcontenedor,
          "Destino":destino,
          "FechaLlegada":fechallegada,
          "FechaReal":fechareal,
          "Origen":origen,
          "FechaSalida":fechasalida
        }]
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
              idcontenedor: '',
        destino: '',
        fechallegada: '',
        fechareal: '',
        origen: '',
        fechasalida: ''
            })
            } 
    return(
        <div className="container">
                <DatatablePage />
<Button variant="danger" onClick={handleShow}>

  Generar Pedido

</Button>



<Modal size="lg" show={show} onHide={handleClose}>

  <Modal.Header closeButton>

    <Modal.Title>Registro un Pedido</Modal.Title>

  </Modal.Header>
  <form
            onSubmit={submitForm}
            >
  <Modal.Body>

  <Fragment>
            
            <div className="p-1">            
                { error ? <p className="alerta-error">Todos 
                los campos son obligatorios  </p>
                     : null
                    }
                    <div class="row align-items-start mt-2">
                <label className="w-50">ID Contenedor:  </label>
                <input
                    type="text"
                    name="idcontenedor"
                    className="w-50"
                    placeholder="ID del Contenedor"
                    onChange={actualizarState}
                    value={idcontenedor}
                    /> </div>  <div class="row align-items-start mt-2">
                    <label className="w-50">Destino:  </label>
                     <input
                    type="text"
                    name="destino"
                    className="w-50"
                    placeholder="Destino"
                    onChange={actualizarState}
                    value={destino}
                    /> </div>  <div class="row align-items-start mt-2">
                     <label  className="w-50">Fecha de llegada:  </label>
                <input
                    type="date"
                    name="fechallegada"
                    className="w-50"
                    placeholder="Fecha Llegada"
                    onChange={actualizarState}
                    value={fechallegada}
                    /></div>  <div class="row align-items-start mt-2">
                      <label className="w-50">Fecha Real:  </label>
                <input
                    type="date"
                    name="fechareal"
                    className="w-50"
                    placeholder="Fecha real"
                    onChange={actualizarState}
                    value={fechareal}
                    /> </div> 
                    <div class="row align-items-start mt-2">
                    <label className="w-50">Origen:  </label>
                    <input
                    name="origen"
                    className="w-50"
                    placeholder="Lugar de salida:"
                    onChange={actualizarState}
                    value={origen}
                    /> </div> 
                     <div class="row align-items-start mt-2">
                    <label className="w-50">Fecha de Salida:  </label>
                    <input
                    type="date"
                    name="fechasalida"
                    className="w-50"
                    placeholder="Fecha de salida:"
                    onChange={actualizarState}
                    value={origen}
                    /> </div> 
            </div>

            </Fragment>
  </Modal.Body>

  <Modal.Footer>

    <Button variant="secondary" onClick={handleClose}>

      Cerrar

    </Button>

    <Button variant="primary" type="submit" onClick={handleClose}>

      Crear Pedido

    </Button>

  </Modal.Footer>
  </form>
</Modal>

</div>
            
    )
}

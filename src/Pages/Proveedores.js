import './Pages.css'
import React, {Fragment, useState} from 'react';
import uuid from 'react-uuid'
import axios from 'axios';
import DatatablePage from './DatatablePage';
import { Button, Modal } from 'react-bootstrap';

export default function Proveedores(){
    //const [ proveedores, guardarProveedores ] = useState([]);
    
   // const [ busqueda, guardarBusqueda ] = useState('');
    const [show, setShow] = useState(false);
    //const url = 'https://abc-shipping-default-rtdb.firebaseio.com/proveedores.json';
    //useEffect(() => {
      //const consultarApi = async () => {
       // const respuesta = await fetch(url);
       // const resultado = await respuesta.json();
       // guardarProveedores(resultado);
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
        name: '',
        contactName: '',
        email: '',
        phone: '',
        otros: '',
    })
    //funcion que se ejecuta al llenar datos

    const actualizarState = e => {
        guardarRegistro({
            ...registro,
            [e.target.name]:e.target.value
        })
    }
    const { name, contactName, email, phone, otros} = registro;
    const [error, actualizarError] = useState(false);
    

    const submitForm = async (e) => {
      e.preventDefault();
//Validando datos
      if (name.trim() === '' || contactName.trim() === '' ||
          email.trim() === '' || phone.trim() === '' ||  
          otros.trim() === ''  ) {
               //Eliminar mensaje de error
              actualizarError(true);
              return;
          }     
      const url = 'https://abc-shipping-default-rtdb.firebaseio.com/proveedores.json';
      registro.id = uuid();
      let  payload = {
          data: [{"IdProveedor":registro.id, "Proveedor":name,"Contacto":contactName,"Email":email,"Telefono":phone,"otros":otros}]
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
                contactName: '',
                email: '',
                phone: '',
                otros: ''
            })
            } 
    return(
        <div className="container">
                <DatatablePage />
<Button variant="danger" onClick={handleShow}>

  Agregar Proveedor

</Button>



<Modal size="lg" show={show} onHide={handleClose}>

  <Modal.Header closeButton>

    <Modal.Title>Registro de Proveedores</Modal.Title>

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
                <label className="w-50">Proveedor:  </label>
                <input
                    type="text"
                    name="name"
                    className="w-50"
                    placeholder="Ingresa nombre proveedor"
                    onChange={actualizarState}
                    value={name}
                    /> </div>  <div class="row align-items-start mt-2">
                    <label className="w-50">Contacto:  </label>
                     <input
                    type="text"
                    name="contactName"
                    className="w-50"
                    placeholder="Nombre del contacto"
                    onChange={actualizarState}
                    value={contactName}
                    /> </div>  <div class="row align-items-start mt-2">
                     <label  className="w-50">Email:  </label>
                <input
                    type="email"
                    name="email"
                    className="w-50"
                    placeholder="Ingresa el Correo"
                    onChange={actualizarState}
                    value={email}
                    /></div>  <div class="row align-items-start mt-2">
                      <label className="w-50">Telefono:  </label>
                <input
                    type="tel"
                    name="phone"
                    className="w-50"
                    placeholder="Ingresa de contacto"
                    onChange={actualizarState}
                    value={phone}
                    /> </div> 
                    <div class="row align-items-start mt-2">
                    <label className="w-50">Otros:  </label>
                    <textarea
                    name="otros"
                    className="w-50"
                    placeholder="Algun dato que agregar:"
                    onChange={actualizarState}
                    value={otros}
                    /> </div> 
            </div>

            </Fragment>
  </Modal.Body>

  <Modal.Footer>

    <Button variant="secondary" onClick={handleClose}>

      Cerrar

    </Button>

    <Button variant="primary" type="submit" onClick={handleClose}>

      Crear Proveedor

    </Button>

  </Modal.Footer>
  </form>
</Modal>

</div>
            
    )
}

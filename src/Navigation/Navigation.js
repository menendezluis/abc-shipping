import React, { useState } from 'react';
import { Button, Navbar, NavDropdown, Nav} from 'react-bootstrap';

import { useFirebaseApp, useUser } from 'reactfire';

import 'firebase/auth';


export default function Navigation(props) {
  const firebase = useFirebaseApp();
  const [showDisplay, setShowDisplay] = '';
const logout = async ()=> {
  await firebase.auth().signOut();
}
  const { data: user } = useUser();
    return(
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">ABC Shipping</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      <NavDropdown title="Gestiones" id="basic-nav-dropdown">
          <NavDropdown.Item href="/proveedores">Proveedores</NavDropdown.Item>
          <NavDropdown.Item href="/productos">Productos</NavDropdown.Item>
          <NavDropdown.Item href="/pedidos">Pedidos</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Destinos</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Reportes" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.3">Mensual</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Por Contenedor</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4">Por Destino</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#link">Usuarios</Nav.Link>
      </Nav>
      <div>
        <label className="text-dark mr-1">{user.email}</label>
        
        <Button variant="outline-success" onClick={logout} >Cerrar Sesion</Button>
        
      </div>
    </Navbar.Collapse>
  </Navbar>
    )
}
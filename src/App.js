import React from 'react';
import './App.css';
import Auth from './Auth'
import { useFirebaseApp, useUser } from 'reactfire';
import { Button, Navbar, NavDropdown, Nav} from 'react-bootstrap';



import 'firebase/auth';
import Logo from './images/logo.png'
import { Link,
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Pages/Home';
import Proveedores from './Pages/Proveedores';
import Pedidos from './Pages/Pedidos';
import Productos from './Pages/Productos';
import Usuarios from './Pages/Usuarios';
import Destinos from './Pages/Destinos';

function App(props) {
  const firebase = useFirebaseApp();
const logout = async ()=> {
  await firebase.auth().signOut();
}
  const { data: user } = useUser();

  return (
    
    <div className="App">
      <img src={Logo} alt="logo" className="App-logo " /> 
      <body>
        
        {user && <Router>
         <Navbar bg="light" expand="lg">
         <Navbar.Brand> <Link to="/"> ABC Shipping </Link> </Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
           <Nav className="mr-auto">
           <NavDropdown title="Gestiones" id="basic-nav-dropdown">
               <NavDropdown.Item><Link to="/proveedores"> Proveedores </Link></NavDropdown.Item>
               <NavDropdown.Item><Link to="/productos"> Productos</Link></NavDropdown.Item>
               <NavDropdown.Item><Link to="/pedidos"> Pedidos</Link></NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item><Link to="/destinos">Destinos</Link></NavDropdown.Item>
             </NavDropdown>
             <NavDropdown title="Reportes" id="basic-nav-dropdown">
               <NavDropdown.Item>Mensual</NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item>Por Contenedor</NavDropdown.Item>
               <NavDropdown.Item>Por Destino</NavDropdown.Item>
             </NavDropdown>
             <Nav.Link> <Link to="/usuarios">  Usuarios </Link></Nav.Link>
           </Nav>
           <div>
             <label className="text-dark mr-1">{user.email}</label>
             
             <Button variant="outline-success" onClick={logout} >Cerrar Sesion</Button>
             
           </div>
         </Navbar.Collapse>
       </Navbar>

      <div>
        
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pedidos">
            <Pedidos />
          </Route>
          <Route path="/productos">
            <Productos />
          </Route>
          <Route path="/proveedores">
            <Proveedores />
          </Route>
          <Route path="/usuarios">
            <Usuarios />
          </Route>
          <Route path="/destinos">
            <Destinos />
          </Route>
        </Switch>
      </div>
      </Router>}
      <Auth />  
      </body>
    </div>
  );
}

export default App;

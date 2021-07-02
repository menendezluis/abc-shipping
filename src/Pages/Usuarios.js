import React, { useState } from 'react';
import { useFirebaseApp} from 'reactfire';
import 'firebase/auth';
import { Button } from 'react-bootstrap';
//import { useAuthState } from 'react-firebase-hooks/auth';
//import { useCollectionData } from 'react-firebase-hooks/firestore';




export default function Usuarios(props) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const firebase = useFirebaseApp();
    

    const signIn = async () => {
        await firebase.auth().createUserWithEmailAndPassword(email,password); 
    }
    return(
        <div>
            <div className="container justify-content-center">
            <h1> Crear un usuario </h1>
                <div className= "row justify-content-center">
                   
                         <label className="primary mt-2" htmlFor="email">Correo electrónico </label>
                         </div> 
                         <div className= "row justify-content-center">
                        <input className="primary" type="email" id="email" onChange={(e)=> setEmail(e.target.value)}/>
                    
                </div> 
                <div className= "row justify-content-center">
                   
                        <label className="primary" htmlFor="password">Contraseña </label>
                        </div> 
                        <div className= "row justify-content-center">
                        <input className="primary" type="password" id="password" onChange={(e)=> setPassword(e.target.value)} />
                        </div> 
                        <div className= "row justify-content-center">
                    <Button className="primary m-1" onClick = {signIn}> Crear Usuario</Button>
                    </div> 
                    </div>
        </div>
    )
}
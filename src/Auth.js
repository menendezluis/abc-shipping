import React, { useState } from 'react';
import { useFirebaseApp, useUser} from 'reactfire';
import 'firebase/auth';
import { Button } from 'react-bootstrap';
//import { useAuthState } from 'react-firebase-hooks/auth';
//import { useCollectionData } from 'react-firebase-hooks/firestore';




export default function Auth(props) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const firebase = useFirebaseApp();
    const { data: user } = useUser();

   // const signIn = async () => {
     //   await firebase.auth().createUserWithEmailAndPassword(email,password); 
    //}
    
   // const logout = async ()=> {
     //   await firebase.auth().signOut();
    //}
   
    const login = async () => {
        await firebase.auth().signInWithEmailAndPassword(email,password)
        .catch(function(error) {
            var errorCode = error.code;
          //  var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password'){
                alert('Contraseña no valida');
            } else if (errorCode === 'auth/invalid-email'){
                alert('Usuario no valido');
            } else if (errorCode === 'auth/user-not-found'){
                alert('Usuario no valido');
            } else if (errorCode === 'auth/user-disabled'){
                alert('Consulte al administrador');
            } });
    }
    return(
        <div>
            { !user &&
            <div className="container justify-content-center">
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
                    <Button className="primary m-1" onClick = {login}> Login</Button>
                    </div> 
                    </div>
                    }
            
        </div>
    )
}
import React, { useState } from 'react';
import { useFirebaseApp, useUser } from 'reactfire';
import 'firebase/auth';


//import { useAuthState } from 'react-firebase-hooks/auth';
//import { useCollectionData } from 'react-firebase-hooks/firestore';




export default function Auth(props) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const firebase = useFirebaseApp();
    const { data: user } = useUser();

    const signIn = async () => {
        await firebase.auth().createUserWithEmailAndPassword(email,password); 
    }
    
    const logout = async ()=> {
        await firebase.auth().signOut();
    }
   
    const login = async () => {
        await firebase.auth().signInWithEmailAndPassword(email,password)
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
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
            <div className="Auth">
                <div>
            <label htmlFor="email">Correo electrónico </label>
            <input type="email" id="email" onChange={(e)=> setEmail(e.target.value)}/>
            </div><div>
            <label htmlFor="password">Contraseña </label>
            <input type="password" id="password" onChange={(e)=> setPassword(e.target.value)} />
            </div>
            <button onClick = {login}> Login</button>
            </div>
            }
            { user && 
            <div>
                <button onClick={logout}>Cerrar</button>
            </div>
            }
        </div>
    )
}
import './Registro.css';
import { useState } from 'react';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, DocumentData, Firestore, deleteField, doc, updateDoc, setDoc } from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';


const firebaseConfig = {
    apiKey: "AIzaSyDohXmpPV3Opkd-16Og4MizBH4kp63-sQE",
    authDomain: "proyectomedbyte.firebaseapp.com",
    projectId: "proyectomedbyte",
    storageBucket: "proyectomedbyte.appspot.com",
    messagingSenderId: "98100301580",
    appId: "1:98100301580:web:23cd0e7cbda061e3530329"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let lista;
let ini;


async function getUser(db, id) {
    const personasColection = collection(db, 'personas');
    const personasSnapshot = await getDocs(personasColection);
    const personasList = personasSnapshot.docs.map(doc => doc.data());
    let firstElement = personasList[id];
    let datos = [firstElement["correo"], firstElement["contrasena"], firstElement["nombre"]];
    lista = personasList;
    return datos;
  }
  
  async function addUser(db, nombre, correo, contrasena) {
    try {
      console.log("Entro a guardar");
  
      let newUser = doc(db, 'personas', nombre);
      //addDoc(db, 'personas', "2");
      await setDoc(newUser, { 
        nombre: nombre,
        correo: correo,
        contrasena: contrasena
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  

function Registro() {

    const navigate = useNavigate();

    const [nombreI, setNombreI] = useState("");
    const [correoI, setCorreoI] = useState("");
    const [contraCI, setContraCI] = useState("");
    const [contraI, setContraI] = useState("");

    return (
        <div className="inicio">
            <div className='isesion'>
                <img src="https://th.bing.com/th/id/OIP.L-Ef4AaGRNyQArVO3uAiQgAAAA?pid=ImgDet&rs=1" alt="logo medbyte" />
                <div>
                    <p>Nombre de Usuario</p>
                    <input type="text" onChange={(e) => { setNombreI(e.target.value); }}/>
                </div>
                <div>
                    <p>Correo Electronico</p>
                    <input type ="text" onChange={(e) => { setCorreoI(e.target.value); }}/>
                </div>
                <div>
                    <p>Contraseña</p>
                    <input type="password" onChange={(e) => { setContraI(e.target.value); }}/>
                </div>
                <div>
                    <p>Confirmar Contraseña</p>
                    <input type ="password" onChange={(e) => { setContraCI(e.target.value); }}/>
                </div>
                
                <button onClick={() => { if (contraCI === contraI) { 
          addUser(db, nombreI, correoI, contraI); 
          window.alert('Usuario Creado'); 
          navigate('/');
          } else { window.alert('No coinciden las Contraseñas'); } }}>Crear Cuenta</button>
                <a href="/">Iniciar Sesion</a>
            </div>
        </div>
    );
}

export default Registro;

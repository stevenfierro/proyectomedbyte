
import './Inicio.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, DocumentData, Firestore, deleteField, doc, updateDoc } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDohXmpPV3Opkd-16Og4MizBH4kp63-sQE",
    authDomain: "proyectomedbyte.firebaseapp.com",
    projectId: "proyectomedbyte",
    storageBucket: "proyectomedbyte.appspot.com",
    messagingSenderId: "98100301580",
    appId: "1:98100301580:web:23cd0e7cbda061e3530329"
};

let lista;
let ini;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getUser(db, id) {

    const personasColection = collection(db, 'personas');
    const personasSnapshot = await getDocs(personasColection);
    const personasList = personasSnapshot.docs.map(doc => doc.data());
    let firstElement = personasList[id];
    let datos = [firstElement["correo"], firstElement["contrasena"], firstElement["nombre"]];
    lista = personasList;
    return datos;
}




function Inicio() {

    const navigate = useNavigate();


    useEffect(() => {
        if (localStorage.getItem("inicioSesion") === "true") {
            navigate("/home");
        }
        getUser(db, 0).then((data) => {
            ini = (data);
        });
    },[db]);

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [ingresoCorrecto, setIngresoCorrecto] = useState(false);

    function validacion(correoI, contrasenaI) {

        let validador = false;
        let i = 0;
        while (i < lista.length && ingresoCorrecto === false) {

            let datosU = lista[i];

            if (correoI == datosU.correo && contrasenaI == datosU.contrasena) {
                setIngresoCorrecto(true);
                localStorage.setItem("inicioSesion", "true");
                localStorage.setItem("id", i);
                validador = true;

            }
            else {
                setIngresoCorrecto(false);
            }
            i++;
        }
        if (!validador) {

            window.alert('Datos Incorrectos');
        }

        return validador;

    }


    return (
        <div className="inicio">
            <div className='isesion'>
                <img src="https://th.bing.com/th/id/OIP.L-Ef4AaGRNyQArVO3uAiQgAAAA?pid=ImgDet&rs=1" alt="logo medbyte" />
                <div >
                    <p>Correo Electrónico</p>
                    <input type="text" onChange={(e) => { setCorreo(e.target.value); }} />
                </div>
                <div>
                    <p>Contraseña</p>
                    <input type="password" onChange={(e) => { setContrasena(e.target.value); }} />
                </div>
                <button onClick={() => {
                    if (validacion(correo, contrasena)) {
                        navigate('/home');
                    }
                }}>Iniciar Sesion</button>
                <a href="/registro">Registrarse</a>
            </div>
        </div>
    );
}

export default Inicio;

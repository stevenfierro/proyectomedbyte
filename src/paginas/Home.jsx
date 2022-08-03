import './Home.css';
import React, { useState, useRef, useEffect } from "react";
import Grid from '../componentes/Grid';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

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


function Home() {

    const navigate = useNavigate();

    if(localStorage.getItem("inicioSesion") != "true"){
        navigate("/");
    }

    const [search, setSearch] = useState("");
    const [coins, setCoins] = useState([]);
    const [usuario, setUsuairo] = useState([]);
    const searchInput = useRef(null);
    var coinsId = ['bitcoin', 'ethereum', 'tether', 'usd-coin', 'binancecoin', 'ripple', 'binance-usd', 'cardano', 'solana', 'polkadot', 'dogecoin'];

    function handleSearch() {   
        setSearch(searchInput.current.value);
    }
    
    useEffect(() => {
        getUser(db, localStorage.getItem("id")).then((data) => {
            console.log("pide usuario")
            setUsuairo(data);
        });
        
        fetch("https://api.coingecko.com/api/v3/coins")
          .then(response => response.json())
          .then(data => setCoins(data))
        
    },[db]);

    return (
        <div className="home">
                <div className="header">
                    <img src="https://th.bing.com/th/id/OIP.L-Ef4AaGRNyQArVO3uAiQgAAAA?pid=ImgDet&rs=1" alt="Logo Medabyte" className="logo" />
                    <div className="searchBar">
                        <img className="imgSearch" src="https://icones.pro/wp-content/uploads/2021/06/icone-loupe-noir.png" alt="" />
                        <input type="text" value={search} ref={searchInput} onChange={handleSearch}/>
                    </div>
                    <div className="perfil">
                        <p> {usuario.at(2)} </p>
                        <img src="https://cdn-icons-png.flaticon.com/512/56/56805.png?w=360" alt="Cerrar Sesion" className="iconoCerrar" 
                        onClick={() => { 
                            
                            localStorage.setItem("inicioSesion", "false");
                            localStorage.setItem("id", null);
                            navigate('/');  }}/>
                    </div>

                </div>
            <Grid Coins={coinsId} search={search}></Grid>
        </div>

    );
}

export default Home;
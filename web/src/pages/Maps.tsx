import React, { Component, useEffect, useState } from 'react';
import { FiClock, FiMapPin, FiMenu, FiX } from 'react-icons/fi';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import logoImg from '../assets/images/boxicon.png';
import noImage from '../assets/images/noimage.png';
import GeoLocation from '../controller/geolocator';
import api from '../services/api';
import { ApplicationState } from '../store';
import * as StoreActions from '../store/ducks/store/actions';
import { StoreData } from '../store/ducks/store/types';
import '../styles/global.css';
import '../styles/pages/maps.css';
const { detect } = require('detect-browser');

const browser = detect();

interface Stateprops {
    stores: StoreData
}

interface DispatchProps {
    loadRequest(): void,
}

const hotel = {
    banho: '',
    cep: '',
    cidade: '',
    cnpj: '',
    complemento: '',
    domingoAbre: '',
    domingoFecha: '',
    email: '',
    estado: '',
    id: '',
    images: [{ url: '' }],
    inscricaoestadual: '',
    latitude: '',
    longitude: '',
    nome: '',
    numero: '',
    quartaAbre: '',
    quartaFecha: '',
    quintaAbre: '',
    quintaFecha: '',
    razaosocial: '',
    rua: '',
    sabadoAbre: '',
    sabadoFecha: '',
    segundaAbre: '',
    segundaFecha: '',
    sextaAbre: '',
    sextaFecha: '',
    telefone: '',
    tercaAbre: '',
    tercaFecha: '',
    user_id: '',
    website: '',
}




type Props = Stateprops & DispatchProps
function Maps(Props: Component<Props>) {
    const [markers, setMarkers] = useState([{}]);
    const [menu, setMenu] = useState(false);
    const [store, setStore] = useState(false);
    const [storeData, setStoreData] = useState(hotel)
    const [googleLink, setGoogleLink] = useState('')
    const [latitude] = useState(-23.61172);
    const [longitude] = useState(-46.54690129999999);


    useEffect(() => {
        let checkLocationSafari = () => {
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            };
            navigator.geolocation.getCurrentPosition(success, errors, options);
        }
        let checkLocationChrome = () => {
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            };
            if (navigator.geolocation) {
                navigator.permissions
                    .query({ name: "geolocation" })
                    .then(function (result) {
                        if (result.state === "granted") {
                            //If granted then you can directly call your function here
                            navigator.geolocation.getCurrentPosition(success);
                        } else if (result.state === "prompt") {
                            navigator.geolocation.getCurrentPosition(success, errors, options);
                        } else if (result.state === "denied") {
                            //If denied then you have to show instructions to enable location
                        }
                        result.onchange = function () {
                            console.log(result.state);
                        };
                    });
            } else {
                alert("Sorry Not available!");
            }
        }
        let errors = (err: { code: any; message: any; }) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        let success = async (pos: { coords: any; }) => {
            // let crd = pos.coords;

            // await setLatitude(crd.latitude);
            // await setLongitude(crd.longitude);
        }
        let getStores = async () => {
            await api.get(`/stores/location/${latitude}/${longitude}`, {
                headers: { "Access-Control-Allow-Origin": "*" }
            })
                .then(res => {
                    setMarkers(res.data)
                    console.log(res.data);
                })
        }
        if (browser.name === 'chrome') {
            checkLocationChrome()
        } else {
            checkLocationSafari()
        }
        getStores()
    }, [latitude, longitude]);

    const handleMenu = () => {
        setMenu(!menu);
    }

    const handleStore = (data: typeof hotel) => {

        let link = data.rua.replace(/\s/g, "+") + "+";
        link += data.numero.replace(/\s/g, "+") + "+";
        link += data.cidade.replace(/\s/g, "+") + "+";
        link += data.estado.replace(/\s/g, "+") + "+";
        link += data.cep.replace(/\s/g, "+");
        setGoogleLink(link);
        setStoreData(data);
        setStore(false);
        setStore(true);

    }

    return (
        <div id="page-map">
            <aside className={(menu) ? "asideOn" : "asideOff"} id="menu">
                <div className="close-cadastro" onClick={handleMenu}><FiX size={36} color="#FFF" /></div>
                <header>
                    <img src={logoImg} alt="logo" className="logo" />
                    <h2>Escolha um local no mapa</h2>
                    <p>
                        Selecione o melhor local para seu companheiro.
                        </p>
                </header>
                <footer>
                    <strong>Seu pet em boas mãos!</strong>
                </footer>
            </aside>
            <aside className={(store) ? "asideOn" : "asideOff"} id="store-detail" >
                <div className="close-cadastro" onClick={() => { setStore(false) }}><FiX size={36} color="#303030" /></div>
                <header>
                    <div className="details-image">
                        <img src={(storeData.images.length > 0) ? storeData.images[0].url : noImage} alt="logo" className="logo" />
                    </div>
                    <h2>{storeData.nome}</h2>
                </header>
                <main className="details-main">
                    <div className="details-address">
                        <FiMapPin size={25} color="#fff" />
                        <a href={`https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${googleLink}`}>{storeData.rua}, {storeData.numero} {storeData.complemento}
                            <br />{storeData.cidade}, {storeData.estado} - {storeData.cep}
                        </a>
                    </div>
                    <div className="details-horario">
                        <FiClock size={25} color="#fff" />
                        <ul>
                            <li>Domingo: {storeData.domingoAbre}:00 - {storeData.domingoFecha}:00</li>
                            <li>Segunda-feira: {storeData.segundaAbre}:00 - {storeData.segundaFecha}:00</li>
                            <li>Terca-feira: {storeData.tercaAbre}:00 - {storeData.tercaFecha}:00</li>
                            <li>Quarta-feira: {storeData.quartaAbre}:00 - {storeData.quartaFecha}:00</li>
                            <li>Quinta-feira: {storeData.quintaAbre}:00 - {storeData.quintaFecha}:00</li>
                            <li>Sexta-feira: {storeData.sextaAbre}:00 - {storeData.sextaFecha}:00</li>
                            <li>Sabado: {storeData.sabadoAbre}:00 - {storeData.sabadoFecha}:00</li>

                        </ul>
                    </div>
                </main>
                <footer>

                </footer>
            </aside>

            <GeoLocation latitude={latitude} longitude={longitude} handleStore={handleStore} markers={markers} />


            <div className="create-store" onClick={handleMenu}>
                <FiMenu size={32} color="#FFF" />
            </div>
        </div>
    );

}

const mapStateToProps = (state: ApplicationState) => ({
    store: state.stores,
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(StoreActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
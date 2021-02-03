import React, { Component, useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import logoImg from '../assets/images/boxicon.png';
import GeoLocation from '../controller/geolocator';
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

type Props = Stateprops & DispatchProps
function Maps(Props: Component<Props>) {
    const [markers, setMarkers] = useState([{}]);
    const [menu, setMenu] = useState(false);
    const [store, setStore] = useState(false);
    const [latitude, setLatitude] = useState(39.2008613);
    const [longitude, setLongitude] = useState(-122.9176757);
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    useEffect(() => {
        let checkLocationSafari = () => {
            navigator.geolocation.getCurrentPosition(success, errors, options);
        }
        let checkLocationChrome = () => {
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
        let success = (pos: { coords: any; }) => {
            let crd = pos.coords;

            setLatitude(crd.latitude);
            setLongitude(crd.longitude);
            const storeImg = require('../assets/images/luna.jpg');

            setMarkers([
                {
                    nome: 'Zoomies',
                    endereco: '66 10th Street Unit 130 Columbia Square Plaza, New Westminster, BC V3M 1A6',
                    lat: 49.201058475823324,
                    lon: -122.91662119296326,
                    img: storeImg,
                    email: 'zoomie@gmail.com',
                    tel: '6047151583',
                    rating: '5',
                    website: 'www.zoomie.com',
                }
            ])
        }
        if (browser.name === 'chrome') {
            checkLocationChrome()
        } else {
            checkLocationSafari()
        }
    });

    const handleMenu = () => {
        setMenu(!menu);
    }

    const handleStore = () => {
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
                    <img src={logoImg} alt="logo" className="logo" />
                    <h2>Teste</h2>
                    <p>
                        Selecione o melhor local para seu companheiro.
                        </p>
                </header>
                <footer>
                    <strong>Seu pet em boas mãos!</strong>
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
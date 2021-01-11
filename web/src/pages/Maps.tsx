import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoImg from '../assets/images/boxicon.png';
import GeoLocation from '../controller/geolocator';
import '../styles/global.css';
import '../styles/pages/maps.css';
const { detect } = require('detect-browser');

const browser = detect();

function Maps() {
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
            setLongitude(crd.longitude)
        }

        if (browser.name === 'safari') {
            checkLocationSafari()
        } else {
            checkLocationChrome()
        }
    });

    return (
        <div id="page-map">
            <aside>
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

            <GeoLocation latitude={latitude} longitude={longitude} />


            <Link to="/map" className="create-store">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );

}

export default Maps;
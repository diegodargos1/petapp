import React from 'react'
import '../styles/global.css';
import '../styles/pages/maps.css';
import logoImg from '../images/boxicon.png'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

function Maps() {
    const position = [49.2008613, -122.9176757];
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

            <MapContainer style={{ width: "100%", height: "100%" }} center={[49.2008613, -122.9176757]} zoom={13} >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGllZ29kYXJnb3MiLCJhIjoiY2tpeWJtNDB5MTl0bTJyc2I0NXFsd2QzZCJ9.ZGbQTFhhMzvvky1L3A5RLA`}
                />
                <Marker position={[49.2008613, -122.9176757]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>

            <Link to="/map" className="create-store">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default Maps;
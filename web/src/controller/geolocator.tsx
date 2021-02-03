import L from 'leaflet';
import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import logoImg from '../assets/images/marker.png';

function MyComponent(props: { latitude: number; longitude: number; }) {
    const map = useMap();
    //map.setCenter([props.latitude, props.longitude])
    map.setView([props.latitude, props.longitude], 13);
    return null;
}

let logoIcon = L.icon({
    iconUrl: logoImg,
    iconRetinaUrl: logoImg,
    iconAnchor: [25, 45],
    popupAnchor: [-4, -4],
    // iconSize: [25, 55],
});

function GeoLocation(props: { latitude: number; longitude: number; handleStore: Function; markers: Array<Object> }) {

    return (
        <MapContainer style={{ width: "100%", height: "100%" }} center={[props.latitude, props.longitude]} zoom={13} >
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGllZ29kYXJnb3MiLCJhIjoiY2tpeWJtNDB5MTl0bTJyc2I0NXFsd2QzZCJ9.ZGbQTFhhMzvvky1L3A5RLA`}
            />
            <MyComponent latitude={props.latitude} longitude={props.longitude} />

            <Marker position={[props.latitude, props.longitude]} eventHandlers={{
                click: () => {
                    props.handleStore()
                }
            }}>
            </Marker>
            {/* {markers.map((m) => {
                <Marker icon={logoIcon} position={[m.lat, m.lon]}>

                </Marker>
            })} */}

            <Marker icon={logoIcon} position={[props.latitude + 0.03, props.longitude]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
            </Marker>
            <Marker icon={logoIcon} position={[props.latitude, props.longitude + 0.02]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
            </Marker>
        </MapContainer>
    );
}
export default GeoLocation;
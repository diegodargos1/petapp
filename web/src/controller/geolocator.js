import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import logoImg from '../assets/images/marker.png'
import L from 'leaflet';


function MyComponent(props) {
    const map = useMap();
    //map.setCenter([props.latitude, props.longitude])
    map.setView([props.latitude, props.longitude], 13)
    return null
}

let loveIcon = L.icon({
    iconUrl: logoImg,
    iconRetinaUrl: logoImg,
    iconAnchor: [50, 60],
    // popupAnchor: [10, -44],
    // iconSize: [25, 55],
});

function GeoLocation(props) {

    return (
        <MapContainer style={{ width: "100%", height: "100%" }} center={[props.latitude, props.longitude]} zoom={13} >
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGllZ29kYXJnb3MiLCJhIjoiY2tpeWJtNDB5MTl0bTJyc2I0NXFsd2QzZCJ9.ZGbQTFhhMzvvky1L3A5RLA`}
            />
            <MyComponent latitude={props.latitude} longitude={props.longitude} />
            <Marker icon={loveIcon} position={[props.latitude, props.longitude]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
            </Marker>
            <Marker icon={loveIcon} position={[props.latitude + 3, props.longitude]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
            </Marker>
        </MapContainer>
    );
}
export default GeoLocation;
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'


function MyComponent(props) {
    const map = useMap();
    //map.setCenter([props.latitude, props.longitude])
    map.setView([props.latitude, props.longitude], 13)
    return null
}
function GeoLocation(props) {

    return (
        <MapContainer style={{ width: "100%", height: "100%" }} center={[props.latitude, props.longitude]} zoom={13} >
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGllZ29kYXJnb3MiLCJhIjoiY2tpeWJtNDB5MTl0bTJyc2I0NXFsd2QzZCJ9.ZGbQTFhhMzvvky1L3A5RLA`}
            />
            <MyComponent latitude={props.latitude} longitude={props.longitude} />
            <Marker className='leaflet-div-icon' position={[props.latitude, props.longitude]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
            </Marker>
            <Marker className='leaflet-div-icon' position={[props.latitude + 3, props.longitude]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
            </Marker>
        </MapContainer>
    );
}
export default GeoLocation;
import L from 'leaflet';
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import logoImg from '../assets/images/marker.png';

let logoIcon = L.icon({
    iconUrl: logoImg,
    iconRetinaUrl: logoImg,
    iconAnchor: [25, 45],
    popupAnchor: [-4, -4],
    // iconSize: [25, 55],
});

function GeoLocation(props: { latitude: number; longitude: number; handleStore: Function; markers: any }) {
    console.log(props.markers)
    return (
        // <MapContainer style={{ width: "100%", height: "100%" }} center={[-23.6436397, -46.55689330000001]} zoom={13} >
        <MapContainer style={{ width: "100%", height: "100%" }} center={[props.latitude, props.longitude]} zoom={13} >
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGllZ29kYXJnb3MiLCJhIjoiY2tpeWJtNDB5MTl0bTJyc2I0NXFsd2QzZCJ9.ZGbQTFhhMzvvky1L3A5RLA`}
            />
            {/* <MyComponent latitude={props.latitude} longitude={props.longitude} /> */}

            <Marker position={[props.latitude, props.longitude]}>
            </Marker>
            {
                (props.markers.info !== undefined) ?

                    props.markers.info.map((m: { latitude: number; longitude: number; }) => {
                        return (
                            < Marker icon={logoIcon} key={m.latitude} position={[m.latitude, m.longitude]} eventHandlers={{
                                click: () => {
                                    props.handleStore(m)
                                }
                            }
                            } />
                        );
                    })
                    : ""
            }

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
        </MapContainer >
    );
}
export default GeoLocation;
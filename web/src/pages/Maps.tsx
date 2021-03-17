import { setHours, setMinutes } from 'date-fns';
import React, { Component, useEffect, useState } from 'react';
import { FiMail, FiMapPin, FiMenu, FiPhone, FiX } from 'react-icons/fi';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import logoImg from '../assets/images/boxicon.png';
import dogImage from '../assets/images/zoomie.jpeg';
import Banho from '../components/agendar/banho';
import Hotel from '../components/agendar/hotel';
import CadastrarBox from '../components/cadastrarBox';
import AgendarMenu from '../components/menu/agendar';
import PersonalItems from '../components/menu/loggedItems';
import NonPersonalItems from '../components/menu/nonloggedItems';
import Message from '../components/message';
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

const hoteldata = {
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
    const [storeData, setStoreData] = useState(hoteldata)
    const [googleLink, setGoogleLink] = useState('')
    const [latitude] = useState(-23.61172);
    const [longitude] = useState(-46.54690129999999);
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState(false);
    const [loginBox, setLoginBox] = useState(false);
    const [banho, setBanho] = useState(false);
    const [banhoDate, setBanhoDate] = useState(setHours(setMinutes(new Date(), 0), 9))
    const [hotel, setHotel] = useState(false);
    const [hotelDate, setHotelDate] = useState(setHours(setMinutes(new Date(), 0), 9))
    const [message, setMessage] = useState("");
    const [messageBox, setMessageBox] = useState(false);

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
            if (localStorage.getItem('userId')) setLogin(true);

            await api.get(`/stores/location/${latitude}/${longitude}`, {
                headers: { "Access-Control-Allow-Origin": "*" }
            })
                .then(res => {
                    setMarkers(res.data);
                    setLoading(false);
                })
        }
        if (browser.name === 'chrome') {
            checkLocationChrome();
        } else {
            checkLocationSafari();
        }
        getStores()
    }, [latitude, longitude]);

    const handleStore = (data: typeof hoteldata) => {
        if (menu) handleMenu();
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

    const handleMenu = () => {
        setMenu(!menu);
    }

    const handleLoginBox = () => {
        setLoginBox(!loginBox);
    }

    const handleLoading = () => {
        setLoading(!loading);
    }

    const handleLogin = () => {
        setLogin(!login);
    }
    const handleLogout = () => {
        setLogin(!login);
        localStorage.clear();
    }
    const handleBanho = () => {
        setBanho(!banho);
    }
    const handleHotel = () => {
        setHotel(!hotel);
    }

    const handleBanhoSalvar = async () => {
        handleBanho();
        await setMessage(
            "Banho agendado para " + banhoDate
        )
        setMessageBox(true);
        setInterval(function () { setMessageBox(false); }, 5000);
        console.log(banhoDate);
    }
    const handleHotelSalvar = async () => {
        handleHotel();
        await setMessage(
            "Hotel agendado para " + hotelDate
        )
        setMessageBox(true);
        setInterval(function () { setMessageBox(false); }, 5000);
    }

    return (
        <div id="page-map">
            <div className="loading-box" style={{ display: (loading ? "flex" : "none") }}>
                <div className="loadingDiv" ></div>
            </div>
            <div className="loading-box" style={{ display: (loginBox) ? "flex" : "none" }} >
                <div className="cadastrar-login-box">
                    <div className="close-cadastro" onClick={handleLoginBox}><FiX size={26} color="rgba(0,0,0,0.6)" /></div>
                    <CadastrarBox display={loginBox} loading={handleLoading} redirect={() => { handleLogin(); handleLoginBox(); }}></CadastrarBox>
                </div>
            </div>
            <div className="loading-box" style={{ display: (messageBox) ? "flex" : "none" }} >
                <Message txt={message} handleClose={setMessageBox} />
            </div>
            <div className="loading-box" style={{ display: (banho) ? "flex" : "none" }} >
                <Banho box={banho} handleBanhoSalvar={handleBanhoSalvar} handleBox={handleBanho} banhoDate={banhoDate} setBanhoDate={setBanhoDate} />
            </div>
            <div className="loading-box" style={{ display: (hotel) ? "flex" : "none" }} >
                <Hotel box={hotel} handleHotelSalvar={handleHotelSalvar} handleBox={handleHotel} hotelDate={hotelDate} setHotelDate={setHotelDate} />
            </div>
            <aside className={(menu) ? "asideOn" : "asideOff"} id="menu">
                <div className="close-cadastro" onClick={handleMenu}><FiX size={36} color="#FFF" /></div>
                <header>
                    <img src={logoImg} alt="logo" className="logo" />
                    <h2>Bem vindo ao DogMap</h2>
                </header>
                <main>
                    <div>
                        <input type="text" placeholder="Busque pelo Petshop ou Endereco"></input>
                        <div className="box-buttons">
                            <button className="search">
                                Buscar
                                    </button>
                        </div>
                    </div>
                    <div className="menuLink">
                        <ul>
                            {(login) ?
                                <PersonalItems handleLogout={handleLogout} />
                                :
                                <NonPersonalItems handleLoginBox={handleLoginBox} />
                            }

                            <li></li>
                        </ul>
                    </div>
                </main>
                <footer>
                    <strong>Seu pet em boas mãos!</strong>
                </footer>
            </aside>
            <aside className={(store) ? "asideOn" : "asideOff"} id="store-detail" >
                <div className="close-cadastro" onClick={() => { setStore(false) }}><FiX size={36} color="#303030" /></div>
                <header>
                    <div className="details-image">
                        {/* <img src={(storeData.images.length > 0) ? storeData.images[0].url : noImage} alt="logo" className="logo" /> */}
                        <img src={dogImage} alt="logo" className="Imagem Loja" />

                    </div>
                    <h2>{storeData.nome}</h2>
                </header>
                <main className="details-main">

                    <div className="menuLink">
                        <ul>
                            <AgendarMenu handleBanho={handleBanho} handleHotel={handleHotel} />
                            {/* <li>
                                <FiMapPin size={25} color="#fff" />
                                <a id="address" href={`https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${googleLink}`}>{storeData.rua}, {storeData.numero} {storeData.complemento}
                                    <br />{storeData.cidade}, {storeData.estado} - {storeData.cep}
                                </a>
                            </li> */}
                        </ul>
                    </div>
                    <div className="menuLink info">
                        <ul>
                            <li>
                                <FiMapPin className="icon" size={25} color="#fff" />
                                <a className="detail-store" href={`https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${googleLink}`}>{storeData.rua}, {storeData.numero} {storeData.complemento}
                                    <br />{storeData.cidade}, {storeData.estado} - {storeData.cep}
                                </a>
                            </li>
                            {(storeData.email) ? <li>
                                <FiMail className="icon" size={25} color="#fff" />
                                <a className="detail-store" href={storeData.email}>{storeData.email}
                                </a>
                            </li> : ""}
                            {(storeData.telefone) ? <li>
                                <FiPhone className="icon" size={25} color="#fff" />
                                <a className="detail-store" href={storeData.telefone}>{storeData.telefone}
                                </a>
                            </li> : ""}


                        </ul>
                    </div>
                    {/* <div className="details-horario">
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
                    </div> */}
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
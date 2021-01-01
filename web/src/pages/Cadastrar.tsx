import React, { useState } from 'react'
import '../styles/global.css';
import '../styles/pages/cadastrar.css';
import logoImg from '../assets/images/boxicon.png'
import LoginFacebook from '../components/facebook'
import { Link } from 'react-router-dom'


function Cadastrar() {
    let [ isHidden, setIsHidden ] = useState(false);

    const toggleHidden = () => {
        setIsHidden(!isHidden);
    }

    return (
        <div id="page-cadastrar">
            <div className="content-wrapper">
                <img src={logoImg} alt="logo" className="logo" />
                <main>
                    <h1>
                        Cadastre-se
                    </h1>
                    <p>
                        E rapido e facil.
                    </p>
                    <div className={"div-face"}>
                    <LoginFacebook />
                        {/* <button className={"create-store-face"} onClick={toggleHidden}>
                            Cadastrar com Facebook
                        </button> */}
                    </div>
                    <div className="separator">OU</div>
                    <div className={"form-box"}>
                        <div>
                            <form className={"form-signin" } action="">
                                <div className="field">
                                    <input type="text" name="email" id="email" placeholder="email@email.com" />
                                    <label htmlFor="email">Email</label>
                                </div>
                                
                                <div className="field">
                                    <input type="password" name="password" id="password" placeholder="******"/>
                                    <label htmlFor="password">Senha</label>
                                </div>
                                <div className="field">
                                    <input type="password" name="confirma" id="confirma" placeholder="******"/>
                                    <label htmlFor="confirma">Repetir senha</label>
                                </div>
                                <div className="box-buttons">
                                    <button className="create-store-register" >
                                        Cadastrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
                <div className="location">
                    {/* <Link to="/map" className="loginLink">
                        Entrar
                    </Link> */}
                </div>
            </div>
        </div>
    );
}

export default Cadastrar;
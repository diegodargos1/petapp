import React from 'react'
import '../styles/global.css';
import '../styles/pages/cadastrar.css';
import logoImg from '../assets/images/boxicon.png'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'


function Cadastrar() {
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
                    <form className="form-signin"action="">
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
                            <label htmlFor="confirma">Confirmar</label>
                        </div>
                        <div>
                            <button className="create-store">
                                Cadastrar
                            </button>
                        </div>
                        
                </form>
                </main>
                <div className="location">
                    <Link to="/map" className="loginLink">
                        Entrar
                    </Link>
                    <Link to="/cadastrar" className="loginLink">
                        Cadastrar
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Cadastrar;
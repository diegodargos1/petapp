import React from 'react'
import '../styles/global.css';
import '../styles/pages/landing.css';
import logoImg from '../assets/images/boxicon.png'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'


function Landing() {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="logo" className="logo" />
                <main>
                    <h1>
                        Encontre o lugar certo para seu pet.
            </h1>
                    <p>
                        Diversas creches, petshops e hoteis para cães e gatos.
            </p>
                </main>
                <div className="location">
                    <Link to="/map" className="loginLink">
                        Entrar
                    </Link>
                    <Link to="/cadastrar" className="loginLink">
                        Cadastrar
                    </Link>
                </div>
                <Link to="/map" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
                </Link>
            </div>
        </div>
    );
}

export default Landing;
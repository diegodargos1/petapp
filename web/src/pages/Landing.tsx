import React, { Component } from 'react';
import { FiX } from 'react-icons/fi';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import logoImg from '../assets/images/boxicon.png';
import Cadastrar from '../components/cadastrar';
import { ApplicationState } from '../store';
import * as UserActions from '../store/ducks/users/actions';
import { UserData } from '../store/ducks/users/types';
import '../styles/global.css';
import '../styles/pages/landing.css';

interface Stateprops {
    users: UserData
}

interface DispatchProps {
    loadRequest(): void
}

interface Ownprops {

}
type Props = Stateprops & DispatchProps & Ownprops
class Landing extends Component<Props> {
    state = {
        loading: false,
        cadastrar: false
    }

    render() {
        const { users } = this.props

        //const cadastro = (users.email == "") ? `` : '';
        const handleCadastrar = () => {
            this.setState({
                cadastrar: !this.state.cadastrar
            })
        }
        return (
            <div id="page-landing">
                <div className="loadingDiv" style={{ display: (this.state.loading ? "block" : "none") }}></div>
                <div id="page-cadastrar" style={{ display: (this.state.cadastrar) ? "flex" : "none" }} >
                    <div className="content-wrapper-cadastrar">
                        <div className="close-cadastro" onClick={handleCadastrar}><FiX size={26} color="rgba(0,0,0,0.6)" /></div>
                        <Cadastrar display={this.state.cadastrar}></Cadastrar>
                    </div>
                </div>
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

                    {(users.email !== "") ?
                        <div className="location">
                            {/* <Link to="/map" className="loginLink">
                                Entrar
                        </Link> */}
                            <ul>
                                <li>
                                    <div className="loginLink"  >
                                        Entrar
                                    </div>
                                </li>
                                <li>
                                    <div className="loginLink" onClick={handleCadastrar}>
                                        Cadastrar
                                    </div>
                                </li>
                            </ul>


                        </div>
                        :
                        ''
                    }


                    <Link to="/map" className="enter-app">
                        Abrir Mapa
                    </Link>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state: ApplicationState) => ({
    users: state.users.info,
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
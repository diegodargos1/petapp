import React, { Component } from 'react';
import { FiX } from 'react-icons/fi';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import logoImg from '../assets/images/boxicon.png';
import CadastrarHotel from '../components/cadastrarHotel';
import ListaHoteisUser from '../components/listaHoteisUser';
import { ApplicationState } from '../store';
import * as UserActions from '../store/ducks/users/actions';
import { UserData } from '../store/ducks/users/types';
import '../styles/global.css';
import '../styles/pages/landingstore.css';
import '../styles/pages/landingstore.scss';

interface Stateprops {
    users: UserData
}

interface DispatchProps {
    loadRequest(): void
}

interface Ownprops extends RouteComponentProps<any> {

}
type Props = Stateprops & DispatchProps & Ownprops
class Dashboard extends Component<Props> {
    state = {
        loading: false,
        name: localStorage.getItem('userName'),
        form: true,
        lista: false,
        data: {},
        modal: false,
        modalTxt: ""
    }

    async componentDidMount() {
        const id = localStorage.getItem('userId');
        const email = localStorage.getItem('user');
        if (id == null || email == null) {
            this.props.history.push("/");
        }
    }

    render() {
        const handleLoading = () => {
            this.setState({
                loading: !this.state.loading,
            })
        }

        const handleForm = (i: any) => {
            this.setState({
                form: true,
                lista: false,
                data: i
            })
        }

        const handleLista = () => {
            this.setState({
                form: false,
                lista: true
            })
        }

        const handleLogout = () => {
            localStorage.clear();
            this.props.history.push("/");
        }
        const handleModal = (t: any) => {
            this.setState({
                modal: !this.state.modal,
                modalTxt: t
            })
        }

        const redirect = () => {
            this.props.history.push("/");
        }

        return (
            <div id="page-landingstore">
                <div className="loading-box" style={{ display: (this.state.loading ? "flex" : "none") }}>
                    <div className="loadingDiv" ></div>
                </div>
                <div className="loading-box" style={{ display: (this.state.modal ? "flex" : "none") }} onClick={handleModal}>
                    <div className="modalDiv" >
                        <div className="close" onClick={handleModal}><FiX size={25} /></div>
                        <img src={logoImg} alt="logo" className="logo" />
                        <h3>{this.state.modalTxt}</h3>
                    </div>
                </div>

                <div className="content-wrapper-dashboard">
                    <main >
                        <img src={logoImg} alt="logo" className="logo" />
                        <h2>
                            Bem vindo <br />{this.state.name}.
                        </h2>
                        <p>
                            Registre seu hotel/creche.
                        </p>
                        <button id="button-store" className="learn-more" onClick={handleForm}>
                            <span className="circle" aria-hidden="true">
                                <span className="icon arrow"></span>
                            </span>
                            <span className="button-text">Novo Hotel</span>
                        </button>
                        <button id="button-store" className="learn-more" onClick={handleLista}>
                            <span className="circle" aria-hidden="true">
                                <span className="icon arrow"></span>
                            </span>
                            <span className="button-text">Listar Hoteis</span>
                        </button>
                        <button id="button-store" className="learn-more" onClick={handleLogout}>
                            <span className="circle" aria-hidden="true">
                                <span className="icon arrow"></span>
                            </span>
                            <span className="button-text">Sair</span>
                        </button>
                    </main>
                    <div id="page-cadastrar-hotel" >
                        <div className="content-wrapper-cadastrar" >
                            {(this.state.form) ? <CadastrarHotel modal={handleModal} loading={handleLoading} redirect={redirect} data={this.state.data}></CadastrarHotel> : ""}
                            {(this.state.lista) ? <ListaHoteisUser loading={handleLoading} redirect={redirect} edit={handleForm}></ListaHoteisUser> : ""}

                        </div>
                    </div>
                </div>
            </div >

        );
    }
}


const mapStateToProps = (state: ApplicationState) => ({
    users: state.users.info,
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
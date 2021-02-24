import React from 'react';
import { FiEye } from 'react-icons/fi';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import logoImg from '../assets/images/boxicon.png';
import api from '../services/api';
import { ApplicationState } from '../store';
import * as UserActions from '../store/ducks/users/actions';
import { UserData } from '../store/ducks/users/types';
import '../styles/global.css';
import '../styles/pages/cadastrarbox.css';


interface Stateprops {
    users: UserData,
}

interface DispatchProps {
    loadRequest(): void,
}

interface Ownprops {
    display: boolean
    loading: Function
    redirect: Function
}

type Props = Stateprops & DispatchProps & Ownprops

class CadastrarBox extends React.Component<Props> {
    private pwInput: React.RefObject<HTMLInputElement>;
    private nomeInput: React.RefObject<HTMLInputElement>;
    private emailInput: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        this.pwInput = React.createRef();
        this.nomeInput = React.createRef();
        this.emailInput = React.createRef();
    }

    state = {
        email: "",
        emailCheck: false,
        emailTxt: "Email*",
        emailColor: "black",
        password: "",
        passwordCheck: false,
        passwordColor: "black",
        passwordTxt: "Senha*",
        nome: "",
        nomeColor: "black",
        pViewer: false,
        textInput: React.createRef(),
        loading: false,
        cadastrar: false,
        entrar: false
    }


    render() {
        const handleInput = (id: React.FormEvent<HTMLInputElement>) => {
            if (id.currentTarget.id === "email") {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const email = re.test(id.currentTarget.value);
                this.setState({
                    emailCheck: email
                })
            }

            if (id.currentTarget.id === "password") {
                const re = /^(?=.*\d+)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%]{6,10}$/
                const pw = re.test(id.currentTarget.value);
                this.setState({
                    passwordCheck: pw
                });
            }
            this.setState({
                [id.currentTarget.id]: id.currentTarget.value
            })
        }
        const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!this.state.passwordCheck) {
                this.pwInput.current?.focus()
                this.setState({
                    passwordTxt: "A senha deve ter letras, numeros, minimo de 6 digitos e maximo de 10.",
                    passwordColor: "red"
                })
            } else if (!this.state.emailCheck) {
                this.emailInput.current?.focus()
                this.setState({
                    emailTxt: "Email invalido.",
                    emailColor: "red"
                })
            } else if (this.state.nome === "") {
                this.nomeInput.current?.focus()
                this.setState({
                    nomeColor: "red"
                })
            } else {
                this.props.loading();
                await api.post(`/users`, this.state, {
                    headers: { "Access-Control-Allow-Origin": "*" }
                })
                    .then(res => {
                        this.props.loading();
                        if (res.data.error) {
                            alert(res.data.msg);
                        } else {
                            localStorage.setItem('user', res.data.info.email);
                            localStorage.setItem('userName', res.data.info.nome);
                            localStorage.setItem('userId', res.data.info.id);
                            this.props.redirect()
                        }
                    })
            }
        }

        const formSubmitEntrar = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!this.state.passwordCheck) {
                this.pwInput.current?.focus()
                this.setState({
                    passwordTxt: "Senha incorreta.",
                    passwordColor: "red"
                })
            } else if (!this.state.emailCheck) {
                this.emailInput.current?.focus()
                this.setState({
                    emailTxt: "Email invalido.",
                    emailColor: "red"
                })
            } else {
                this.props.loading();
                await api.post(`/users/login`, this.state, {
                    headers: { "Access-Control-Allow-Origin": "*" }
                })
                    .then(res => {
                        this.props.loading();
                        if (res.data.error) {
                            alert(res.data.msg);
                        } else {
                            localStorage.setItem('user', res.data.info.email);
                            localStorage.setItem('userName', res.data.info.name);
                            localStorage.setItem('userId', res.data.info.id);
                            this.props.redirect()
                        }

                    })
            }
        }

        const handlePviewer = () => {
            this.setState({ pViewer: !this.state.pViewer })
        }

        const handleCadastroForm = () => {
            this.setState({ cadastrar: !this.state.cadastrar })
            this.setState({ entrar: false })
        }

        const handleEntrarForm = () => {
            this.setState({ entrar: !this.state.entrar })
            this.setState({ cadastrar: false })
        }
        const handleEntrarFace = async (data: any) => {
            this.props.loading();
            await api.post(`/users/face`, data, {
                headers: { "Access-Control-Allow-Origin": "*" }
            })
                .then(res => {
                    this.props.loading();
                    if (res.data.error) {
                        alert(res.data.msg);
                    } else {
                        localStorage.setItem('user', res.data.info.email);
                        localStorage.setItem('userName', res.data.info.name);
                        localStorage.setItem('userId', res.data.info.id);
                        this.props.redirect()
                    }
                })

        }

        return (
            <>
                <img src={logoImg} alt="logo" className="logo-cadastrar" />
                <div className="main-box">
                    <h1>
                        Cadastre-se
                    </h1>
                    <p>
                        E rapido e facil.
                    </p>
                    {/* <div className={"div-face"}>
                        <LoginFacebook loading={this.props.loading} redirect={this.props.redirect} />
                    </div> */}

                    <div className={"form-box"}>
                        <div className="box-buttons" style={{ display: (this.state.entrar || this.state.cadastrar) ? "none" : "flex" }}>
                            <button className="create-store-register" onClick={handleEntrarForm}>
                                Entrar
                            </button>
                        </div>
                        <div>
                            <form className={"form-signin"} onSubmit={formSubmitEntrar} style={{ display: (this.state.entrar) ? "block" : "none" }}>
                                <div className="field">
                                    <input type="text" ref={this.emailInput} name="email" id="email" placeholder="email@email.com" onChange={handleInput} />
                                    <label style={{ color: this.state.emailColor }} htmlFor="email">{this.state.emailTxt}</label>
                                </div>

                                <div className="field">
                                    <div className="p-viewer" onClick={handlePviewer}>
                                        <FiEye size={26} color="rgba(0,0,0,0.6)"></FiEye>
                                    </div>

                                    <input type={this.state.pViewer ? "text" : "password"} ref={this.pwInput} name="password" id="password" placeholder="******" onChange={handleInput} />
                                    <label style={{ color: this.state.passwordColor }} htmlFor="password">{this.state.passwordTxt}</label>
                                </div>
                                <div className="box-buttons">
                                    <button className="create-store-register">
                                        Entrar
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="separator">OU</div>
                        <div className="box-buttons" style={{ display: (this.state.cadastrar) ? "none" : "flex" }}>
                            <button className="create-store-register" onClick={handleCadastroForm}>
                                Cadastrar
                            </button>
                        </div>
                        <div>
                            <form className={"form-signin"} onSubmit={formSubmit} style={{ display: (this.state.cadastrar) ? "block" : "none" }}>
                                <div className="field">
                                    <input type="text" ref={this.nomeInput} name="nome" id="nome" placeholder="Seu nome" onChange={handleInput} />
                                    <label style={{ color: this.state.nomeColor }} htmlFor="nome">Nome*</label>
                                </div>
                                <div className="field">
                                    <input type="text" ref={this.emailInput} name="email" id="email" placeholder="email@email.com" onChange={handleInput} />
                                    <label style={{ color: this.state.emailColor }} htmlFor="email">{this.state.emailTxt}</label>
                                </div>

                                <div className="field">
                                    <div className="p-viewer" onClick={handlePviewer}>
                                        <FiEye size={26} color="rgba(0,0,0,0.6)"></FiEye>
                                    </div>

                                    <input type={this.state.pViewer ? "text" : "password"} ref={this.pwInput} name="password" id="password" placeholder="******" onChange={handleInput} />
                                    <label style={{ color: this.state.passwordColor }} htmlFor="password">{this.state.passwordTxt}</label>
                                </div>
                                <div className="box-buttons">
                                    <button className="create-store-register">
                                        Cadastrar
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                <div className="location">
                    {/* <Link to="/map" className="loginLink">
                        Entrar
                    </Link> */}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    users: state.users.info,
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CadastrarBox);
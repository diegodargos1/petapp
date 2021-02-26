import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { checkField, handleMask } from '../controller/inputCheck';
import api from '../services/api';
import { ApplicationState } from '../store';
import * as UserActions from '../store/ducks/users/actions';
import { UserData } from '../store/ducks/users/types';
import '../styles/global.css';
import '../styles/pages/cadastrarhotel.css';
import '../styles/pages/switchBtn.css';

interface Stateprops {
    users: UserData,
}

interface DispatchProps {
    loadRequest(): void,
}

interface Ownprops {
    loading: Function
    redirect: Function
    data?: Store
}

interface Store {
    [key: string]: any;
    id?: any;
    nome?: any;
    razaosocial?: any;
    inscricaoestadual?: any;
    cnpj?: any;
    website?: any;
    telefone?: any;
    numero?: any;
    complemento?: any;
    email?: any;
    cep?: any;
    cidade?: any;
    estado?: any;
    rua?: any;
    latitude?: any;
    longitude?: any;
    domingoAbre?: any;
    domingoFecha?: any;
    segundaAbre?: any;
    segundaFecha?: any;
    tercaAbre?: any;
    tercaFecha?: any;
    quartaFecha?: any;
    quartaAbre?: any;
    quintaAbre?: any;
    quintaFecha?: any;
    sextaAbre?: any;
    sextaFecha?: any;
    sabadoAbre?: any;
    sabadoFecha?: any;
    banho?: any;
    images?: [];
}

type Props = Stateprops & DispatchProps & Ownprops

// type Keys = {
//     domingoAbre: any;
//     domingoFecha: any;
//     segundaAbre: any;
//     segundaFecha: any;
//     tercaAbre: any;
//     tercaFecha: any;
//     quartaFecha: any;
//     quartaAbre: any;
//     quintaAbre: any;
//     quintaFecha: any;
//     sextaAbre: any;
//     sextaFecha: any;
//     sabadoAbre: any;
//     sabadoFecha: any;
// }

class CadastrarHotel extends React.Component<Props> {
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
        id: (this.props.data?.id) ? this.props.data.id : "",
        nome: (this.props.data?.nome) ? this.props.data.nome : "",
        razao: (this.props.data?.razaosocial) ? this.props.data.razaosocial : "",
        inscricao: (this.props.data?.inscricaoestadual) ? this.props.data.inscricaoestadual : "",
        cnpj: (this.props.data?.cnpj) ? this.props.data.cnpj : "",
        website: (this.props.data?.website) ? this.props.data.website : "",
        telefone: (this.props.data?.telefone) ? this.props.data.telefone : "",
        numero: (this.props.data?.numero) ? this.props.data.numero : "",
        complemento: (this.props.data?.complemento) ? this.props.data.complemento : "",
        email: (this.props.data?.email) ? this.props.data.email : "",
        cep: (this.props.data?.cep) ? this.props.data.cep : "",
        cidade: (this.props.data?.cidade) ? this.props.data.cidade : "",
        estado: (this.props.data?.estado) ? this.props.data.estado : "",
        rua: (this.props.data?.rua) ? this.props.data.rua : "",
        latitude: (this.props.data?.latitude) ? this.props.data.latitude : "",
        longitude: (this.props.data?.longitude) ? this.props.data.longitude : "",
        domingoAbre: (this.props.data?.domingoAbre) ? this.props.data.domingoAbre : "",
        domingoFecha: (this.props.data?.domingoFecha) ? this.props.data.domingoFecha : "",
        segundaAbre: (this.props.data?.segundaAbre) ? this.props.data.segundaAbre : "",
        segundaFecha: (this.props.data?.segundaFecha) ? this.props.data.segundaFecha : "",
        tercaAbre: (this.props.data?.tercaAbre) ? this.props.data.tercaAbre : "",
        tercaFecha: (this.props.data?.tercaFecha) ? this.props.data.tercaFecha : "",
        quartaFecha: (this.props.data?.quartaFecha) ? this.props.data.quartaFecha : "",
        quartaAbre: (this.props.data?.quartaAbre) ? this.props.data.quartaAbre : "",
        quintaAbre: (this.props.data?.quintaAbre) ? this.props.data.quintaAbre : "",
        quintaFecha: (this.props.data?.quintaFecha) ? this.props.data.quintaFecha : "",
        sextaAbre: (this.props.data?.sextaAbre) ? this.props.data.sextaAbre : "",
        sextaFecha: (this.props.data?.sextaFecha) ? this.props.data.sextaFecha : "",
        sabadoAbre: (this.props.data?.sabadoAbre) ? this.props.data.sabadoAbre : "",
        sabadoFecha: (this.props.data?.sabadoFecha) ? this.props.data.sabadoFecha : "",
        banho: (this.props.data?.banho) ? this.props.data.banho : 0,
        previewImages: (this.props.data?.images) ? this.props.data.images : [],
        images: (this.props.data?.images) ? this.props.data.images : [],

        userId: localStorage.getItem('userId'),
        nomeCheck: false,
        razaoCheck: false,
        inscricaoCheck: false,
        cnpjCheck: false,
        cepCheck: false,
        cidadeCheck: false,
        estadoCheck: false,
        ruaCheck: false,
        emailCheck: false,

        confirmasenha: "",
        emailTxt: "Email*",
        emailColor: "black",
        password: "",
        passwordCheck: false,
        passwordColor: "black",
        passwordTxt: "Senha*",
        nomeColor: "black",
        pViewer: false,
        textInput: React.createRef(),
        loading: false,
        cadastrar: false,
        entrar: false
    }

    render() {
        const handleCep = async (id: React.FormEvent<HTMLInputElement>) => {
            this.props.loading();
            let cep = id.currentTarget.value.replace(/[^0-9a-zA-Z]+/g, "");
            await api.get(`https://viacep.com.br/ws/${cep}/json`)
                .then(res => {
                    this.setState({
                        cidade: res.data.localidade,
                        estado: res.data.uf,
                        rua: res.data.logradouro,
                        cep: res.data.cep
                    })
                }).catch(error => {
                    return false;
                });
            this.props.loading();

        }

        const handleLimpa = (id: React.FormEvent<HTMLInputElement>) => {
            id.currentTarget.value = id.currentTarget.value.replace(/(\.|\/|-)/g, "");
        }


        const handleInput = (id: React.FormEvent<HTMLInputElement>) => {
            let field = id.currentTarget.id + 'Check';
            this.setState({
                [field]: checkField(id),
                [id.currentTarget.id]: id.currentTarget.value
            })
        }

        const handleCheckbox = (id: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                [id.currentTarget.id]: (Number(id.currentTarget.checked))
            })
        }

        // const handleSelect = (id: React.FormEvent<HTMLSelectElement>) => {
        //     this.setState({
        //         [id.currentTarget.id]: (Number(id.currentTarget.value))
        //     })
        // }

        const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            let loginCreated = false;
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
            } else if (this.state.password !== this.state.confirmasenha) {
                this.pwInput.current?.focus()
                this.setState({
                    passwordTxt: "Favor confirmar senha.",
                    passwordColor: "red"
                })
            } else {
                await api.post(`/users`, this.state, {
                    headers: { "Access-Control-Allow-Origin": "*" }
                })
                    .then(res => {
                        loginCreated = true;
                        localStorage.setItem('user', res.data.info.email);
                        localStorage.setItem('userName', res.data.info.nome);
                        localStorage.setItem('userId', res.data.info.id);
                        this.setState({ userId: res.data.info.id })
                    })
            }


            if (this.state.nome === "") alert("Campo Nome Fantasia e obrigatorio.")
            else if (this.state.razao === "") alert("Campo Razao Social e obrigatorio.")
            else if (this.state.inscricao === "") alert("Campo Inscricao Estadual e obrigatorio.")
            else if (this.state.cnpj === "") alert("Campo CNPJ e obrigatorio.")
            else if (this.state.cep === "") alert("Campo CEP e obrigatorio.")
            else if (this.state.cidade === "") alert("Campo Cidade e obrigatorio.")
            else if (this.state.estado === "") alert("Campo Estado e obrigatorio.")
            else if (this.state.rua === "") alert("Campo Rua e obrigatorio.")
            else if (this.state.numero === "") alert("Campo Numero e obrigatorio.")
            else if (!loginCreated) alert("Erro ao criar usuario e senha.")
            else {
                this.props.loading();
                await getLatLon();
                await postForm();
                this.props.loading();

            }
        }

        const postForm = async () => {
            const data = new FormData();
            data.append('name', this.state.nome)
            data.append('razaosocial', this.state.razao)
            data.append('inscricaoestadual', this.state.inscricao)
            data.append('cnpj', this.state.cnpj)
            data.append('website', this.state.website)
            data.append('telefone', this.state.telefone)
            data.append('numero', this.state.numero)
            data.append('complemento', this.state.complemento)
            data.append('email', this.state.email)
            data.append('cep', this.state.cep)
            data.append('cidade', this.state.cidade)
            data.append('estado', this.state.estado)
            data.append('rua', this.state.rua)
            data.append('latitude', String(this.state.latitude))
            data.append('longitude', String(this.state.longitude))
            data.append('domingoAbre', this.state.domingoAbre)
            data.append('domingoFecha', this.state.domingoFecha)
            data.append('segundaAbre', this.state.segundaAbre)
            data.append('segundaFecha', this.state.segundaFecha)
            data.append('tercaAbre', this.state.tercaAbre)
            data.append('tercaFecha', this.state.tercaFecha)
            data.append('quartaAbre', this.state.quartaAbre)
            data.append('quartaFecha', this.state.quartaFecha)
            data.append('quintaAbre', this.state.quintaAbre)
            data.append('quintaFecha', this.state.quintaFecha)
            data.append('sextaAbre', this.state.sextaAbre)
            data.append('sextaFecha', this.state.sextaFecha)
            data.append('sabadoAbre', this.state.sabadoAbre)
            data.append('sabadoFecha', this.state.sabadoFecha)
            data.append('banho', this.state.banho)

            this.state.images.forEach(img => {
                data.append('images', img);
            })

            const url = (this.state.id) ? `/update/stores` : `/cadastro/stores/${this.state.userId}`
            await api.post(url, data, {
                headers: { "Access-Control-Allow-Origin": "*" }
            })
                .then(res => {
                    alert(res.data.msg);
                }).catch(error => {
                    console.log(error)
                    return false;
                });
        }

        const getLatLon = async () => {
            const key = process.env.REACT_APP_TOKEN;
            const address = this.state.rua.replace(/\s/g, "+") + "+" + this.state.numero.replace(" ", "+") + "+" + this.state.cep.replace("-", "");
            await api.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${address}`)
                .then(res => {
                    if (res.data.results[0].geometry.location) {
                        this.setState({
                            latitude: res.data.results[0].geometry.location.lat,
                            longitude: res.data.results[0].geometry.location.lng
                        })
                    } else {
                        this.setState({
                            latitude: 0,
                            longitude: 0
                        })
                        return false;
                    }
                }).catch(error => {
                    console.log(error)
                    return false;
                });
        }

        const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) return;
            const selectedImages = Array.from(e.target.files).concat(this.state.images);

            const selectedImagesPreview = selectedImages.map(img => {
                return URL.createObjectURL(img);
            })

            await this.setState({
                images: selectedImages,
                previewImages: selectedImagesPreview
            })
        }

        const handleDeleteImg = (img: any) => {
            this.state.images.splice(img, 1)
            this.state.previewImages.splice(img, 1)
            this.setState({
                images: this.state.images,
                previewImages: this.state.previewImages
            })
        }

        // const handleHourOption = (name: any, key: keyof Keys) => {
        //     let hour = [];
        //     for (let i = 1; i <= 24; i++) {
        //         hour.push(i);
        //     }
        //     return (
        //         <div className="select">
        //             <select name={name} id={key} onChange={handleSelect} value={this.state[key]}>
        //                 <option>Fechado</option>
        //                 {hour.map(h => {
        //                     return <option value={h} key={h}>{h}:00</option>
        //                 })}
        //             </select>
        //         </div>
        //     );
        // }



        return (
            <>
                {/* <img src={logoImg} alt="logo" className="logo-cadastrar" /> */}
                <div className="main-box">
                    <h1>
                        Formulario de cadastro.
                    </h1>
                    <div className={"form-box"}>
                        <div>
                            <form className={"form-new-store"} onSubmit={formSubmit}>
                                <div className="column">
                                    <div className="field">
                                        <input type="text" ref={this.emailInput} name="email" id="email" placeholder="email@email.com" onChange={handleInput} />
                                        <label style={{ color: this.state.emailColor }} htmlFor="email">{this.state.emailTxt}</label>
                                    </div>
                                    <div className="field">
                                        <input type={this.state.pViewer ? "text" : "password"} ref={this.pwInput} name="password" id="password" placeholder="******" onChange={handleInput} />
                                        <label style={{ color: this.state.passwordColor }} htmlFor="password">{this.state.passwordTxt}</label>
                                    </div>
                                    <div className="field">
                                        <input type="password" name="confirmasenha" id="confirmasenha" placeholder="******" onChange={handleInput} />
                                        <label htmlFor="confirmasenha">Confirmar Senha*</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field">
                                        <input type="text" name="nome" id="nome" placeholder="Nome Fantasia" onChange={handleInput} value={this.state.nome} />
                                        <label htmlFor="nome">Nome Fantasia*</label>
                                    </div>
                                    <div className="field">
                                        <input type="text" name="razao" id="razao" placeholder="Razao Social" onChange={handleInput} value={this.state.razao} />
                                        <label htmlFor="razao">Razao Social*</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field">
                                        <input type="text" name="inscricao" id="inscricao" placeholder="000.000.000.000" maxLength={15} onChange={handleInput} onFocus={handleLimpa} onBlur={handleMask} value={this.state.inscricao} />
                                        <label htmlFor="inscricao">Incricao Estadual*</label>
                                    </div>
                                    <div className="field">
                                        <input type="text" name="cnpj" id="cnpj" placeholder="00.000.000/0001-00" maxLength={18} onChange={handleInput} onFocus={handleLimpa} onBlur={handleMask} value={this.state.cnpj} />
                                        <label htmlFor="cnpj">CNPJ*</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field">
                                        <input type="text" name="telefone" id="telefone" placeholder="(00)0000-0000" maxLength={12} onChange={handleInput} onFocus={handleLimpa} onBlur={handleMask} value={this.state.telefone} />
                                        <label htmlFor="telefone">Telefone</label>
                                    </div>
                                    <div className="field">
                                        <input type="text" name="website" id="website" placeholder="www.website.com.br" onChange={handleInput} value={this.state.website} />
                                        <label htmlFor="website">Website</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="field">
                                        <input type="text" name="cep" id="cep" placeholder="00000-000" onChange={handleInput} maxLength={10} onFocus={handleLimpa} onBlur={handleCep} value={this.state.cep} />
                                        <label htmlFor="cep">CEP*</label>
                                    </div>
                                    <div className="field">
                                        <input type="text" name="cidade" id="cidade" value={this.state.cidade} placeholder="Cidade" onChange={handleInput} />
                                        <label htmlFor="cidade">Cidade*</label>
                                    </div>
                                    <div className="field">
                                        <input type="text" name="estado" id="estado" value={this.state.estado} placeholder="Estado" onChange={handleInput} />
                                        <label htmlFor="estado">Estado*</label>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="field">
                                        <input type="text" name="rua" id="rua" value={this.state.rua} placeholder="Rua" onChange={handleInput} />
                                        <label htmlFor="rua">Rua*</label>
                                    </div>
                                    <div className="field">
                                        <input type="text" name="numero" id="numero" placeholder="Numero" onChange={handleInput} value={this.state.numero} />
                                        <label htmlFor="numero">Numero*</label>
                                    </div>
                                    <div className="field">
                                        <input type="text" name="complemento" id="complemento" placeholder="Complemento" onChange={handleInput} value={this.state.complemento} />
                                        <label htmlFor="complemento">Complemento</label>
                                    </div>


                                </div>
                                {/* <div className="row-banho">
                                    <label className="switch-label">Banho pet disponivel:</label>
                                    <div className="onoffswitch">
                                        <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="banho" tabIndex={1} onChange={handleCheckbox} defaultChecked={this.state.banho} />
                                        <label className="onoffswitch-label" htmlFor="banho">
                                            <span className="onoffswitch-inner"></span>
                                            <span className="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div> */}
                                {/* <div className="row">
                                    <div className="field-funciona">
                                        <label htmlFor="multi">Importar imagens</label>
                                        <div className="images-container">
                                            {this.state.previewImages.map((img: any, i: any) => {
                                                console.log(img)
                                                let imagem = img
                                                if (img.url !== undefined) imagem = img.url
                                                return (
                                                    <div className="image-container-close" key={i}>
                                                        <span onClick={() => handleDeleteImg(i)}><FiX size={23} color="red" /></span>
                                                        <img src={imagem} alt="Seu hotel" key={imagem} className="img-selected" />
                                                    </div>
                                                )
                                            })}
                                            <label htmlFor="image[]" className="new-image"><FiPlus size={24} color="#15b6d6" /></label>


                                        </div>
                                        <input multiple onChange={handleImage} type="file" id="image[]" />
                                    </div>
                                </div> */}
                                {/* <div className="row">
                                    <div className="field-funciona">
                                        <label htmlFor="horario">Horario de funcionamento*</label>
                                        <div>
                                            <div>
                                                <label htmlFor="horario">Domingo</label>
                                                {handleHourOption("abre[]", "domingoAbre")}
                                                {handleHourOption("fecha[]", "domingoFecha")}
                                            </div>
                                            <div>
                                                <label htmlFor="horario">Segunda</label>
                                                {handleHourOption("abre[]", "segundaAbre")}
                                                {handleHourOption("fecha[]", "segundaFecha")}
                                            </div>
                                            <div>
                                                <label htmlFor="horario">Terca</label>
                                                {handleHourOption("abre[]", "tercaAbre")}
                                                {handleHourOption("fecha[]", "tercaFecha")}
                                            </div>
                                            <div>
                                                <label htmlFor="horario">Quarta</label>
                                                {handleHourOption("abre[]", "quartaAbre")}
                                                {handleHourOption("fecha[]", "quartaFecha")}
                                            </div>
                                            <div>
                                                <label htmlFor="horario">Quinta</label>
                                                {handleHourOption("abre[]", "quintaAbre")}
                                                {handleHourOption("fecha[]", "quintaFecha")}
                                            </div>
                                            <div>
                                                <label htmlFor="horario">Sexta</label>
                                                {handleHourOption("abre[]", "sextaAbre")}
                                                {handleHourOption("fecha[]", "sextaFecha")}
                                            </div>
                                            <div>
                                                <label htmlFor="horario">Sabado</label>
                                                {handleHourOption("abre[]", "sabadoAbre")}
                                                {handleHourOption("fecha[]", "sabadoFecha")}
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="box-buttons">
                                    <button className="create-store-register">
                                        Salvar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    users: state.users.info,
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CadastrarHotel);
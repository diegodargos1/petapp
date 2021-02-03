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
    id?: any;
    name?: any;
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
    images?: any;
}

type Props = Stateprops & DispatchProps & Ownprops

class CadastrarHotel extends React.Component<Props> {
    state = {
        id: (this.props.data?.id) ? this.props.data.id : "",
        nome: (this.props.data?.name) ? this.props.data.name : "",
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
        images: [],

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
    }

    componentDidMount() {
        console.log(this.props.data)
    }

    render() {
        const handleCep = async (id: React.FormEvent<HTMLInputElement>) => {
            this.props.loading();
            let cep = id.currentTarget.value.replace(/[^0-9a-zA-Z]+/g, "");
            await api.get(`https://viacep.com.br/ws/${cep}/json`)
                .then(res => {
                    this.props.loading();
                    this.setState({
                        cidade: res.data.localidade,
                        estado: res.data.uf,
                        rua: res.data.logradouro,
                        cep: res.data.cep
                    })
                })
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

            console.log(this.state)
        }
        const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (this.state.nome === "") alert("Campo Nome Fantasia e obrigatorio.")
            else if (this.state.razao === "") alert("Campo Razao Social e obrigatorio.")
            else if (this.state.inscricao === "") alert("Campo Inscricao Estadual e obrigatorio.")
            else if (this.state.cnpj === "") alert("Campo CNPJ e obrigatorio.")
            else if (this.state.cep === "") alert("Campo CEP e obrigatorio.")
            else if (this.state.cidade === "") alert("Campo Cidade e obrigatorio.")
            else if (this.state.estado === "") alert("Campo Estado e obrigatorio.")
            else if (this.state.rua === "") alert("Campo Rua e obrigatorio.")
            else if (this.state.numero === "") alert("Campo Numero e obrigatorio.")
            else {
                this.props.loading();
                const latLon = await getLatLon();
                const formPost = await postForm();
                this.props.loading();

            }
        }

        const postForm = async () => {
            const url = (this.state.id) ? `/update/stores` : `/cadastro/stores/${this.state.userId}`
            await api.post(url, this.state, {
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
            const address = this.state.rua.replace(/\s/g, "+") + "+" + this.state.numero.replace(" ", "+") + "+" + this.state.cep.replace("-", "");
            await api.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAlT927iQT9weuSg_0nWT0qreEh8cc6DPs&address=${address}`)
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

        const handleImage = (e: React.FormEvent<HTMLInputElement>) => {

        }


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
                                        <input type="text" name="email" id="email" placeholder="email@email.com" onChange={handleInput} value={this.state.email} />
                                        <label htmlFor="email">Email</label>
                                    </div>
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
                                <div className="row">
                                    <div className="field-funciona">
                                        <label htmlFor="multi">Importar imagens</label>
                                        <div>
                                            <input type='file' id='multi' onChange={handleInput} multiple />
                                        </div>


                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field-funciona">
                                        <label htmlFor="horario">Horario de funcionamento*</label>
                                        <div>
                                            <div>
                                                <label htmlFor="horario">Domingo</label>
                                                <input type="text" name="abre[]" id="domingoAbre" className="horario" maxLength={5} placeholder="00:00" onChange={handleInput} value={this.state.domingoAbre} />
                                                <input type="text" name="fecha[]" id="domingoFecha" className="horario" maxLength={5} placeholder="00:00" onChange={handleInput} value={this.state.domingoFecha} />
                                            </div>
                                            <div>
                                                <label htmlFor="horario">Segunda</label>
                                                <input type="text" name="abre[]" id="segundaAbre" className="horario" maxLength={5} placeholder="00:00" onChange={handleInput} value={this.state.segundaAbre} />
                                                <input type="text" name="fecha[]" id="segundaFecha" className="horario" maxLength={5} placeholder="00:00" onChange={handleInput} value={this.state.segundaFecha} />

                                            </div>
                                            <div>
                                                <label htmlFor="horario">Terca</label>
                                                <input type="text" name="abre[]" id="tercaAbre" className="horario" maxLength={5} placeholder="00:00" onChange={handleInput} value={this.state.tercaAbre} />
                                                <input type="text" name="fecha[]" id="tercaFecha" className="horario" maxLength={5} placeholder="00:00" onChange={handleInput} value={this.state.tercaFecha} />

                                            </div>
                                            <div>
                                                <label htmlFor="horario">Quarta</label>
                                                <input type="text" name="abre[]" id="quartaAbre" className="horario" maxLength={5} placeholder="00:00" onChange={handleInput} value={this.state.quartaAbre} />
                                                <input type="text" name="fecha[]" id="quartaFecha" className="horario" maxLength={5} placeholder="00:00" onChange={handleInput} value={this.state.quartaFecha} />

                                            </div>
                                            <div>
                                                <label htmlFor="horario">Quinta</label>
                                                <input type="text" name="abre[]" id="quintaAbre" className="horario" maxLength={5} placeholder="00:00" onChange={handleInput} value={this.state.quintaAbre} />
                                                <input type="text" name="fecha[]" id="quintaFecha" className="horario" maxLength={5} placeholder="00:00" onChange={handleInput} value={this.state.quintaFecha} />

                                            </div>
                                            <div>
                                                <label htmlFor="horario">Sexta</label>
                                                <input type="text" name="abre[]" id="sextaAbre" className="horario" maxLength={5} placeholder="00:00" onChange={handleInput} value={this.state.sextaAbre} />
                                                <input type="text" name="fecha[]" id="sextaFecha" className="horario" maxLength={5} placeholder="00:00" onChange={handleInput} value={this.state.sextaFecha} />

                                            </div>
                                            <div>
                                                <label htmlFor="horario">Sabado</label>
                                                <input type="text" name="abre[]" id="sabadoAbre" className="horario" maxLength={5} placeholder="00:00" onChange={handleInput} value={this.state.sabadoAbre} />
                                                <input type="text" name="fecha[]" id="sabadoFecha" className="horario" maxLength={5} placeholder="00:00" onChange={handleInput} value={this.state.sabadoFecha} />

                                            </div>
                                        </div>
                                    </div>
                                </div>
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
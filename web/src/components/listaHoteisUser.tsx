import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import logoImg from '../assets/images/boxicon.png';
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
    edit: Function
}

type Props = Stateprops & DispatchProps & Ownprops

class ListaHoteisUser extends React.Component<Props> {
    state = {
        userId: localStorage.getItem('userId'),

        hoteis: [
            {
                id: "",
                nome: "",
                rua: "",
                cidade: "",
                estado: "",
                numero: "",
                info: true
            }
        ]
    }

    async componentDidMount() {
        this.props.loading();
        await api.get(`/listar/stores/${this.state.userId}`)
            .then(res => {
                this.props.loading();
                this.setState({
                    hoteis: res.data.info
                })
            })
    }

    render() {
        const handleTr = (i: any) => {
            this.props.edit(this.state.hoteis[i])
        }

        return (
            <>
                <img src={logoImg} alt="logo" className="logo-cadastrar" />
                <div className="main-box">
                    <h1>
                        Seus hoteis/creches cadastrados.
                    </h1>


                    <div className={"form-box"}>
                        <div>
                            <table className="hotel-list" >
                                <thead>
                                    <tr>
                                        <th>
                                            Nome
                                        </th>
                                        <th>
                                            Cidade e Estado
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.hoteis.map((hotel, i) => {
                                        return (
                                            <tr key={hotel.id} onClick={() => { handleTr(i) }}>
                                                <td >
                                                    {hotel.nome}
                                                </td>
                                                <td>
                                                    {hotel.cidade + "," + hotel.estado}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>



                            </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListaHoteisUser);
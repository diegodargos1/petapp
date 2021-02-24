import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import logoImg from '../assets/images/boxicon.png';
import CadastrarHotel from '../components/cadastrarHotel';
import api from '../services/api';
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
class LandingStore extends Component<Props> {
    state = {
        loading: false,
        cadastrar: false,
        data: {},
    }

    async componentDidMount() {
        const id = localStorage.getItem('userId');
        const email = localStorage.getItem('user');

        await api.post(`/users/check`, { id, email }, {
            headers: { "Access-Control-Allow-Origin": "*" }
        })
            .then(res => {
                if (!res.data.error) {
                    this.props.history.push("/dashboard");
                }
            })
    }

    render() {
        const handleLoading = () => {
            this.setState({
                loading: !this.state.loading
            })
        }

        const redirect = () => {
            this.props.history.push("/Dashboard");
        }

        return (
            <div id="page-landingstore">
                <div className="loading-box" style={{ display: (this.state.loading ? "flex" : "none") }}>
                    <div className="loadingDiv" ></div>
                </div>

                <div className="content-wrapper">
                    <main >
                        <img src={logoImg} alt="logo" className="logo" />
                        <h1>
                            Coloque seu estabelecimento no DogMap.
                        </h1>
                        <p>
                            Cadastre-se com poucos cliques.
                        </p>
                    </main>
                    <div id="page-cadastrar-hotel" >
                        <div className="content-wrapper-cadastrar" >
                            {/* <CadastrarBox display={this.state.cadastrar} loading={handleLoading} redirect={redirect}></CadastrarBox> */}
                            <CadastrarHotel loading={handleLoading} redirect={redirect} data={this.state.data}></CadastrarHotel>
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingStore);
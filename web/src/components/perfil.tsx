import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import logoImg from '../assets/images/boxicon.png';
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

class Perfil extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    state = {

    }


    render() {
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


                    <div className={"form-box"}>

                        <div className="separator">OU</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
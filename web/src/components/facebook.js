import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

export default class LoginFacebook extends Component
{
    state = {
        auth: false,
        name: '',
        email: '',
        picture: '',
        id: '',
        accessToken: ''
    };

    render ()
    {
        let facebookData;
        const responseFacebook = ( response ) =>
        {
            this.setState( {
                auth: false,
                name: response.name,
                email: response.email,
                picture: ( response.picture ) ? response.picture.data.url : "",
                id: response.id,
                accessToken: response.accessToken
            } );
            this.props.submit( this.state );
        };

        const componentClicked = ( response ) =>
        {
        };


        this.state.auth ?
            facebookData =
            <div>
                Hi!
            </div>
            :
            facebookData =
            <FacebookLogin
                appId="442441586888179"
                autoLoad={ false }
                fields="name,email,picture"
                onClick={ componentClicked }
                callback={ responseFacebook }
                render={ renderProps => (
                    <button className="create-store-face" onClick={ renderProps.onClick }>Entrar com Facebook</button>
                ) }
            />;


        return (
            <div>
                {facebookData }
            </div>
        );

    }
}
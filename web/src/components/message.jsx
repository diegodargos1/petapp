

import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FiX } from 'react-icons/fi';
import logoImg from '../assets/images/boxicon.png';

function Message ( f )
{


    return (
        <div className="box-info">
            <div className="close-cadastro" onClick={ () => f.handleClose( false ) }><FiX size={ 26 } color="rgba(0,0,0,0.6)" /></div>
            <img src={ logoImg } alt="logo" className="logo-message" />
            <div className="main-box">
                <h4>
                    { f.txt }
                </h4>
            </div>
        </div>
    );
}

export default Message;
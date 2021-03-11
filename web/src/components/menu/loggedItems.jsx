

import React from "react";
function PersonalItems ( f )
{
    return (
        <>
            <li><a className="liBtn" >Perfil</a></li>
            <li><a className="liBtn" >Favoritos</a></li>
            <li><a className="liBtn" >Historico</a></li>
            <li><a className="liBtn" onClick={ f.handleLogout }>Sair</a></li>
        </>
    );
}

export default PersonalItems;
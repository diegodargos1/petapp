

import React from "react";
function PersonalItems ( f )
{
    return (
        <>
            <li><a className="liBtn" href="/#">Perfil</a></li>
            <li><a className="liBtn" href="/#">Favoritos</a></li>
            <li><a className="liBtn" href="/#">Historico</a></li>
            <li><a className="liBtn" href="/#" onClick={ f.handleLogout }>Sair</a></li>
        </>
    );
}

export default PersonalItems;
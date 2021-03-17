

import React from "react";
function PersonalItems ( f )
{
    return (
        <>
            <li><p>Perfil</p></li>
            <li><p>Favoritos</p></li>
            <li><p>Historico</p></li>
            <li onClick={ f.handleLogout }><p>Sair</p></li>
        </>
    );
}

export default PersonalItems;
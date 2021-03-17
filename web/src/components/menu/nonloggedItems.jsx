

import React from "react";
function NonPersonalItems ( f )
{
    return (
        <>
            <li onClick={ f.handleLoginBox }><p>Entrar</p></li>
        </>
    );
}

export default NonPersonalItems;
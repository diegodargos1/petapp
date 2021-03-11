

import React from "react";
function NonPersonalItems ( f )
{
    console.log( f );
    return (
        <>
            <li><a href="/#" onClick={ f.handleLoginBox }>Entrar</a></li>
        </>
    );
}

export default NonPersonalItems;
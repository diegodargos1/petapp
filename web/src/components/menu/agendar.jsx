

import React from "react";
import { FiCalendar, FiClock } from 'react-icons/fi';
function AgendarMenu ( f )
{
    return (
        <>
            <li onClick={ f.handleBanho }>
                <FiClock size={ 25 } color="#fff" />
                <p>Agendar Banho</p>
            </li>
            <li onClick={ f.handleHotel }>
                <FiCalendar size={ 25 } color="#fff" />
                <p>Agendar Hotel</p>
            </li>
        </>
    );
}

export default AgendarMenu;
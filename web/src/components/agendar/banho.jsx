

import { addDays, addMonths, setHours, setMinutes } from 'date-fns';
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiX } from 'react-icons/fi';
function Banho ( f )
{
    const filterPassedTime = () =>
    {
        let timeArray = [];
        for ( let i = 0; i < 8; i++ )
        {
            timeArray.push( setHours( setMinutes( new Date(), 0 ), i ) );
            timeArray.push( setHours( setMinutes( new Date(), 30 ), i ) );
        }

        for ( let i = 19; i < 24; i++ )
        {
            timeArray.push( setHours( setMinutes( new Date(), 0 ), i ) );
            timeArray.push( setHours( setMinutes( new Date(), 30 ), i ) );
        }

        return timeArray;
    };

    return (
        <div className="box-info">
            <div className="close-cadastro" onClick={ f.handleBox }><FiX size={ 26 } color="rgba(0,0,0,0.6)" /></div>
            {/* <img src={ logoImg } alt="logo" className="logo-cadastrar" /> */ }
            <div className="main-box">
                <h2>
                    Agendamento de banho
                    </h2>

                <div className={ "banho-box" }>
                    <p>
                        Escolha data e horario.
                    </p>
                    <DatePicker selected={ f.banhoDate }
                        onChange={ date => f.setBanhoDate( date ) }
                        dateFormat="dd/MM/yyyy"
                        minDate={ new Date() }
                        maxDate={ addMonths( new Date(), 3 ) }
                        excludeDates={ [ addDays( new Date(), 2 ) ] }
                        excludeTimes={ filterPassedTime() }
                        timeIntervals={ 60 }
                        // highlightDates={ [ addDays( new Date(), 7 ) ] }
                        // customInput={ <DateBtn /> }
                        showTimeSelect

                        inline
                    />
                    <button className="agendar-btn" onClick={ f.handleBanhoSalvar }>Agendar</button>
                </div>
            </div>
        </div >
    );
}

export default Banho;
import React,{ useState } from 'react';
import Client from '../client';
import './index.scss'

interface AppProps {
    
 }
 
 interface AppState {
    clientNumber: number
 }

function Room() {
    const [clientNumber, setClientNumber] = useState(1)

    let clients = [];
    for(let i = 0; i < clientNumber; i++) {
        clients.push(<Client key={i} />)
    }

    return (
        <div className="room">
                <h1 className="room__title">Id room: 0001</h1>
                <div className="room__container">
                    <button onClick={() => setClientNumber(clientNumber + 1)} className="room__add">Ajouter un joueur</button>
                    <div className="room__clients">
                        {clients}
                    </div>
                </div>
        </div>
    )
}

export default Room;
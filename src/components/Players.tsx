import React, { useState, useEffect } from 'react';
import * as Material from '@material-ui/core';
import * as model from '../model/interface';

function Players(props: any) {
    const [playerList, setPlayerList] = useState([] as model.Player[]);

    useEffect(() => { 
        setPlayerList(props.playerList);
    }, [props.playerList]);

    return (
    <div style={{display:'flex', flexDirection: 'row', height:'400px', overflow: 'scroll'}}>
        <table>
        {
            
                playerList.map(p => <tr>
                    <td>{p.firstName} {p.lastName}</td></tr>)
        }
        </table>

    </div>
    )
}

export default Players;
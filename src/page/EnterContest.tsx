import React, { useState, useEffect } from 'react';
import * as Material from '@material-ui/core';
import GameList from '../components/GameList';
import ToggleButtonGroup from '../components/ToggleButtonGroup';
import Players from '../components/Players';
import * as model from '../model/interface';
import * as service from '../service/ClientService';
import LineUp from '../components/LineUp';
import { Link } from '@material-ui/icons';

function EnterContest() {
    const horizontalViewMode = 'horizontal';

    const [availablePlayers, setAvailablePlayers] = useState([] as model.Player[]);
    const [selectedTeams, setSelectedTeams] = useState([] as number[]);
    const [positions, setPositions] = useState([] as model.Position[]);
    const [selectedPositions, setSelectedPositions] = useState([] as number[]);

    useEffect(() => { 
        console.log('GameList refresh');
        setAvailablePlayers(service.getPlayers(selectedTeams, selectedPositions));
        setPositions(service.getAllPositions());
    }, [selectedPositions, selectedTeams]);
    
    function updateSelectedTeams(selectedTeams: number[]) {   
        setSelectedTeams(selectedTeams);  
        setAvailablePlayers(service.getPlayers(selectedTeams, selectedPositions));
    }

    function onPositionButtonClick(id: number) {
        const copySelectedPositions = [...selectedPositions];
        const buttonIndex = copySelectedPositions.indexOf(id);
        if(buttonIndex < 0) {
            copySelectedPositions.push(id);
        }
        else {
            copySelectedPositions.splice(buttonIndex, 1);
        }

        setSelectedPositions(copySelectedPositions);
        setAvailablePlayers(service.getPlayers(selectedTeams, copySelectedPositions));
    }
    
    return (<div style={{width:'50%'}}>
        <div style={{display:'flex', flexDirection: 'column', marginBottom: '15px'}}>
            <div>
                <GameList 
                    selectedTeams={(selectedTeams: number[]) => updateSelectedTeams(selectedTeams)}
                    viewMode={horizontalViewMode}/>
                <ToggleButtonGroup 
                    variant="contained"
                    textProperty="name"
                    idProperty="id"
                    toggleButtonClick={(id: number) => {onPositionButtonClick(id)}}  
                    buttons={positions}></ToggleButtonGroup>
            </div>
            <div style={{display:'flex', flexDirection: 'row', marginBottom: '15px'}}>
                <Players playerList={availablePlayers} />
                <LineUp/>
            </div>
        </div>
        </div>)
}

export default EnterContest;
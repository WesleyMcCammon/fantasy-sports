import React, { useState, useEffect } from 'react';
import * as Material from '@material-ui/core';
import ToggleButtonGroup from '../components/ToggleButtonGroup';
import * as model from '../model/interface';
import * as service from '../service/ClientService';

function GameList(props: any) {
    const useStyles = Material.makeStyles(theme => ({ 
        root: {
            fontSize: '14px',
            fontFamily: 'verdana'
        },
        verticalDisplay: {display: 'flex',flexDirection: 'column', flexWrap: 'wrap'},
        horizontalDisplay: {
            display: 'flex',
            flexDirection: 'row', 
            flexWrap: 'wrap'
        },
        gameContainer: {
            borderColor: '#efefef',
            borderRadius: '4px', 
            borderWidth: '1px', 
            //borderStyle: 'solid', 
            minWidth: '65px', 
            color: '#232323', 
            padding: '8px', 
            margin: '4px'
        },
        teamCheckContainer: {
            width: '15px'
        },
        teamContainer: {
            display: 'flex', 
            alignItems: 'flex-start', 
            justifyContent: 'flex-start', 
            cursor: 'pointer',
            '&:hover': {
                textDecorationLine: 'underline'
            }
        },
        timeContainer: {fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}
    }));

    const classes = useStyles();
    const [contestGames, setContestGames] = useState([] as model.Game[]);
    const [selectedTeams, setSelectedTeams] = useState([] as number[]);

    useEffect(() => { 
        console.log('GameList refresh');
        const games = service.getGames();
        setContestGames(games);
    }, []);

    function teamSelected(teamSelectedEvent: model.TeamSelectedEvent) { 
        const copySelectedTeams = [...selectedTeams];
        const teamIndex = copySelectedTeams.indexOf(teamSelectedEvent.teamId);
        if(teamIndex < 0) {
            copySelectedTeams.push(teamSelectedEvent.teamId);
        }
        else {
            copySelectedTeams.splice(teamIndex, 1);
        }

        setSelectedTeams(copySelectedTeams);
        props.selectedTeams(copySelectedTeams);
    }

    return (
        <div className={classes.root}>
            <div className={props.viewMode === 'horizontal' ? classes.horizontalDisplay : classes.verticalDisplay}>
                {
                    contestGames.map(g => 
                        <div key={g.id}>
                            { props.viewMode === 'horizontal' ?
                                <div className={classes.gameContainer}>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <div style={{display: 'flex', flexDirection: 'row'}}>

                                        <ToggleButtonGroup 
                                            textProperty="shortName"
                                            idProperty="id"
                                            styleVariant='small'
                                            toggleButtonClick={(id: number) => teamSelected({gameId: g.id, teamId: g.visitor.id})}  
                                            buttons={[g.visitor]}></ToggleButtonGroup>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'row'}}>

                                        <ToggleButtonGroup 
                                            textProperty="shortName"
                                            idProperty="id"
                                            styleVariant='small'
                                            toggleButtonClick={(id: number) => teamSelected({gameId: g.id, teamId: g.home.id})}  
                                            buttons={[g.home]}></ToggleButtonGroup>
                                        </div>

                                        <div className={classes.timeContainer}>{g.start.toLocaleTimeString()}</div>
                                    </div>                                    
                                </div> : 
                                <div style={{borderRadius: '4px', borderColor: '#efefef', borderWidth: '1px', borderStyle: 'solid', color: 'steelblue', padding: '8px', margin: '4px'}}>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <div onClick={(e: any) => teamSelected({gameId: g.id, teamId: g.visitor.id})} 
                                            className={classes.teamContainer}>{g.visitor.shortName}</div><span>c</span>
                                        <div style={{marginLeft: '5px', marginRight: '5px'}}>at</div>
                                        <div onClick={(e: any) => teamSelected({gameId: g.id, teamId: g.visitor.id})} 
                                            className={classes.teamContainer}>{g.home.shortName}</div><span>d</span>
                                        <div style={{minWidth: '10px'}}></div>
                                        <div className={classes.timeContainer}>{g.start.toLocaleTimeString()}</div>
                                    </div>                                    
                                </div>
                            }
                        </div>)
                }
            </div>
        </div>
    )
}

export default GameList;
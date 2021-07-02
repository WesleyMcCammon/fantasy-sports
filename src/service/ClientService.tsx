
import * as model from '../model/interface';

const getAllTeams = () => {
    
    const teams: model.Team[] = [];
    for(var index = 0; index < 32; index++) {
        teams.push({id: index, shortName: `TM${index+1}`, nickName: `Nick TM${index+1}`, name: `Team ${index+1}`})
    }

    return teams;
}

const getAllGames = () => {
    
    const teams: model.Team[] = getAllTeams();
    // for(var index = 0; index < 32; index++) {
    //     teams.push({id: index, shortName: `TM${index+1}`, nickName: `Nick TM${index+1}`, name: `Team ${index+1}`})
    // }

    const games: model.Game[] = [];
    for(var gameIndex = 0; gameIndex < 16; gameIndex++) {
        games.push({
            id: gameIndex, 
            home: teams[gameIndex*2], 
            visitor: teams[(gameIndex*2)+1], 
            start: new Date()
        });
    }

    return games;
}

export const getAllPositions = () => {
    const positions: any[] = [
        { id: 0, name: 'QB', count: 2 },
        { id: 1, name: 'RB', count: 3 },
        { id: 2, name: 'WR', count: 5 }, 
        { id: 3, name: 'TE', count: 3 },
        { id: 4, name: 'K', count: 2 },
        { id: 5, name: 'DEF', count: 0}
    ];

    return positions;
}

const getAllPlayers = () => {
    const teams: model.Team[] = getAllTeams();
    const players: model.Player[] = [];
    const positions: any[] = getAllPositions();

    for(var teamIndex = 0; teamIndex < teams.length; teamIndex++) { 
        for(var positionIndex = 0; positionIndex < positions.length; positionIndex++) {
            const playerId: number = (teamIndex * 1000) + (positionIndex * 100);
            const position: model.Position = {id: positions[positionIndex].id, name: positions[positionIndex].name};
            const firstName: string = positions[positionIndex].count === 0 ? '' : `First${teamIndex+1}_${playerId}`;
            const lastName: string = positions[positionIndex].count === 0  ? '' : `Last${teamIndex+1}_${playerId}`;
            
            if(positions[positionIndex].count === 0) {      
                players.push({
                    id: playerId + 1, 
                    positions: [position],
                    firstName: firstName, 
                    lastName: lastName, 
                    team: teams[teamIndex]});    
            }
            else {
                for(var i = 0; i < positions[positionIndex].count; i++) { 
                    players.push({
                        id: playerId + 1 + i + 1, 
                        positions: [position],
                        firstName: firstName, 
                        lastName: lastName, 
                        team: teams[teamIndex]});    
                }
            }
        }
    }

    return players;
}

const filterPlayersByPosition = (players: model.Player[], positionIds: number[]) => {
    const playersByPosition: model.Player[] = [];
    players.forEach((player: model.Player) => {
        player.positions.every(p => {
            let playerAdded: boolean = false;
            if(positionIds.includes(p.id)) {
                playersByPosition.push(player);
                playerAdded = true;
            }

            return !playerAdded;
        });
    });

    return playersByPosition;
}

export const getGames = () => {
    return getAllGames();
}

export const getGame = (id: number) => {
    const games = getAllGames();
    return games.find(g => g.id === id);
}

export const getPlayers = (teamIds: number[] = [], positionIds: number[]) => {
    const players: model.Player[] = getAllPlayers()
        .filter(p => teamIds.length === 0 || teamIds.includes(p.team.id));

    return positionIds.length > 0 ? filterPlayersByPosition(players, positionIds) : players;
}
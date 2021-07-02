export interface Game {
    id: number;
    home: Team;
    visitor: Team;
    start: Date;
}

export interface Team {
    id: number;
    shortName: string;
    name: string;
    nickName: string;
}

export interface TeamSelectedEvent {
    gameId: number;
    teamId: number;
}

export interface Position {
    id: number;
    name: string;
}

export interface Player {
    id: number;
    firstName: string;
    lastName: string;
    team: Team;
    positions: Position[];
}
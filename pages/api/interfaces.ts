export interface TournamentsType {
  name: string;
  date: string;
  id: number;
  active: boolean;
  deleted: boolean;
  players: PlayerInterface[];
  rounds?: RoundsInterface[];
  round: number;
  finished: boolean;
}
export interface PlayerInterface {
  name: string;
  id: number;
}
export interface FileInfoInterface {
  tournaments: TournamentsType[];
}

export interface TournamentInfoInterface {
  tournament: TournamentsType;
  match: RoundsInterface;
}

export interface RoundsInterface {
  round: number;
  match: number;
  player1: string | null;
  player2: string | null;
  win?: {
    round: number;
    match: number;
  };
}

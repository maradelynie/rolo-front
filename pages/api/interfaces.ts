export interface TournamentsType {
  name: string;
  date: string;
  id: number;
  active: boolean;
  deleted: boolean;
  players: PlayerInterface[];
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
}

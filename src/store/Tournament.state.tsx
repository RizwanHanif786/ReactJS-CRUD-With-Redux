import ITournament from '../interface/TournamnetInterface';

export default interface IInitialTournamentState {
  tournaments: ITournament[];
  loading: boolean;
  error: any;
}

export const initialTournamentState: IInitialTournamentState = {
  tournaments: [],
  loading: false,
  error: null,
};

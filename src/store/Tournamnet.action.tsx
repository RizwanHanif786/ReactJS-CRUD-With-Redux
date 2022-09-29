import ITournament from '../interface/TournamnetInterface';

export const FETCH_TOURNAMENT_BEGIN = 'FETCH_TOURNAMENT_BEGIN';
export const FETCH_TOURNAMENT_SUCCESS = 'FETCH_TOURNAMENT_SUCCESS';
export const FETCH_TOURNAMENT_FAILURE = 'FETCH_TOURNAMENT_FAILURE';

export const fetchTournamentBegin = () => ({
  type: FETCH_TOURNAMENT_BEGIN,
});

export const fetchTournamentSuccess = (tournaments: ITournament[]) => ({
  type: FETCH_TOURNAMENT_SUCCESS,
  payload: { tournaments },
});

export const fetchTournamentFailure = (error: any) => ({
  type: FETCH_TOURNAMENT_FAILURE,
  payload: { error },
});

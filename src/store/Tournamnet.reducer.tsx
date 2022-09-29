import IInitialTournamentState, { initialTournamentState } from './Tournament.state';
import {
  FETCH_TOURNAMENT_BEGIN,
  FETCH_TOURNAMENT_SUCCESS,
  FETCH_TOURNAMENT_FAILURE,
} from './Tournamnet.action';




export default function tournamentReducer(state: IInitialTournamentState = initialTournamentState, action: any) {
  switch (action.type) {
    /**
     *  Mark the state as "loading" so we can show a spinner or something
     * Also, reset any errors. We're starting fresh.
     */
    case FETCH_TOURNAMENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    /**
     * All done: set loading "false".
     * Fetch tournaments data from Api and save in state.
     *
     */
    case FETCH_TOURNAMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        tournaments: action.payload.tournaments,
      };

    /**
     * The request failed. It's done. So set loading to "false".
     * Save the error, so we can display it somewhere.
     * Since it failed, we don't have items to display anymore, so set `items` empty.
     */
    case FETCH_TOURNAMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        tournaments: [],
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

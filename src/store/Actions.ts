import dispatcher from './Dispatcher';
import { ActionTypes } from './ActionTypes';
import { VotePayload } from './types';
export const vote = (fightId: number, characterId: number) => {
  dispatcher.dispatch({ type: ActionTypes.VOTE, payload: { fightId, characterId } });
};
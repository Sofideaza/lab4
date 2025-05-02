import dispatcher from './Dispatcher';
import { ActionTypes } from './ActionTypes';

export const vote = (fightId: number, characterId: number) =>
  dispatcher.dispatch({
    type: ActionTypes.VOTE,
    payload: { fightId, characterId },
  });

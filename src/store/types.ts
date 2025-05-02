import { ActionTypes } from './ActionTypes';

export interface VotePayload {
  fightId: number;
  characterId: number;
}

export interface FightVotes {
  [characterId: number]: number;
}

export interface StoreState {
  fights: {
    [fightId: number]: {
      votes: FightVotes;
      totalVotes: number;
    };
  };
}


export interface UserVotes {
  [fightId: number]: number | null;
}

export interface Action {
  type: ActionTypes;
  payload: VotePayload;
}

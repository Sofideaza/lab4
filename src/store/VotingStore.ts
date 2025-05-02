import dispatcher from './Dispatcher';
import { Action, StoreState, UserVotes } from './types';
import { ActionTypes } from './ActionTypes';
import { FIGHTS } from './fightsConfig';

class VotingStore {
  private state: StoreState = { fights: {} };
  private userVotes: UserVotes = {};
  private listeners: Array<() => void> = [];

  constructor() {
    for (const { fightId, characters } of FIGHTS) {
      this.state.fights[fightId] = {
        votes: Object.fromEntries(characters.map((id) => [id, 0])),
        totalVotes: 0,
      };
      this.userVotes[fightId] = null;
    }
    dispatcher.register(this.handleAction.bind(this));
  }

  private handleAction(action: Action) {
    if (action.type !== ActionTypes.VOTE) return;

    const { fightId, characterId } = action.payload;
    const fight = this.state.fights[fightId];
    const prev = this.userVotes[fightId];

    if (prev === characterId) {
      fight.votes[prev]!--;
      fight.totalVotes--;
      this.userVotes[fightId] = null;
    } else {
      if (prev !== null) {
        fight.votes[prev]!--;
        fight.totalVotes--;
      }
      fight.votes[characterId]!++;
      fight.totalVotes++;
      this.userVotes[fightId] = characterId;
    }

    this.emitChange();
  }

  private emitChange() {
    this.listeners.forEach((cb) => cb());
  }

  public getState(): StoreState {
    return this.state;
  }
  public getUserVote(fightId: number): number | null {
    return this.userVotes[fightId];
  }

  public addChangeListener(cb: () => void) {
    this.listeners.push(cb);
  }

  public removeChangeListener(cb: () => void) {
    this.listeners = this.listeners.filter((fn) => fn !== cb);
  }
}

export default new VotingStore();

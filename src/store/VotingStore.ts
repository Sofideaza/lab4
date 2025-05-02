import dispatcher from './Dispatcher';
import { Action, StoreState } from './types';
import { ActionTypes } from './ActionTypes';
import { FIGHTS } from './fightsConfig';

class VotingStore {
  private state: StoreState = { fights: {} };
  private listeners: Array<() => void> = [];

  constructor() {
    for (const { fightId, characters } of FIGHTS) {
      const votes = Object.fromEntries(characters.map(id => [id, 0]));
      this.state.fights[fightId] = { votes, totalVotes: 0 };
    }

    dispatcher.register(this.handleAction.bind(this));
  }

  private handleAction(action: Action) {
    if (action.type === ActionTypes.VOTE) {
      const { fightId, characterId } = action.payload;
      const fight = this.state.fights[fightId];
      fight.votes[characterId] = (fight.votes[characterId] || 0) + 1;
      fight.totalVotes++;
      this.emitChange();
    }
  }

  private emitChange() {
    this.listeners.forEach(cb => cb());
  }

  public getState(): StoreState {
    return this.state;
  }

  public addChangeListener(cb: () => void) {
    this.listeners.push(cb);
  }

  public removeChangeListener(cb: () => void) {
    this.listeners = this.listeners.filter(fn => fn !== cb);
  }
}

export default new VotingStore();

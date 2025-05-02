import { EventEmitter } from 'events';
import dispatcher from './Dispatcher';
import { Action, StoreState } from './types';
import { ActionTypes } from './ActionTypes';

class VotingStore extends EventEmitter {
  private state: StoreState = { fights: {} };

  constructor() {
    super();
    for (let i = 1; i <= 8; i++) {
      this.state.fights[i] = { votes: {}, totalVotes: 0 };
    }
    dispatcher.register(this.handleAction.bind(this));
  }

  private handleAction(action: Action) {
    if (action.type === ActionTypes.VOTE) {
      const { fightId, characterId } = action.payload;
      const fight = this.state.fights[fightId];
      fight.votes[characterId] = (fight.votes[characterId] || 0) + 1;
      fight.totalVotes++;
      this.emit('change');
    }
  }

  public getState() { return this.state; }
  public addChangeListener(cb: () => void) { this.on('change', cb); }
  public removeChangeListener(cb: () => void) { this.off('change', cb); }
}

export default new VotingStore();
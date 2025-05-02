import store from '../store/VotingStore';

/**
 * Component displaying voting statistics as bars.
 */
export class VotingStats extends HTMLElement {
  private fightId!: number;

  connectedCallback() {
    this.fightId = Number(this.getAttribute('fight-id'));
    this.render();
    store.addChangeListener(() => this.render());
  }

  private render() {
    const { votes, totalVotes } = store.getState().fights[this.fightId];
    const bars = Object.entries(votes)
      .map(([charId, count]) => {
        const pct = totalVotes ? Math.round((count / totalVotes) * 100) : 0;
        return `<div class="bar" style="width: ${pct}%;">P${charId}: ${pct}%</div>`;
      })
      .join('');

    this.innerHTML = `
      <div class="stats">
        ${bars}
      </div>
    `;
  }
}

customElements.define('voting-statistics', VotingStats);

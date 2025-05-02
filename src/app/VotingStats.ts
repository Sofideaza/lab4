// src/app/VotingStats.ts
import store from '../store/VotingStore';

export class VotingStats extends HTMLElement {
  private fightId!: number;
  private shadow = this.attachShadow({ mode: 'open' });

  connectedCallback() {
    this.fightId = +this.getAttribute('fight-id')!;
    // render inicial y cada vez que cambie el store
    this.render();
    store.addChangeListener(() => this.render());
  }

  private render() {
    const { votes, totalVotes } = store.getState().fights[this.fightId];
    const bars = Object.entries(votes)
      .map(([charId, count]) => {
        const pct = totalVotes ? Math.round((count / totalVotes) * 100) : 0;
        return `
          <div class="bar" style="width: ${pct}%">
            P${charId}: ${pct}%
          </div>
        `;
      })
      .join('');

    this.shadow.innerHTML = `
      <style>
        .stats {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .bar {
          height: 1.5rem;
          background: var(--primary);
          color: #fff;
          border-radius: 4px 0 0 4px;
          line-height: 1.5rem;
          font-size: 0.85rem;
          text-align: center;
          overflow: hidden;
        }
      </style>
      <div class="stats">${bars}</div>
    `;
  }
}

customElements.define('voting-statistics', VotingStats);

import store from '../store/VotingStore';
import { CHARACTER_NAMES } from '../store/characters';

export class VotingStats extends HTMLElement {
  private fightId!: number;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.fightId = Number(this.getAttribute('fight-id'));
    store.addChangeListener(() => this.render());
    this.render();
  }

  private render() {
    const shadow = this.shadowRoot!;
    const { votes, totalVotes } = store.getState().fights[this.fightId];

    const barsHtml = Object.entries(votes)
      .map(([charId, count]) => {
        const pct = totalVotes ? Math.round((count / totalVotes) * 100) : 0;
        const name = CHARACTER_NAMES[+charId] || `P${charId}`;
        return `
          <div class="bar-container">
            <div class="label">${name}: ${pct}%</div>
            <div class="bar" style="width: ${pct}%"></div>
          </div>
        `;
      })
      .join('');

    shadow.innerHTML = `
      <style>
        .stats {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        .bar-container {
          display: flex;
          flex-direction: column;
        }
        .label {
          font-size: 0.85rem;
          color: #333;
          margin-bottom: 0.25rem;
        }
        .bar {
          height: 0.75rem;
          background: #960C51;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
      </style>
      <div class="stats">${barsHtml}</div>
    `;
  }
}

customElements.define('voting-statistics', VotingStats);

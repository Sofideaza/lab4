import store from '../store/VotingStore';
import { FIGHTS } from '../store/fightsConfig';

export class AppContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.render();

    store.addChangeListener(() => {
      this.dispatchEvent(new Event('stateChange'));
    });

    this.addEventListener('stateChange', () => this.render());
  }

  private render() {
    const state = store.getState();

    const fightsHtml = FIGHTS.map(({ fightId, characters }) => {
      const charsHtml = characters
        .map(
          (charId) =>
            `<vs-character fight-id="${fightId}" char-id="${charId}"></vs-character>`
        )
        .join('');

      return `
        <div class="fight" data-fight="${fightId}">
          <h2>Pelea ${fightId}</h2>
          <div class="characters">
            ${charsHtml}
          </div>
          <voting-statistics fight-id="${fightId}"></voting-statistics>
        </div>
      `;
    }).join('');

    this.shadowRoot!.innerHTML = `
      <style>
        .container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
          padding: 1rem;
        }
        .fight {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 1rem;
          background: #fafafa;
        }
        .fight h2 {
          margin: 0 0 0.5rem;
          font-size: 1.2rem;
        }
        .characters {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
      </style>
      <div class="container">
        ${fightsHtml}
      </div>
    `;
  }
}

customElements.define('app-container', AppContainer);

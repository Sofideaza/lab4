import store from '../store/VotingStore';
import { FIGHTS } from '../store/fightsConfig';
import { CHARACTER_NAMES } from '../store/characters';

export class AppContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    store.addChangeListener(() => this.render());
    this.render();
  }

  private render() {
    const shadow = this.shadowRoot!;
    const fightsHtml = FIGHTS.map(({ fightId, characters }) => {
      const [a, b] = characters;
      const title = `Pelea ${fightId}`;
      const charsHtml = characters
        .map(
          (charId) =>
            `<vs-character fight-id="${fightId}" char-id="${charId}"></vs-character>`
        )
        .join('');
      return `
        <div class="fight">
          <h2 class="fight-title">${title}</h2>
          <div class="vs-text">${CHARACTER_NAMES[a]} VS ${CHARACTER_NAMES[b]}</div>
          <div class="characters">${charsHtml}</div>
          
        </div>
      `;
    }).join('');

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 2rem;
          background: #f0f0f0;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }
        .fight {
          position: relative;
          background: #fff;
          border: 2px solid #960C51;
          border-radius: 16px;
          padding: 1.5rem 1.5rem 3.5rem;
          box-sizing: border-box;
        }
        .fight-title {
          margin: 0;
          font-size: 1.25rem;
          color: #960C51;
          font-weight: bold;
        }
        .characters {
          display: flex;
          justify-content: space-between;
          margin: 1rem 0 1rem;
        }
        .vs-text {
          margin: 1rem 0 1rem;
          text-align: center;
          font-size: 1.1rem;
          font-weight: bold;
          color: #960C51;
          margin-bottom: 1rem;
        }
      </style>
      <div class="container">
        ${fightsHtml}
      </div>
    `;
  }
}

customElements.define('app-container', AppContainer);


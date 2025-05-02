import { vote } from '../store/Actions';
import store from '../store/VotingStore';
import { showCharacterDetail } from './CharacterDetail';
import { CHARACTER_INFO } from '../store/characters';

export class CharacterCard extends HTMLElement {
  private fightId!: number;
  private charId!: number;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.fightId = Number(this.getAttribute('fight-id'));
    this.charId = Number(this.getAttribute('char-id'));
    store.addChangeListener(() => this.render());
    this.render();
  }

  private render() {
    const shadow = this.shadowRoot!;
    const info = CHARACTER_INFO[this.charId];
    const userVote = store.getUserVote(this.fightId);
    const voted = userVote === this.charId;

    shadow.innerHTML = `
      <style>
        :host { 
          display: inline-block; }
        .card {
          width: 160px;
          background: #fff;
          border: 2px solid #F9B5D7;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
        }
        img {
          width: 100%;
          height: 160px;
          object-fit: contain;
          background: #fff;
        }
        .name {
          padding: 0.5rem;
          font-size: 0.9rem;
          color: #333;
          text-align: center;
        }
        button {
          width: 100%;
          background: ${voted ? '#960C51' : '#F9B5D7'};
          color: #fff;
          border: none;
          padding: 0.75rem;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        button:hover {
          opacity: 0.85;
        }
      </style>
      <div class="card">
        <img src="${info.avatar}" alt="${info.name}" />
        <div class="name">${info.name}</div>
        <button>${voted ? 'Votado' : 'Votar'}</button>
      </div>
    `;

    const cardEl = shadow.querySelector('.card') as HTMLElement;
    const btnEl = shadow.querySelector('button') as HTMLElement;

    cardEl.addEventListener('click', (e) => {
      if (e.target !== btnEl) {
        showCharacterDetail(this.charId);
      }
    });

    btnEl.addEventListener('click', (e) => {
      e.stopPropagation();
      vote(this.fightId, this.charId);
    });
  }
}

customElements.define('vs-character', CharacterCard);

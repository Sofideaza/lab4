import { vote } from '../store/Actions';
import { CHARACTER_NAMES } from '../store/characters';

export class CharacterCard extends HTMLElement {
  private fightId!: number;
  private charId!: number;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.fightId = Number(this.getAttribute('fight-id'));
    this.charId  = Number(this.getAttribute('char-id'));
    this.render();
  }

  private render() {
    const shadow = this.shadowRoot!;
    shadow.innerHTML = '';

    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: inline-block;
      }
      .card {
        width: 160px;
        background: #fff;
        border: 2px solid #F9B5D7;
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
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
        background: #F9B5D7;
        color: #960C51;
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
    `;

    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = `/avatars/${this.charId}.png`;
    img.alt = CHARACTER_NAMES[this.charId];
    img.addEventListener('error', () => {
      img.src = '/avatars/placeholder.png';
    });

    const nameDiv = document.createElement('div');
    nameDiv.className = 'name';
    nameDiv.textContent = CHARACTER_NAMES[this.charId];

    const btn = document.createElement('button');
    btn.textContent = 'Votar';
    btn.addEventListener('click', () => vote(this.fightId, this.charId));

    card.append(img, nameDiv, btn);
    shadow.append(style, card);
  }
}

customElements.define('vs-character', CharacterCard);

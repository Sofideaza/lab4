import { CHARACTER_INFO, CharacterInfo } from '../store/characters';

export class CharacterDetail extends HTMLElement {
  private info!: CharacterInfo;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['char-id'];
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string
  ) {
    if (name === 'char-id' && newValue) {
      const id = Number(newValue);
      this.info = CHARACTER_INFO[id];
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    if (!this.info) return;

    const { name, race, description, avatar } = this.info;

    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.4);
          z-index: 1000;
        }
        .modal {
          background: #E8E0F2;
          border: 4px solid #5C6BC0;
          border-radius: 16px;
          max-width: 800px;
          width: 90%;
          padding: 1rem;
          display: flex;
          position: relative;
          box-sizing: border-box;
        }
        .close {
          position: absolute;
          top: 0.5rem; right: 1rem;
          font-size: 1.5rem;
          color: #5C6BC0;
          cursor: pointer;
        }
        .image {
          flex: 1; padding: 1rem;
        }
        .image img {
          width: 100%;
          border: 4px solid #5C6BC0;
          border-radius: 12px;
        }
        .info {
          flex: 2; padding: 1rem; box-sizing: border-box;
        }
        .info h2 {
          margin: 0 0 0.5rem;
          color: #5C6BC0;
        }
        .info .race {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border: 2px solid #5C6BC0;
          border-radius: 8px;
          color: #5C6BC0;
          margin-bottom: 1rem;
        }
        .info p {
          margin: 0.5rem 0 0;
          color: #333;
          line-height: 1.4;
        }
      </style>
      <div class="modal">
        <div class="close">✕</div>
        <div class="image"><img src="${avatar}" alt="${name}" /></div>
        <div class="info">
          <h2>${name}</h2>
          <div class="race">${race}</div>
          <p>${description}</p>
        </div>
      </div>
    `;


    this.shadowRoot!
      .querySelector('.close')!
      .addEventListener('click', () => this.remove());
  }
}

customElements.define('character-detail', CharacterDetail);
export function showCharacterDetail(id: number) {
  const modal = document.createElement('character-detail');
  modal.setAttribute('char-id', String(id));
  document.body.append(modal);
}


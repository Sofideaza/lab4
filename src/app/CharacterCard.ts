import { vote } from '../store/Actions';

/**
 * Component representing a single character card with vote button.
 */
export class CharacterCard extends HTMLElement {
  private fightId!: number;
  private charId!: number;

  connectedCallback() {
    this.fightId = Number(this.getAttribute('fight-id'));
    this.charId = Number(this.getAttribute('char-id'));
    this.render();
  }

  private render() {
    this.innerHTML = `
      <div class="card">
        <img src="/avatars/${this.charId}.png" alt="Personaje ${this.charId}" />
        <button>Votar</button>
      </div>
    `;
    this.querySelector('button')!.addEventListener('click', () =>
      vote(this.fightId, this.charId)
    );
  }
}

customElements.define('vs-character', CharacterCard);

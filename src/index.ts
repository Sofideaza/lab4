import './app/components';
import store from './store/VotingStore';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('app-container') as HTMLElement;
  store.addChangeListener(() => app.dispatchEvent(new Event('stateChange')));
});


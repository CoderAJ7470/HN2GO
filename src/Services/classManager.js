import headerStyles from '../CSS/header.module.css';

export function manageButtonClasses(type) {
  switch(type) {
    case 'new':
      document.getElementById('new').classList.add(headerStyles.active);
      document.getElementById('top').classList.remove(headerStyles.active);
      document.getElementById('popular').classList.remove(headerStyles.active);
    break;

    case 'top':
      document.getElementById('top').classList.add(headerStyles.active);
      document.getElementById('new').classList.remove(headerStyles.active);
      document.getElementById('popular').classList.remove(headerStyles.active);
    break;

    case 'popular':
      document.getElementById('popular').classList.add(headerStyles.active);
      document.getElementById('new').classList.remove(headerStyles.active);
      document.getElementById('top').classList.remove(headerStyles.active);
    break;

    default:
      document.getElementById('new').classList.add(headerStyles.active);
      document.getElementById('top').classList.remove(headerStyles.active);
      document.getElementById('popular').classList.remove(headerStyles.active);
  }
}
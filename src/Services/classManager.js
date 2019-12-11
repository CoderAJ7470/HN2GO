import itemsStyles from '../CSS/items.module.css';

export function manageButtonClasses(type) {
  switch(type) {
    case 'new':
      document.getElementById('new').classList.add(itemsStyles.active);
      document.getElementById('top').classList.remove(itemsStyles.active);
      document.getElementById('popular').classList.remove(itemsStyles.active);
    break;

    case 'top':
      document.getElementById('top').classList.add(itemsStyles.active);
      document.getElementById('new').classList.remove(itemsStyles.active);
      document.getElementById('popular').classList.remove(itemsStyles.active);
    break;

    case 'popular':
      document.getElementById('popular').classList.add(itemsStyles.active);
      document.getElementById('new').classList.remove(itemsStyles.active);
      document.getElementById('top').classList.remove(itemsStyles.active);
    break;

    default:
      document.getElementById('new').classList.add(itemsStyles.active);
      document.getElementById('top').classList.remove(itemsStyles.active);
      document.getElementById('popular').classList.remove(itemsStyles.active);
  }
}
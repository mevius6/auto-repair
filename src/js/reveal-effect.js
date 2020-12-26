import { revealImage } from './reveal-image';
import { revealText } from './reveal-text';
import { revealCard } from './reveal-card';
import { revealList } from './reveal-list';

export const reveal = (elems) => {
  let el = elems[0];

  if (el.nodeName === 'IMG') {
    /* eslint-disable-next-line no-unused-vars */
    const revealImages = revealImage(elems);
  }
  if (el.nodeName === 'H3') {
    /* eslint-disable-next-line no-unused-vars */
    const revealHeadlines = revealText(elems);
  }
  if (el.nodeName === 'ARTICLE') {
    /* eslint-disable-next-line no-unused-vars */
    const revealCards = revealCard(elems);
  }
  if (el.nodeName === 'UL') {
    /* eslint-disable-next-line no-unused-vars */
    const revealLists = revealList(elems);
  }
}

import { revealText } from './text-reveal';
import { revealImage } from './image-reveal';
import { revealCard } from './card-reveal';
import { revealList } from './list-reveal';

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

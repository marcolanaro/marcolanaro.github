import { ANIMATE_CIRCLE_TRASPARENCY, CIRCLE_TRANSPARENT } from '../css-classes';
import { getCircle, circles } from './get';
import {
  compose,
  removeClass,
  addClass,
  rafFlipClass,
  handleTarget,
  addEventListener,
} from '../../utils';

const getSiblingsCircle = compose(
  element => circles.filter(sibling => sibling !== element),
  getCircle
);

const setParentParentDisplay = value => el =>
  (el.parentElement.parentElement.style.display = value);

const handleSiblingsHide = compose(
  setParentParentDisplay('none'),
  handleTarget
);

const hide = pageName =>
  getSiblingsCircle(pageName).forEach(
    compose(
      rafFlipClass(ANIMATE_CIRCLE_TRASPARENCY),
      addEventListener({
        event: 'transitionend',
        callback: handleSiblingsHide,
        once: true,
      }),
      addClass(CIRCLE_TRANSPARENT)
    )
  );

const show = pageName =>
  getSiblingsCircle(pageName).forEach(
    compose(
      setParentParentDisplay(''),
      removeClass(CIRCLE_TRANSPARENT)
    )
  );

const Siblings = { hide, show };

export default Siblings;

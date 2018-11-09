import { ANIMATE_CIRCLE_TRASPARENCY, CIRCLE_TRANSPARENT } from '../css-classes';
import { getCircle, circles } from './get';
import {
  compose,
  removeClass,
  addClass,
  rafFlipClass,
  handleTarget,
  addEventListener,
  removeTransitionEnd,
} from '../../utils';

const getSiblingsCircle = compose(
  element => circles.filter(sibling => sibling !== element),
  getCircle
);

const setParentParentDisplay = value => el =>
  (el.parentElement.parentElement.style.display = value);

const removeHandlerSiblingsHide = el =>
  removeTransitionEnd(handleSiblingsHide)(el);

const handleSiblingsHide = compose(
  setParentParentDisplay('none'),
  removeHandlerSiblingsHide,
  handleTarget
);

const hide = pageName =>
  getSiblingsCircle(pageName).forEach(
    compose(
      rafFlipClass(ANIMATE_CIRCLE_TRASPARENCY),
      addEventListener({
        event: 'transitionend',
        callback: handleSiblingsHide,
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

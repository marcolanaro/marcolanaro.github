import { CIRCLE_TITLE_HEADER } from './css-classes';
import {
  compose,
  getFirstElementByClassName,
  removeDOM,
  addClass,
  innerHTML,
  createElement,
  setTransform,
  raf,
  parent,
} from '../utils';
import { getCircle } from './circles/get';

const get = () => getFirstElementByClassName(CIRCLE_TITLE_HEADER);

const remove = compose(
  removeDOM,
  get
);

const create = label =>
  compose(
    raf(raf(setTransform('translateX(0)'))),
    child => {
      compose(
        parent(el => el.appendChild(child)),
        getCircle
      )(label);
      return child;
    },
    setTransform('translateX(-100%)'),
    innerHTML(getCircle(label).title),
    addClass(CIRCLE_TITLE_HEADER),
    () => createElement('h2')
  )();

const TitleHeader = { create, remove };

export default TitleHeader;

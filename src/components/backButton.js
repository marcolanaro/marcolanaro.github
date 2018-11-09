import { CONTENT, BACK_BUTTON, BACK_BUTTON_HIDDEN } from './css-classes';
import close from '../handlers/close';
import {
  compose,
  getFirstElementByClassName,
  removeDOM,
  addClass,
  removeClass,
  addEventListener,
  innerHTML,
  setAttribute,
  createElement,
} from '../utils';

const get = () => getFirstElementByClassName(BACK_BUTTON);

const remove = compose(
  removeDOM,
  get
);

const hide = compose(
  addClass(BACK_BUTTON_HIDDEN),
  get
);

const show = compose(
  removeClass(BACK_BUTTON_HIDDEN),
  get
);

const create = compose(
  addEventListener({ event: 'click', callback: close }),
  child => getFirstElementByClassName(CONTENT).appendChild(child),
  innerHTML(`
    <svg fill="#FFFFFF" viewBox="0 0 24 24">
      <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
      <path d="M0-.5h24v24H0z" fill="none"/>
    </svg>
  `),
  addClass(BACK_BUTTON_HIDDEN),
  addClass(BACK_BUTTON),
  setAttribute({ name: 'link', value: '#' }),
  setAttribute({ name: 'title', value: 'Back' }),
  () => createElement('a')
);

const BackButton = { create, remove, show, hide };
export default BackButton;

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
  raf,
} from '../utils';

const get = () => getFirstElementByClassName(BACK_BUTTON);

const unmount = compose(
  removeDOM,
  get
);

const remove = compose(
  addEventListener({
    event: 'transitionend',
    callback: unmount,
    once: true,
  }),
  addClass(BACK_BUTTON_HIDDEN),
  get
);

const create = compose(
  raf(raf(removeClass(BACK_BUTTON_HIDDEN))),
  addEventListener({ event: 'click', callback: close, once: true }),
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

const BackButton = { create, remove };

export default BackButton;

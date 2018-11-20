import { CONTENT, PANEL, PANEL_HIDE } from './css-classes';
import { getContentFromFileName } from '../contents';
import {
  compose,
  addEventListener,
  getFirstElementByClassName,
  addClass,
  raf,
  rafFlipClass,
  removeDOM,
  createElement,
  innerHTML,
} from '../utils';

const get = () => getFirstElementByClassName(PANEL);

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
  addClass(PANEL_HIDE),
  get
);

const appendHTML = page => {
  getContentFromFileName(page).then(
    html => (getFirstElementByClassName(PANEL).innerHTML = html)
  );
};

const create = page => {
  let htmlContent = '';
  getContentFromFileName(page).then(html => {
    htmlContent = html;
  });
  compose(
    addEventListener({
      event: 'transitionend',
      callback: () => appendHTML(page),
      once: true,
    }),
    raf(rafFlipClass(PANEL_HIDE)),
    child => getFirstElementByClassName(CONTENT).appendChild(child),
    // raf because you want to wait for the promise to resolve if cache available
    raf(innerHTML(htmlContent)),
    addClass(PANEL),
    () => createElement('main')
  )();
};

const Panel = { create, remove };

export default Panel;

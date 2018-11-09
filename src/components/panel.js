import { PANEL_HIDE, PANEL_HIDDEN } from './css-classes';
import {
  compose,
  getElementsById,
  addEventListener,
  addClass,
  handleTarget,
  raf,
  rafFlipClass,
  removeClass,
} from '../utils';

const get = pageName => getElementsById(`panel-${pageName}`);

const handlePanelHidden = compose(
  addClass(PANEL_HIDDEN),
  handleTarget
);

const hide = compose(
  addEventListener({
    event: 'transitionend',
    callback: handlePanelHidden,
    once: true,
  }),
  addClass(PANEL_HIDE),
  get
);

const show = compose(
  raf(rafFlipClass(PANEL_HIDE)),
  removeClass(PANEL_HIDDEN),
  get
);

const Panel = { show, hide };

export default Panel;

import { ANIMATE_CIRCLE_EXPAND } from '../css-classes';
import { getCircle } from './get';
import {
  compose,
  addEventListener,
  raf,
  removeClass,
  addClass,
  setTransform,
  parent,
} from '../../utils';

const getCircleScale = el => {
  const parent = el.parentElement;
  const { width, height } = parent.getBoundingClientRect();
  const circle = el.getBoundingClientRect();
  const scale = Math.sqrt(width * width + height * height) / circle.width;
  return scale;
};

const getAnimationOptions = status => el => {
  setTransform('')(el);
  const circleScale = getCircleScale(el);
  const isOpening = status === 'open';
  const parent = el.parentElement;
  const first = parent.getBoundingClientRect();

  const transform = isOpening ? addClass : removeClass;
  transform('circleContainer-expanded')(parent);
  const last = parent.getBoundingClientRect();

  const scaleX = first.width / last.width;
  const scaleY = first.height / last.height;
  let translateX, translateY;
  if (isOpening) {
    translateX = first.left - (last.width - first.width) / 2;
    translateY = first.top - (last.height - first.height) / 2;
  } else {
    translateX = -last.left - (last.width - first.width) / 2;
    translateY = -last.top - (last.height - first.height) / 2;
  }

  return {
    el,
    options: {
      parent: { before: { scaleX, scaleY, translateX, translateY } },
      child: {
        before: {
          scaleX: isOpening ? 1 / scaleX : (1 / scaleX) * circleScale,
          scaleY: isOpening ? 1 / scaleY : (1 / scaleY) * circleScale,
        },
        after: {
          scale: isOpening ? getCircleScale(el) : 1,
        },
      },
    },
  };
};

const cleanUp = compose(
  parent(removeClass(ANIMATE_CIRCLE_EXPAND)),
  removeClass(ANIMATE_CIRCLE_EXPAND)
);

const getParentCircleTransform = ({ scaleX, scaleY, translateX, translateY }) =>
  `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;

const animateCircleToHeader = ({ options, listener }) =>
  compose(
    raf(
      setTransform(`scale(${options.child.after.scale})`),
      addClass(ANIMATE_CIRCLE_EXPAND),
      parent(setTransform(''), addClass(ANIMATE_CIRCLE_EXPAND))
    ),
    addEventListener({
      event: 'transitionend',
      callback: ev => {
        cleanUp(ev.target);
        !!listener && listener(ev);
      },
      once: true,
    }),
    setTransform(
      `scale(${options.child.before.scaleX}, ${options.child.before.scaleY})`
    ),
    parent(setTransform(getParentCircleTransform(options.parent.before)))
  );

const start = (status, listener) =>
  compose(
    ({ el, options }) => animateCircleToHeader({ options, listener })(el),
    getAnimationOptions(status),
    getCircle
  );

const headerAnimation = { start, cleanUp };

export default headerAnimation;

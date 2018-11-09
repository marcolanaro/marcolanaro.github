import { CIRCLE } from '../css-classes';
import {
  compose,
  getFirstElementByClassName,
  getElementsByClassName,
  getEntries,
} from '../../utils';

const getCircleSelector = pageName => `${CIRCLE}-${pageName}`;

const getCircle = compose(
  getFirstElementByClassName,
  getCircleSelector
);

const circles = compose(
  getEntries,
  getElementsByClassName
)(CIRCLE);

export { getCircle, circles };

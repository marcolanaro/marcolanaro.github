import { CIRCLE_TITLE } from '../css-classes';
import { compose, getEntries, getElementsByClassName } from '../../utils';

const titles = compose(
  getEntries,
  getElementsByClassName
)(CIRCLE_TITLE);

const setTitlesDisplay = value =>
  titles.forEach(el => (el.style.display = value));

const hide = () => setTitlesDisplay('none');

const show = () => setTitlesDisplay('block');

const Titles = { hide, show };

export default Titles;

import { compose, handleTarget } from '../utils';
import BackButton from '../components/backButton';
import Panel from '../components/panel';
import headerAnimation from '../components/circles/headerAnimation';
import Siblings from '../components/circles/siblings';
import Titles from '../components/circles/titles';
import TitleHeader from '../components/titleHeader';
import { setPageName, getPageName } from '../state';

const handleEndOpenCircle = compose(
  el => {
    TitleHeader.create(el.dataset.label);
    Panel.show(el.dataset.label);
    BackButton.create();
  },
  handleTarget
);

const open = ev => {
  if (!getPageName()) {
    setPageName(ev.target.dataset.label);
    Titles.hide();
    requestAnimationFrame(() => {
      headerAnimation.start('open', handleEndOpenCircle)(getPageName());
      Siblings.hide(getPageName());
    });
  }
};

export default open;

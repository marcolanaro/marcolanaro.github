import { compose, handleTarget } from '../utils';
import BackButton from '../components/backButton';
import Panel from '../components/panel';
import headerAnimation from '../components/circles/headerAnimation';
import Siblings from '../components/circles/siblings';
import Titles from '../components/circles/titles';
import TitleHeader from '../components/titleHeader';
import { setPageName, getPageName } from '../state';

const close = ev => {
  TitleHeader.remove();
  BackButton.remove();
  Titles.show();
  Panel.hide(getPageName());
  Siblings.show(getPageName());
  headerAnimation.start('close', undefined)(getPageName());
  setPageName(undefined);
};

export default close;

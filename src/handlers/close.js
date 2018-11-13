import { compose, handleTarget } from '../utils';
import BackButton from '../components/backButton';
import Panel from '../components/panel';
import headerAnimation from '../components/circles/headerAnimation';
import Siblings from '../components/circles/siblings';
import Titles from '../components/circles/titles';
import { setPageName, getPageName } from '../state';

const handleEndCloseCircle = compose(
  el => BackButton.remove(),
  headerAnimation.cleanUp,
  handleTarget
);

const close = ev => {
  BackButton.hide();
  Titles.show();
  Panel.hide(getPageName());
  Siblings.show(getPageName());
  headerAnimation.start('close', handleEndCloseCircle)(getPageName());
  setPageName(undefined);
};

export default close;

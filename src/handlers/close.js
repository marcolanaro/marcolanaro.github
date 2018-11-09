import { compose, removeTransitionEnd, handleTarget } from '../utils';
import BackButton from '../components/backButton';
import Panel from '../components/panel';
import headerAnimation from '../components/circles/headerAnimation';
import Siblings from '../components/circles/siblings';
import { setPageName, getPageName } from '../state';

const removeHandlerEndCloseCircle = el =>
  removeTransitionEnd(handleEndCloseCircle)(el);

const handleEndCloseCircle = compose(
  el => BackButton.remove(),
  headerAnimation.cleanUp,
  removeHandlerEndCloseCircle,
  handleTarget
);

const close = ev => {
  BackButton.hide();
  Panel.hide(getPageName());
  Siblings.show(getPageName());
  headerAnimation.start('close', handleEndCloseCircle)(getPageName());
  setPageName(undefined);
};

export default close;

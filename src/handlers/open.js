import { compose, removeTransitionEnd, handleTarget } from '../utils';
import BackButton from '../components/backButton';
import Panel from '../components/panel';
import headerAnimation from '../components/circles/headerAnimation';
import Siblings from '../components/circles/siblings';
import { setPageName, getPageName } from '../state';

const removeHandlerEndOpenCircle = el =>
  removeTransitionEnd(handleEndOpenCircle)(el);

const handleEndOpenCircle = compose(
  el => {
    Panel.show(el.dataset.label);
    BackButton.show();
  },
  headerAnimation.cleanUp,
  removeHandlerEndOpenCircle,
  handleTarget
);

const open = ev => {
  if (!getPageName()) {
    setPageName(ev.target.dataset.label);
    BackButton.create();
    requestAnimationFrame(() => {
      headerAnimation.start('open', handleEndOpenCircle)(getPageName());
      Siblings.hide(getPageName());
    });
  }
};

export default open;

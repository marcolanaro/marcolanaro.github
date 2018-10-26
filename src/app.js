import './styles.css';

// CSS Selectors
const CONTENT = 'content';
const BACK_BUTTON = 'back-button';
const BACK_BUTTON_HIDDEN = 'back-button-hidden';
const PANEL_HIDE = 'panel-hide';
const PANEL_HIDDEN = 'panel-hidden';
const CIRCLE = 'circle';
const CIRCLE_TRANSPARENT = 'circle-transparent';
const ANIMATE_CIRCLE_TRASPARENCY = 'circle-animation-trasparency';
const ANIMATE_CIRCLE_EXPAND = 'circle-animate-expand';

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// Side Effects
const createElement = (tag) => document.createElement(tag);
const getElementsByClassName = (classname) => document.getElementsByClassName(classname);
const getFirstElementByClassName = (classname) => getElementsByClassName(classname)
  ? getElementsByClassName(classname)[0]
  : undefined;
const getElementsById = (id) => document.getElementById(id);
const content = getFirstElementByClassName('content');
const appendChildToContent = (child) => content.appendChild(child);
const getEntries = (collection) => Object.keys(collection).map(id => collection[id]);
const arrayFrom = (elements) => Array.from(elements);

// Utils
const safeAndReturnElement = (fn) => (el) => {
  if (!!el) fn(el);
  return el;
};
const _innerHTML = (html) => (el) => el.innerHTML = html;
const innerHTML = compose(safeAndReturnElement, _innerHTML);
const _setAttribute = ({name, value}) => (el) => el.setAttribute(name, value);
const setAttribute = compose(safeAndReturnElement, _setAttribute);
const _setTransform = (transform) => (el) => el.style.transform = transform;
const setTransform = compose(safeAndReturnElement, _setTransform);
const _addClass = (classname) => (el) => el.classList.add(classname);
const addClass = compose(safeAndReturnElement, _addClass);
const _removeClass = (classname) => (el) => el.classList.remove(classname);
const removeClass = compose(safeAndReturnElement, _removeClass);
const _addEventListener = ({event, callback}) => (el) => el.addEventListener(event, callback);
const addEventListener = compose(safeAndReturnElement, _addEventListener);
const _removeEventListener = ({event, callback}) => (el) => el.removeEventListener(event, callback);
const removeEventListener = compose(safeAndReturnElement, _removeEventListener);
const removeTransitionEnd = (callback) => (el) =>
  removeEventListener({ event: 'transitionend', callback })(el);
const parent = (...fns) => (el) => {
  if (el && el.parentElement) {
    compose(...fns)(el.parentElement);
  }
  return el;
}
const handleTarget = (ev) => ev.target;
const raf = (...fns) => (el) => {
  requestAnimationFrame(() => compose(...fns)(el));
  return el;
};
const rafFlipClass = (className) => compose(
  raf(removeClass(className)),
  addClass(className)
);
const createA = () => createElement('a');
const removeDOM = (element) => !!element ? element.remove() : null;

// State
const state = {
  pageName: undefined,
};

// Panels
const getPage = (pageName) => getElementsById(`panel-${pageName}`);
const removeHandlerPanelHidden = (el) => removeTransitionEnd(handlePanelHidden)(el);
const handlePanelHidden = compose(
  removeHandlerPanelHidden,
  addClass(PANEL_HIDDEN),
  handleTarget
);
const hidePanel = compose(
  addEventListener({event: 'transitionend', callback: handlePanelHidden}),
  addClass(PANEL_HIDE),
  getPage
);
const showPanel = compose(
  raf(rafFlipClass(PANEL_HIDE)),
  removeClass(PANEL_HIDDEN),
  getPage
);

const close = () => {
  hideBackButton();
  hidePanel(state.pageName);
  showSiblings(state.pageName);
  removeCircleToHeader(state.pageName);
  state.pageName = undefined;
};

const open = (ev) => {
  if (!state.pageName) {
    state.pageName = ev.target.dataset.label;
    createBackButton();
    requestAnimationFrame(() => {
      addCircleToHeader(state.pageName);
      hideCircleSiblings(state.pageName);
    });
  }
}

// Back Button
const getBackButton = () => getFirstElementByClassName(BACK_BUTTON);
const removeBackButton = compose(removeDOM, getBackButton);
const hideBackButtonSelector = addClass(BACK_BUTTON_HIDDEN);
const showBackButtonSelector = removeClass(BACK_BUTTON_HIDDEN);
const hideBackButton = compose(hideBackButtonSelector, getBackButton);
const showBackButton = compose(showBackButtonSelector, getBackButton);
const createBackButton = compose(
  addEventListener({event: 'click', callback: close}),
  appendChildToContent,
  innerHTML(`
    <svg fill="#FFFFFF" viewBox="0 0 24 24">
      <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
      <path d="M0-.5h24v24H0z" fill="none"/>
    </svg>
  `),
  hideBackButtonSelector,
  addClass(BACK_BUTTON),
  setAttribute({name: 'link', value: '#'}),
  setAttribute({name: 'title', value: 'Back'}),
  createA
);

// Circles
const getCircleSelector = (pageName) => `${CIRCLE}-${pageName}`;
const getCircle = compose(
  getFirstElementByClassName,
  getCircleSelector
);
const circles = compose(getEntries, getElementsByClassName)(CIRCLE);
circles.forEach(addEventListener({event: 'click', callback: open}));
const setParentParentDisplay = (value) => (el) => el.parentElement.parentElement.style.display = value;
const removeHandlerSiblingsHide = (el) => removeTransitionEnd(handleSiblingsHide)(el);
const handleSiblingsHide = compose(
  setParentParentDisplay('none'),
  removeHandlerSiblingsHide,
  handleTarget
);
const hideCircleSiblings = (pageName) =>
  getSiblingsCircle(pageName).forEach(compose(
    rafFlipClass(ANIMATE_CIRCLE_TRASPARENCY),
    addEventListener({event: 'transitionend', callback: handleSiblingsHide}),
    addClass(CIRCLE_TRANSPARENT)
  ));
const getSiblingsCircle = compose(
  (element) => circles.filter(sibling => sibling !== element),
  getCircle
);
const showSiblings = (pageName) => getSiblingsCircle(pageName)
  .forEach(compose(
    setParentParentDisplay(''),
    removeClass(CIRCLE_TRANSPARENT),
  ));
const getCircleScale = (el) => {
  const parent = el.parentElement;
  const { width, height } = parent.getBoundingClientRect();
  const circle = el.getBoundingClientRect();
  const scale = Math.sqrt(width * width + height * height) / circle.width;
  return scale;
};
const getAnimationOptions = (status) => (el) => {
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
    translateX = first.left - (last.width - first.width)/2;
    translateY = first.top - (last.height - first.height)/2;
  } else {
    translateX = - last.left - (last.width - first.width)/2;
    translateY = - last.top - (last.height - first.height)/2;
  }
  
  return {
    el,
    options: { 
      parent: { before: { scaleX, scaleY, translateX, translateY } },
      child: {
        before: {
          scaleX: isOpening ? 1/scaleX : 1/scaleX*circleScale,
          scaleY: isOpening ? 1/scaleY : 1/scaleY*circleScale,
        },
        after: {
          scale: isOpening ? getCircleScale(el) : 1,
        },
      },
    },
  };
};
const removeHandlerEndOpenCircle = (el) => removeTransitionEnd(handleEndOpenCircle)(el);
const removeHandlerEndCloseCircle = (el) => removeTransitionEnd(handleEndCloseCircle)(el);
const cleanUpCircleAnimation = compose(
  parent(removeClass(ANIMATE_CIRCLE_EXPAND)),
  removeClass(ANIMATE_CIRCLE_EXPAND),
);
const handleEndOpenCircle = compose(
  (el) => {
    showPanel(el.dataset.label);
    showBackButton();
  },
  cleanUpCircleAnimation,
  removeHandlerEndOpenCircle,
  handleTarget
);
const handleEndCloseCircle = compose(
  (el) => removeBackButton(),
  cleanUpCircleAnimation,
  removeHandlerEndCloseCircle,
  handleTarget
);
const getParentCircleTransform = ({ scaleX, scaleY, translateX, translateY }) =>
  `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
const animateCircleToHeader = ({options, scaleCircle, listener}) => compose(
  raf(
    setTransform(`scale(${options.child.after.scale})`),
    addClass(ANIMATE_CIRCLE_EXPAND),
    parent(
      setTransform(''),
      addClass(ANIMATE_CIRCLE_EXPAND)
    )
  ),
  addEventListener({ event: 'transitionend', callback: listener }),
  setTransform(`scale(${options.child.before.scaleX}, ${options.child.before.scaleY})`),
  parent(
    setTransform(getParentCircleTransform(options.parent.before))
  )
);
const setCircleHeader = (status, listener) => compose(
  ({ el, options }) => animateCircleToHeader({ options, listener })(el),
  getAnimationOptions(status),
  getCircle
);
const addCircleToHeader = setCircleHeader('open', handleEndOpenCircle);
const removeCircleToHeader = setCircleHeader('close', handleEndCloseCircle);
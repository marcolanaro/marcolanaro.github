const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const createElement = tag => document.createElement(tag);

const getElementsByClassName = classname =>
  document.getElementsByClassName(classname);

const getFirstElementByClassName = classname =>
  getElementsByClassName(classname)
    ? getElementsByClassName(classname)[0]
    : undefined;

const getElementsById = id => document.getElementById(id);

const getEntries = collection =>
  Object.keys(collection).map(id => collection[id]);

const arrayFrom = elements => Array.from(elements);

const safeAndReturnElement = fn => el => {
  if (!!el) fn(el);
  return el;
};

const _innerHTML = html => el => (el.innerHTML = html);

const innerHTML = compose(
  safeAndReturnElement,
  _innerHTML
);

const _setAttribute = ({ name, value }) => el => el.setAttribute(name, value);

const setAttribute = compose(
  safeAndReturnElement,
  _setAttribute
);

const _setTransform = transform => el => (el.style.transform = transform);

const setTransform = compose(
  safeAndReturnElement,
  _setTransform
);

const _addClass = classname => el => el.classList.add(classname);

const addClass = compose(
  safeAndReturnElement,
  _addClass
);

const _removeClass = classname => el => el.classList.remove(classname);

const removeClass = compose(
  safeAndReturnElement,
  _removeClass
);

const _addEventListener = ({ event, callback, once }) => el =>
  el.addEventListener(event, callback, { once });

const addEventListener = compose(
  safeAndReturnElement,
  _addEventListener
);

const parent = (...fns) => el => {
  if (el && el.parentElement) {
    compose(...fns)(el.parentElement);
  }
  return el;
};

const handleTarget = ev => ev.target;

const raf = (...fns) => el => {
  requestAnimationFrame(() => compose(...fns)(el));
  return el;
};

const rafFlipClass = className =>
  compose(
    raf(removeClass(className)),
    addClass(className)
  );

const removeDOM = element => (!!element ? element.remove() : null);

export {
  compose,
  createElement,
  removeDOM,
  getElementsByClassName,
  getFirstElementByClassName,
  getElementsById,
  getEntries,
  arrayFrom,
  innerHTML,
  setAttribute,
  setTransform,
  addClass,
  removeClass,
  addEventListener,
  removeEventListener,
  removeTransitionEnd,
  parent,
  handleTarget,
  raf,
  rafFlipClass,
};

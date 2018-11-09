const state = {
  pageName: undefined,
};

const setPageName = name => (state.pageName = name);
const getPageName = () => state.pageName;

export { setPageName, getPageName };

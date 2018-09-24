export const updateNavigationState = navEvent => ({
  type: 'UPDATE_NAVIGATION_STATE',
  navEvent
});

export const setModal = name => ({
  type: 'SET_MODAL',
  name
});

export const setConfig = (section, config, value) => ({
  type: 'SET_CONFIG',
  section,
  config,
  value
});

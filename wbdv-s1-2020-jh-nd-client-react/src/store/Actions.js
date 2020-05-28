// Actions
export const SELECT_USER = 'SELECT_USER';
export const DESELECT_USER = 'DESELECT_USER';

// Action creators
export const selectUser = (selected_user) => {
  return {type: SELECT_USER, selected_user}
};

export const deselectUser = (deselected_user) => {
  return {type: DESELECT_USER, deselected_user}
};
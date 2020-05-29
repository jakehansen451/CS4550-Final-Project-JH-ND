// Actions
export const SELECT_USER = 'SELECT_USER';
export const DESELECT_USER = 'DESELECT_USER';
export const SELECT_TIME = 'SELECT_TIME';

// Action creators
export const selectUser = (selected_user) => {
  return {type: SELECT_USER, selected_user}
};

export const deselectUser = (deselected_user) => {
  return {type: DESELECT_USER, deselected_user}
};

export const selectTime = (time_block) => {
  return {type: SELECT_TIME, time_block}
};
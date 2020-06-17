// Actions
export const SELECT_USER = 'SELECT_USER';
export const DESELECT_USER = 'DESELECT_USER';
export const SELECT_TIME = 'SELECT_TIME';
export const SET_GOOGLE_AUTH = "SET_GOOGLE_AUTH";
export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

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

export const setGoogleAuth = (googleAuth) => {
  return {type: SET_GOOGLE_AUTH, googleAuth}
};

export const setUser = (user) => {
  return {type: SET_USER, user}
};

export const unsetUser = () => {
  return {type: UNSET_USER}
};
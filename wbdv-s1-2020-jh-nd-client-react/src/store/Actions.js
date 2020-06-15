// Actions
export const SELECT_USER = 'SELECT_USER';
export const DESELECT_USER = 'DESELECT_USER';
export const SELECT_TIME = 'SELECT_TIME';
export const SET_GOOGLE_AUTH = "SET_GOOGLE_AUTH";
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

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

export const login = (user) => {
  return {type: LOGIN, user}
};

export const logout = () => {
  return {type: LOGOUT}
};
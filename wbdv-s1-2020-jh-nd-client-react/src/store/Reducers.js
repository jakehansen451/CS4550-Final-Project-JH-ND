import * as Actions from './Actions';

const selectedUsers = (selected_users = [], action) => {
  switch (action.type) {
    case Actions.SELECT_USER:
      return [...selected_users, action.selected_user];
    case Actions.DESELECT_USER:
      return selected_users.filter(
          (user) => user._id !== action.deselected_user._id);
    case Actions.SET_SELECTED_USERS:
      return action.users;
    default:
      return selected_users;
  }
};

const selectedTimeBlock = (selected_time_block = {}, action) => {
  switch (action.type) {
    case Actions.SELECT_TIME:
      if (action.time_block === selected_time_block) {
        return {}
      } else {
        return action.time_block;
      }
    default:
      return selected_time_block;
  }
};

const googleAuth = (googleAuth = {}, action) => {
  switch (action.type) {
    case Actions.SET_GOOGLE_AUTH:
      return action.googleAuth;
    default:
      return googleAuth;
  }
};

const currentUser = (currentUser = {}, action) => {
  switch (action.type) {
    case Actions.SET_USER:
      return action.user;
    case Actions.UNSET_USER:
      return {};
    default:
      return currentUser;
  }
};

const rootReducer = (state = {}, action) => {
  return {
    users: state.users,
    selected_users: selectedUsers(state.selected_users, action),
    selected_time_block: selectedTimeBlock(state.selected_time_block, action),
    googleAuth: googleAuth(state.googleAuth, action),
    current_user: currentUser(state.current_user, action),
  }
};

export default rootReducer;
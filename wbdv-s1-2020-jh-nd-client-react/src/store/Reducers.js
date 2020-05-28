import * as Actions from './Actions';

const selectedUsers = (selected_users = [], action) => {
  switch(action.type) {
    case Actions.SELECT_USER:
      return [...selected_users, action.selected_user];
    case Actions.DESELECT_USER:
      return selected_users.filter((user) => user._id !== action.deselected_user._id);
    default:
      return selected_users;
  }
};

const rootReducer = (state = {}, action) => {
  return {
    selected_users: selectedUsers(state.selected_users, action)
  }
};

export default rootReducer;
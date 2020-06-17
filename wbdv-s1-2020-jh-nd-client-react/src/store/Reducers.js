import * as Actions from './Actions';

let fakeState = {
  selectedUsers: [],
  selected_time_block: {},
  /*
  current_user: {
    _id: '3',
    username: 'alice',
    password: 'alice',
    firstName: 'Alice',
    lastName: 'Albertson',
    email: 'albertson.a@gmail.com',
    role: 'STUDENT',
    roleData: {
      coursesEnrolled: ['0'],
    },
    events: [],
  },
  */
  courses: [
    {title: 'CS2500', _id: '0'},
    {title: 'CS3800', _id: '1'},
    {title: 'CS4550', _id: '2'},
  ]
};

const selectedUsers = (selected_users = [], action) => {
  switch (action.type) {
    case Actions.SELECT_USER:
      return [...selected_users, action.selected_user];
    case Actions.DESELECT_USER:
      return selected_users.filter(
          (user) => user._id !== action.deselected_user._id);
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
      console.log(action.user)
      return action.user;
    case Actions.UNSET_USER:
      return {};
    default:
      return currentUser;
  }
};

const course = (course = [], action) => {
  switch(action.type) {
    default:
      return course;
  }
};

const rootReducer = (state = fakeState, action) => {
  return {
    users: state.users,
    selected_users: selectedUsers(state.selected_users, action),
    selected_time_block: selectedTimeBlock(state.selected_time_block, action),
    googleAuth: googleAuth(state.googleAuth, action),
    current_user: currentUser(state.current_user, action),
    courses: course(state.courses, action),
  }
};

export default rootReducer;
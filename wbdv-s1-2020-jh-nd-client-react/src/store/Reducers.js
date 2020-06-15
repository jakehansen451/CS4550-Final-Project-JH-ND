import * as Actions from './Actions';

let fakeState = {
  users: [
    {
      _id: '0',
      username: 'hansen.j',
      password: 'password',
      firstName: 'Jake',
      lastName: 'Hansen',
      email: 'hansen.j@husky.neu.edu',
      role: 'TUTOR',
      roleData: {
        coursesTaught: [0],
        coursesEnrolled: [1, 2],
        officeHours: []
      },
      events: [],
    },
    {
      _id: '1',
      username: 'damrina.n',
      password: 'password',
      firstName: 'Nadiia',
      lastName: 'Damrina',
      email: 'damrina.n@husky.neu.edu',
      role: 'TUTOR',
      roleData: {
        coursesTaught: [0],
        coursesEnrolled: [1],
        officeHours: []
      },
      events: [],
    },
    {
      _id: '2',
      username: 'annunziato.j',
      password: 'password',
      firstName: 'Jose',
      lastName: 'Annunziato',
      email: 'annunziato.j@northeastern.edu',
      role: 'STUDENT',
      roleData: {
        coursesEnrolled: [0]
      },
      events: [],
    },
    {
      _id: '3',
      username: 'alice',
      password: 'alice',
      firstName: 'Alice',
      lastName: 'Albertson',
      email: 'albertson.a@gmail.com',
      role: 'STUDENT',
      roleData: {
        coursesEnrolled: [0],
      },
      events: [], // To be populated by Google API
    },
    {
      _id: '4',
      username: 'bob',
      password: 'bob',
      firstName: 'Bo',
      lastName: 'B',
      email: 'b.b@husky.neu.edu',
      role: 'ADMIN',
      roleData: {
        coursesTaught: [0],
        officeHours: []
      },
      events: [],
    },
    {
      _id: '5',
      username: 'charlie',
      password: 'charlie',
      firstName: 'Char',
      lastName: 'Lie',
      email: 'lie.c@husky.neu.edu',
      role: 'ADMIN',
      roleData: {
        coursesTaught: [1],
        officeHours: []
      },
      events: [],
    },
    {
      _id: '6',
      username: 'admin',
      password: 'admin',
      firstName: 'Ad',
      lastName: 'Min',
      email: 'ad.min@gmail.edu',
      role: 'ADMIN',
      roleData: {
        coursesTaught: [2],
        officeHours: []
      },
      events: [],
    },
  ],
  selectedUsers: [],
  selected_time_block: {},
  current_user: {
    _id: '3',
    username: 'alice',
    password: 'alice',
    firstName: 'Alice',
    lastName: 'Albertson',
    email: 'albertson.a@gmail.com',
    role: 'STUDENT',
    roleData: {
      coursesEnrolled: [0],
    },
    events: [],
  },
  courses: [
    {title: 'CS2500', _id: 0},
    {title: 'CS3800', _id: 1},
    {title: 'CS4550', _id: 2},
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
    case Actions.LOGIN:
      return action.user;
    case Actions.LOGOUT:
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
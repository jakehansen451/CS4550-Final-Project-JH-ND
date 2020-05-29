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
        phone: '503-348-4863',
        role: 'admin',
        roleData: {
          coursesTutor: ['CS2500'],
          officeHours: [] // To be populated by Google API
        },
        events: [], // To be populated by Google API
        sleep_times: {
          /*
           * Takes the format: X/Y where X is the earliest the user would get
           * up for an event, and Y is the latest they would stay up for one
           *
           * A typical use case would look like: mo: '14:00:00/02:00:00',
           * meaning a user would be willing to schedule an event any time from
           * 2pm on Monday to 2am on Tuesday
           *
           *
           * If Y is later in the day than X from the next day, that indicates
           * the user has no preference and would schedule events at any time
           * that day
           *
           * All times are in UTC
           *
           * Keyed by integer to allow easy mapping with Date.getDay()
           */
          '0': '10:00:00/22:00:00', // Sunday
          '1': '08:00:00/22:00:00', // Monday
          '2': '08:00:00/22:00:00', // Tuesday
          '3': '08:00:00/22:00:00', // Wednesday
          '4': '08:00:00/22:00:00', // Thursday
          '5': '08:00:00/00:00:00', // Friday
          '6': '10:00:00/00:00:00'  // Saturday
        }
      },
      {
        _id: '1',
        username: 'damrina.n',
        password: 'password',
        firstName: 'Nadiia',
        lastName: 'Damrina',
        email: 'damrina.n@husky.neu.edu',
        phone: '',
        role: 'tutor',
        roleData: {
          coursesTutor: ['CS2500'],
          coursesEnrolled: ['CS4550'],
          officeHours: []
        },
        events: [],
        sleep_times: {
        }
      },
      {
        _id: '2',
        username: 'annunziato.j',
        password: 'password',
        firstName: 'Jose',
        lastName: 'Annunziato',
        email: 'annunziato.j@northeastern.edu',
        phone: '',
        role: 'student',
        roleData: {
          coursesEnrolled: ['CS2500']
        },
        events: [],
        sleep_times: {
        }
      },
    ],
  selectedUsers: [],
  selected_time_block: {
  }
};

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

const selectedTimeBlock = (selected_time_block = {}, action) => {
  switch(action.type) {
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

const rootReducer = (state = fakeState, action) => {
  return {
    users: state.users,
    selected_users: selectedUsers(state.selected_users, action),
    selected_time_block: selectedTimeBlock(state.selected_time_block, action),
  }
};

export default rootReducer;
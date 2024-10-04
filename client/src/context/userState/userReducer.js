import * as types from './userActionTypes';
import { message } from 'antd';

export default (state, action) => {
  switch (action.type) {
    case types.USER_START:
      return {
        ...state,
        loading: true,
        message: null,
        user: null,
        error: null
      };
    case types.VIDEO_START:
      return {
        ...state,
        loading: true,
        message: null,
        user: null,
        error: null
      };
    case types.SCRIPT_START:
      return {
        ...state,
        loading: true,
        message: null,
        user: null,
        error: null
      };

    case types.USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case types.ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        admins: action.payload
      };
    case types.GET_LOGGED_IN_USER:
      return {
        ...state,
        loading: false,
        me: action.payload
      };
    case types.GET_VIDEOS:
      return {
        ...state,
        loading: false,
        videos: action.payload,
        error: false,
        errResponse: ''
      };
    case types.GET_TEACHERS:
      return {
        ...state,
        loading: false,
        staffs: action.payload,
        error: false,
        errResponse: ''
      };
    case types.GET_SCRIPTS:
      return {
        ...state,
        loading: false,
        scripts: action.payload,
        error: false,
        errResponse: ''
      };
    case types.GET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: false,
        errResponse: ''
      };
    case types.GET_VIDEO:
      return {
        ...state,
        loading: false,
        video: action.payload,
        error: false,
        errResponse: ''
      };
    case types.GET_SCRIPT:
      return {
        ...state,
        loading: false,
        script: action.payload,
        error: false,
        errResponse: ''
      };
    case types.USER_ADD:
      return {
        ...state,
        users: [action.payload, ...state.users],
        loading: false,
        error: false,
        errResponse: '',
        message: 'Add success'
      };
    case types.VIDEO_ADD:
      return {
        ...state,
        users: [action.payload, ...state.videos],
        loading: false,
        error: false,
        errResponse: '',
        message: 'Add success'
      };
    case types.SCRIPT_ADD:
      return {
        ...state,
        scripts: [action.payload, ...state.scripts],
        loading: false,
        error: false,
        errResponse: '',
        message: 'Add success'
      };

    case types.USER_EDIT:
      const tempState = state.users.filter(
        (data) => data._id !== action.payload._id
      );

      return {
        ...state,
        users: [action.payload, ...tempState],
        loading: false,
        error: false,
        errResponse: '',
        user: action.payload,
        message: 'Edited success'
      };
    case types.ADMIN_EDIT:
      const tempState3 = state.admins.filter(
        (data) => data._id !== action.payload._id
      );

      return {
        ...state,
        admins: [action.payload, ...tempState3],
        loading: false,
        error: false,
        errResponse: '',
        user: action.payload,
        message: 'Edited success'
      };
    case types.VIDEO_EDIT:
      const tempState2 = state.videos.filter(
        (data) => data._id !== action.payload._id
      );

      return {
        ...state,
        videos: [action.payload, ...tempState2],
        loading: false,
        error: false,
        errResponse: '',
        video: action.payload,
        message: 'Edited success'
      };
    case types.SCRIPT_EDIT:
      const tempState4 = state.scripts.filter(
        (data) => data._id !== action.payload._id
      );

      return {
        ...state,
        scripts: [action.payload, ...tempState4],
        loading: false,
        error: false,
        errResponse: '',
        script: action.payload,
        message: 'Edited success'
      };
    case types.VIDEO_DELETE:
      return {
        ...state,
        videos: [
          ...state.videos.slice().filter((data) => data._id !== action.payload)
        ],

        loading: false,
        error: false,
        errResponse: '',
        user: null,
        message: 'Deleted successfully'
      };
    case types.SCRIPT_DELETE:
      return {
        ...state,
        scripts: [
          ...state.scripts.slice().filter((data) => data._id !== action.payload)
        ],

        loading: false,
        error: false,
        errResponse: '',
        user: null,
        message: 'Deleted successfully'
      };
    case types.USER_DELETE:
      return {
        ...state,
        users: [
          ...state.users.slice().filter((data) => data._id !== action.payload)
        ],
        loading: false,
        error: false,
        errResponse: '',
        user: null,
        message: 'Deleted successfully'
      };
    case types.USER_PASSWORD_CHANGE:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: '',
        message: 'Password change success'
      };
    case types.GET_USERS_BY_MONTH:
      return {
        ...state,
        loading: false,
        usersByMonth: action.payload,
        error: false,
        errResponse: ''
      };

    case types.USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errResponse: action.payload
      };
    case types.USER_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: '',
        message: null
      };

    default:
      return state;
  }
};

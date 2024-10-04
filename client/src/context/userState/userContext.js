import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback
} from 'react';
import userReducer from './userReducer';
import * as types from './userActionTypes';
import adminApi from '../../helpers/apiUtils';
import axios from 'axios';

const initialUserState = {
  loading: false,
  error: false,
  users: null,
  admins: null,
  videos: null,
  scripts: null,
  user: null,
  admin: null,
  video: null,
  script: null,
  me: null,
  usersByMonth: null,
  errResponse: '',
  message: null
};

export const UserContext = createContext(initialUserState);

export const BE_API = 'https://wecinema.onrender.com'; //'https://pcgs.onrender.com';

export const UserProvider = ({ children }) => {
  //   const BASE_AUTH_URL = process.env.API_BASE_URL + "api/"
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  const UserReset = () => {
    dispatch({
      type: types.USER_RESET
    });
  };
  const fetchVideos = useCallback(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BE_API + '/video/all');
        dispatch({
          type: types.GET_VIDEOS,
          payload: response.data
        });
      } catch (error) {
        console.error('Error fetching students:', error);
        dispatch({
          type: types.USER_FAILURE,
          payload: error.response
            ? error.response.data.error_msg
            : 'An error occurred while fetching students'
        });
      }
    };

    fetchData(); // Invoke the fetchData function immediately
  }, [dispatch]); // Include 'dispatch' as a dependency

  const changeUserStatus = useCallback(
    (userId, status) => {
      const fetchData = async () => {
        try {
          await axios.post(BE_API + '/user/change-user-status', {
            userId,
            status
          });
          const res = await axios.get(BE_API + '/user');
          dispatch({
            type: types.USER_SUCCESS,
            payload: res.data
          });
        } catch (error) {
          console.error('Error updating user status:', error);
          dispatch({
            type: types.USER_FAILURE,
            payload: error.response
              ? error.response.data.error_msg
              : 'An error occurred while updating user status'
          });
        }
      };

      fetchData(); // Invoke the fetchData function immediately
    },
    [dispatch]
  ); // Include 'dispatch' as a dependency

  const changeVideoStatus = useCallback(
    (videoId, status) => {
      const fetchData = async () => {
        try {
          await axios.post(BE_API + '/video/change-video-status', {
            videoId,
            status
          });
          const res = await axios.get(BE_API + '/video/all');
          dispatch({
            type: types.GET_VIDEOS,
            payload: res.data
          });
        } catch (error) {
          console.error('Error updating video status:', error);
          dispatch({
            type: types.USER_FAILURE,
            payload: error.response
              ? error.response.data.error_msg
              : 'An error occurred while updating user status'
          });
        }
      };

      fetchData(); // Invoke the fetchData function immediately
    },
    [dispatch]
  );
  const fetchScripts = useCallback(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BE_API + '/video/author/scripts');
        // console.log(response);
        dispatch({
          type: types.GET_SCRIPTS,
          payload: response.data
        });
      } catch (error) {
        console.error('Error fetching results:', error);
        dispatch({
          type: types.USER_FAILURE,
          payload: error.response
            ? error.response.data.error_msg
            : 'An error occurred while fetching results'
        });
      }
    };

    fetchData(); // Invoke the fetchData function immediately
  }, [dispatch]); // Include 'dispatch' as a dependency

  const fetchUsers = useCallback(async () => {
    dispatch({
      type: types.USER_START
    });
    try {
      // const res = await adminApi.get('/api/user/');
      const res = await axios.get(BE_API + '/user');

      dispatch({
        type: types.USER_SUCCESS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error?.response?.data.error_msg
      });
    }
  }, []);

  const fetchAdmins = useCallback(async () => {
    dispatch({
      type: types.ADMIN_START
    });
    try {
      const res = await adminApi.get('/api/user/');
      console.log(res.data.data);
      dispatch({
        type: types.ADMIN_SUCCESS,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.ADMIN_FAILURE,
        payload: error?.response?.data.error_msg
      });
    }
  }, []);

  const fetchLoggedInUser = useCallback(async () => {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await adminApi.get('/api/user/me');
      console.log(res);
      dispatch({
        type: types.GET_LOGGED_IN_USER,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error?.response?.data?.error_msg
      });
    }
  }, []);

  const addUser = useCallback(async (data) => {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await axios.post(BE_API + '/user/register', data);
      dispatch({
        type: types.USER_ADD,
        payload: res.data.data
      });
      const resp = await axios.get(BE_API + '/user');

      dispatch({
        type: types.USER_SUCCESS,
        payload: resp.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error
      });
    }
  }, []);

  const addVideo = useCallback(async (data) => {
    try {
      const res = await axios.post(BE_API + '/video/create', data);
      dispatch({
        type: types.VIDEO_ADD,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.VIDEO_FAILURE,
        payload: error.response.data.error
      });
    }
  }, []);
  const addScript = useCallback(async (data) => {
    try {
      const res = await axios.post(BE_API + '/video/scripts', data);
      dispatch({
        type: types.SCRIPT_ADD,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.SCRIPT_FAILURE,
        payload: error.response.data.error
      });
    }
  }, []);

  const fetchUsersByMonth = useCallback(async () => {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await adminApi.get('/api/user/group/group-by-month');
      dispatch({
        type: types.GET_USERS_BY_MONTH,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);

  const fetchSingleUser = useCallback(async (id, role) => {
    dispatch({
      type: types.USER_START
    });
    const tempState = { ...state };
    if (!tempState.users) {
      try {
        const res =
          role === 'admin'
            ? await adminApi.get(`/api/user/single/${id}`)
            : await axios.get(BE_API + '/user/' + id);
        // console.log(res);
        dispatch({
          type: types.GET_USER,
          payload: role === 'admin' ? res.data.data : res.data
        });
      } catch (error) {
        dispatch({
          type: types.USER_FAILURE,
          payload: error.response.data.error_msg
        });
      }
    } else {
      const user = tempState.fliter((user) => user._id == id);
      dispatch({
        type: types.GET_USER,
        payload: user
      });
    }
  }, []);

  const fetchSingleVideo = useCallback(async (id) => {
    dispatch({
      type: types.VIDEO_START
    });
    const tempState = { ...state };

    if (!tempState.videos) {
      try {
        const res = await axios.get(BE_API + '/video/' + id);
        // console.log(res);
        dispatch({
          type: types.GET_VIDEO,
          payload: res.data
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: types.VIDEO_FAILURE,
          payload: error.response.data.error_msg
        });
      }
    } else {
      const video = tempState.fliter((video) => video._id == id);

      dispatch({
        type: types.GET_VIDEO,
        payload: video
      });
    }
  }, []);

  const fetchSingleScript = useCallback(async (id) => {
    dispatch({
      type: types.SCRIPT_START
    });
    const tempState = { ...state };

    if (!tempState.videos) {
      try {
        const res = await axios.get(BE_API + '/video/scripts/' + id);
        // console.log(res);
        dispatch({
          type: types.GET_SCRIPT,
          payload: res.data
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: types.SCRIPT_FAILURE,
          payload: error.response.data.error_msg
        });
      }
    } else {
      const video = tempState.fliter((video) => video._id == id);

      dispatch({
        type: types.GET_VIDEO,
        payload: video
      });
    }
  }, []);
  const editUserAction = useCallback(async (data) => {
    const { role, _id: id } = data;
    dispatch({
      type: types.USER_START
    });
    try {
      const res =
        role === 'admin'
          ? await adminApi.patch('/api/user/edit-user', data)
          : await adminApi.put(BE_API + `/user/edit/${id}`, data);
      dispatch({
        type: role === 'admin' ? types.ADMIN_EDIT : types.USER_EDIT,
        payload: role === 'admin' ? res.data.data : res.data.user
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.USER_FAILURE,
        payload: error?.response?.data?.error_msg
      });
    }
  }, []);

  const editVideoAction = useCallback(async (data) => {
    const { _id: id } = data;
    dispatch({
      type: types.VIDEO_START
    });
    try {
      const res = await adminApi.put(BE_API + `/video/edit/${id}`, data);

      dispatch({
        type: types.VIDEO_EDIT,
        payload: res.data.video
      });
      console.log(res);
    } catch (error) {
      dispatch({
        type: types.VIDEO_FAILURE,
        payload: error?.response?.data?.error_msg
      });
    }
  }, []);

  const editScriptAction = useCallback(async (data) => {
    const { _id: id } = data;
    dispatch({
      type: types.SCRIPT_START
    });
    try {
      const res = await adminApi.put(BE_API + `/video/scripts/${id}`, data);

      dispatch({
        type: types.SCRIPT_EDIT,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: types.SCRIPT_FAILURE,
        payload: error?.response?.data?.error_msg
      });
    }
  }, []);

  const deleteUserAction = useCallback(async (id) => {
    dispatch({
      type: types.USER_START
    });
    try {
      await adminApi.delete(BE_API + `/user/delete/${id}`);
      dispatch({
        type: types.USER_DELETE,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);

  const deleteVideoAction = useCallback(async (id) => {
    dispatch({
      type: types.VIDEO_START
    });
    try {
      await adminApi.delete(BE_API + `/video/delete/${id}`);
      dispatch({
        type: types.VIDEO_DELETE,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);

  const deleteScriptAction = useCallback(async (id) => {
    dispatch({
      type: types.SCRIPT_START
    });
    try {
      await adminApi.delete(BE_API + `/video/scripts/${id}`);
      dispatch({
        type: types.SCRIPT_DELETE,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: types.SCRIPT_FAILURE,
        payload: error.response.data.error_msg
      });
    }
  }, []);

  const changeUserPasswordAction = useCallback(async (data) => {
    dispatch({
      type: types.USER_START
    });
    try {
      await adminApi.post('/api/auth/change-password', data);
      dispatch({
        type: types.USER_PASSWORD_CHANGE
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.response.data.error_msg
      });
    }
    fetchSingleUser(data._id);
  }, []);

  useEffect(() => {
    fetchLoggedInUser();
    fetchUsers();
    // fetchStaffs();
    fetchAdmins();
    fetchVideos();
    fetchScripts();
    fetchUsersByMonth();
  }, []);

  return (
    <UserContext.Provider
      value={{
        state,
        fetchSingleUser,
        fetchSingleVideo,
        fetchSingleScript,
        fetchAdmins,
        fetchScripts,
        fetchUsersByMonth,
        editUserAction,
        editVideoAction,
        editScriptAction,
        changeUserPasswordAction,
        addUser,
        addVideo,
        deleteUserAction,
        deleteVideoAction,
        deleteScriptAction,
        changeUserStatus,
        changeVideoStatus,
        fetchVideos,
        UserReset,
        addScript
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

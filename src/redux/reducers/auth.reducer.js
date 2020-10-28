import {CLEAN_ACCOUNT_SETTINGS, SET_ACCOUNT_SETTINGS} from "../actions/auth.actions";

const initialState = {
  isAuthenticated:false,
  tokenId: '',
  accessToken: '',
  userMail: ''
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCOUNT_SETTINGS:
      return Object.assign({}, state, action.payload);
    case CLEAN_ACCOUNT_SETTINGS:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}

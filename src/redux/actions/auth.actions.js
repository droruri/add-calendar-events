export const FETCH_ACCOUNT_SETTINGS_FROM_LOCAL = 'FETCH_ACCOUNT_SETTINGS_FROM_LOCAL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const SET_ACCOUNT_SETTINGS = 'SET_ACCOUNT_SETTINGS';
export const CLEAN_ACCOUNT_SETTINGS = 'CLEAN_ACCOUNT_SETTINGS';

export function setAccountSettings(settings) {
  return {
    type: SET_ACCOUNT_SETTINGS,
    payload: settings
  }
}

export function cleanAccountSettings() {
  return {
    type: CLEAN_ACCOUNT_SETTINGS
  }
}

export function fetchAccountSettingsFromLocal() {
  return {
    type: FETCH_ACCOUNT_SETTINGS_FROM_LOCAL
  }
}

export function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    payload: token
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}

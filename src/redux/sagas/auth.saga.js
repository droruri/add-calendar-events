import {put, takeEvery} from 'redux-saga/effects';
import {
  LOGIN_SUCCESS,
  cleanAccountSettings,
  FETCH_ACCOUNT_SETTINGS_FROM_LOCAL,
  LOGOUT,
  setAccountSettings
} from '../actions/auth.actions';
import {getAuthDetails} from "../../services/auth.service";

const gapi = window.gapi
/*
  Update with your own Client Id and Api key
*/
const CLIENT_ID = "59992740525-p429ti7sc76rsf871clrj1gg09emmg9c.apps.googleusercontent.com"
const API_KEY = "AIzaSyCzBlTXZ43N20soFAchHnwbECqHy6MxPwQ"
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
const SCOPES = "https://www.googleapis.com/auth/calendar.events"

function* setAccountHandler() {
  if (!localStorage.getItem('googleUser')) return;

  try {
    const googleUser = getAuthDetails();
    const details = {
      isAuthenticated: true,
      tokenId: googleUser.tokenId,
      accessToken: googleUser.accessToken,
      userMail: googleUser.profileObj.email
    }

    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.auth.setToken({
        access_token: googleUser.accessToken
      });

      gapi.client.load('calendar', 'v3', () => console.log('calendar api loaded!'))
    })


    yield put(
      setAccountSettings(details)
    );

  } catch (e) {
    console.error('Error in initializing auth service', e);
    throw e;
  }
}

function* authLogoutHandler() {
  localStorage.removeItem('googleUser');
  yield put(cleanAccountSettings());
}

function* authenticationSuccessHandler(action) {
  localStorage.setItem('googleUser', JSON.stringify(action.payload));
  yield setAccountHandler();
}

function* authSaga() {
  yield takeEvery(FETCH_ACCOUNT_SETTINGS_FROM_LOCAL, setAccountHandler);
  yield takeEvery(LOGIN_SUCCESS, authenticationSuccessHandler);
  yield takeEvery(LOGOUT, authLogoutHandler);
}

export default authSaga;

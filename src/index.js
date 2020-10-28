import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import './index.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, compose, createStore} from 'redux';
import rootReducer from "./redux/reducers/main-reducer";
import rootSaga from "./redux/sagas/rootSaga";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// mount it on the Store
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
  )
);

// then run the saga
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

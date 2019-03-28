import React from 'react';
import ReactDOM from 'react-dom';
import GoTApp from './GoTApp';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { characterReducer } from './reducers/characterReducer';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { bookReducer } from './reducers/bookReducer';
import { characterSagas } from './sagas/characterSagas';
import { bookSagas } from './sagas/bookSagas';


const rootReducer = combineReducers({
  characters: characterReducer,
  books: bookReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(bookSagas);
sagaMiddleware.run(characterSagas);
ReactDOM.render(
  <Provider store={store}><GoTApp /></Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

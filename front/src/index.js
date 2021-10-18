import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { loadStreamList } from './actions';
import questionnaireReducer from './reducers';
import rootSaga from './sagas';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(questionnaireReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
store.dispatch(loadStreamList());

render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);
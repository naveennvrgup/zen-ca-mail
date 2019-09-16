import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom'

// redux
import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";


// reducers
import subscriberReducer from "./admin/subscriber/reducer";


// root reducer
const rootReducer = combineReducers({
    subscribers: subscriberReducer
});

//store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(thunk))
);



ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

serviceWorker.register();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Immutable from 'immutable';

import reducer from '../reudx/reducer';

const composeEnhancers = composeWithDevTools({});
const initState = Immutable.fromJS({});
const store = createStore(reducer, initState, composeEnhancers(applyMiddleware(Thunk)));


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>hello</div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);

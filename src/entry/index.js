import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import Thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import { LocaleProvider } from 'antd';
import ZhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import { composeWithDevTools } from 'redux-devtools-extension';

import Immutable from 'immutable';

import reducer from '../redux/reducer.js';
import './index.less';
import Index from '../pages/Index/Index';

const composeEnhancers = composeWithDevTools({});

const initState = Immutable.fromJS({});
const store = createStore(reducer, initState, composeEnhancers(applyMiddleware(Thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <LocaleProvider locale={ZhCN}>
                <Index/>
            </LocaleProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);


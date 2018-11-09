import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';
import { REQUEST_BEFORE, REQUEST_SUCCESS } from '../actions/index';

const initState = Immutable.fromJS({
    requestSuccess:false,
    data:[]
});

export default createReducer(initState, {
    [REQUEST_BEFORE]: state=>state.merge({
        requestSuccess: false
    }),
    [REQUEST_SUCCESS]: (state, action)=>state.merge({
        requestSuccess: true,
        data: action.data
    })
});
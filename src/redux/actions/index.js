export const REQUEST_BEFORE = 'REQUEST_BEFORE';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';

export function requestBefore() {
    return (dispatch)=>{
        dispatch({
            type:REQUEST_BEFORE,
        });
    };
}

export function requestSuccess() {
    return (dispatch)=>{
        dispatch({
            type:REQUEST_SUCCESS,
            data:'yes'
        });
    };
}
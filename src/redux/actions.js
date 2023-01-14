export const ADD_TODO = text => {
    return {
        type: 'ADD',
        payload: text
    }
};

export const RM_TODO = itemId => {
    return {
        type: 'REMOVE',
        payload: itemId
    }
};

export const SET_TODO = (lists) => {
    return {
        type: 'SET',
        payload: lists
    }
};

export const SYNC_GETLIST = () => (dispatch, getState) => {
    const list = getState();
    if (list.length) {
        return;
    }
    return fetch('http://localhost:3000/mockData/to_do_list.json')
        .then(res => res.json())
        .then(json => {
            dispatch(SET_TODO(json))
        })
};

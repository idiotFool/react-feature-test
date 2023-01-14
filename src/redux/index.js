import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ADD_TODO, RM_TODO, SYNC_GETLIST } from './actions';
import { connect } from 'react-redux';
import './index.css';

function ReactReduxDemo(props) {
    const { todo, dispatch } = props;
    const inputRef = useRef(null);
    const handleAdd = useCallback(() => {
        const val = inputRef.current.value;
        dispatch(ADD_TODO(val));
    }, []);
    const handleMinus = useCallback(() => {
        const val = inputRef.current.value;
        dispatch(RM_TODO(val));
    }, []);

    useEffect(() => {
        console.log('times');
        dispatch(SYNC_GETLIST())
    });

    return (
        <div>
            <input ref={ inputRef } type="text"/>
            <button onClick={ handleAdd }>add</button>
            <button onClick={ handleMinus }>minus</button>
            <ul>
                {
                    todo && todo.map(item => {
                        return <li key={item.id}>name: {item.text}, id: {item.id}</li>
                    })
                }
            </ul>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        todo: state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReactReduxDemo)

// 单独使用redux
// export default function ReduxExample(props) {
//     console.log(11);
//     const { getState, dispatch, subscribe } = props.store;
//     const [todo, setTodo] = useState(getState());
//     const inputRef = useRef(null);
//     const handleAdd = useCallback(() => {
//         const val = inputRef.current.value;
//         dispatch(ADD_TODO(val));
//     }, []);
//     const handleMinus = useCallback(() => {
//         const id = inputRef.current.value;
//         dispatch(RM_TODO(id));
//     }, []);
//
//     useEffect(() => {
//         dispatch(SYNC_GETLIST());
//     });
//
//     subscribe(() => {
//         console.log('state', getState());
//         setTodo(getState())
//     });
//
//     return (
//         <div>
//             <input ref={inputRef} type="text"/>
//             <button onClick={handleAdd}>add</button>
//             <button onClick={handleMinus}>minus</button>
//             <ul>
//                 {
//                     todo && todo.map(item => {
//                         return <li key={item.id}>name: {item.text}, id: {item.id}</li>
//                     })
//                 }
//             </ul>
//         </div>
//     )
// }



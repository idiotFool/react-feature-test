import {useCallback, useEffect, useReducer, useRef} from 'react';

const fixRatio = (ratio) => {
    return Math.max(0, Math.min(1, ratio));
};
const reducer = (state, action) => {
    const { horizon } = state;
    switch (action.type) {
        case 'setRatio':
            return {
                ...state,
                ratio: fixRatio(action.ratio),
                sliding: false
            };
        case 'start':
            return {
                ...state,
                lastPos: horizon ? action.x : -action.y,
                slideRange: horizon ? action.slideWidth : action.slideHeight,
                sliding: true
            };
        case 'move':
            // 如果没有处于滑动状态，不执行鼠标滑动的计算操作
            if (!state.sliding) {
                return state;
            }
            const pos = horizon ? action.x : -action.y;
            const delta = pos - state.lastPos;
            return {
                ...state,
                lastPos: pos,
                ratio: fixRatio(state.ratio + delta / state.slideRange),
                sliding: true
            };
        case 'end':
            // 点击某处先触发action - to；然后松开鼠标触发action - end
            // 为了保证不重新计算ratio，需要在sliding为false时，不再重新计算
            if (!state.sliding) {
                return state;
            }
            const posEnd = horizon ? action.x : -action.y;
            const deltaEnd = posEnd - state.lastPos;
            return {
                ...state,
                lastPos: posEnd,
                ratio: fixRatio(state.ratio + deltaEnd / state.slideRange),
                sliding: false
            };
        case 'to':
            return {
                ...state,
                ratio: horizon ? action.x / action.slideWidth :
                    (action.clientHeight - action.y) / action.slideHeight,
                sliding: false
            };
        default:
            return state;
    }
};

const useSlider =(props) => {
    const { horizon, initRatio = 0 } = props;
    const [state, dispatch] = useReducer(reducer, {
        horizon,
        ratio: initRatio
    });

    const hotAreaRef = useRef(null);
    const thumbRef = useRef(null);

    const handleHotAreaMouseDown = useCallback(evt => {
        const hotArea = hotAreaRef.current;
        dispatch({
            type: 'to',
            x: evt.nativeEvent.offsetX,
            y: evt.nativeEvent.offsetY,
            slideWidth: hotArea.clientWidth,
            slideHeight: hotArea.clientHeight,
        })
    }, []);
    const handleThumbMouseDown = useCallback(evt => {
        const hotArea = hotAreaRef.current;
        dispatch({
            type: 'start',
            x: evt.pageX,
            y: evt.pageY,
            slideWidth: hotArea.clientWidth,
            slideHeight: hotArea.clientHeight
        })
    }, []);
    const setRatio = useCallback(ratio => {
        dispatch({
            type: 'setRatio',
            ratio
        })
    }, []);

    useEffect(() => {
        const onSliding = evt => {
            dispatch({
                type: 'move',
                x: evt.pageX,
                y: evt.pageY
            })
        };
        const onSlidingEnd = evt => {
            dispatch({
                type: 'end',
                x: evt.pageX,
                y: evt.pageY
            })
        };
        document.addEventListener('mousemove', onSliding);
        document.addEventListener('mouseup', onSlidingEnd);

        return () => {
            document.removeEventListener('mousemove', onSliding);
            document.removeEventListener('mouseup', onSlidingEnd);
        }
    }, []);

    return [
        {
            ref: hotAreaRef,
            onMouseDown: handleHotAreaMouseDown
        },{
            ref: thumbRef,
            onMouseDown: handleThumbMouseDown
        }, {
            ratio: state.ratio,
            setRatio
        }
    ]
};

export default useSlider;
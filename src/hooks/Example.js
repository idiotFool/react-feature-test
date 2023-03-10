import React from 'react';
import useSlider from './useSlider';

function Example() {
    const [ hotAreaProps, thumbProps, slideState ] = useSlider({
        horizon: true,
        initRatio: 0.5
    });
    const { ratio, setRatio } = slideState;
    return (
        <div>
            <button onClick={() => setRatio(0)}>0</button>
            <button onClick={() => setRatio(0.5)}>0.5</button>
            <button onClick={() => setRatio(1)}>1</button>
            <div className="val">{ratio}</div>
            <div className="slider">
                <div className="track" {...hotAreaProps} />
                <div className="has" style={{ width: `${ratio * 100}%` }}>
                    <div className="ctrl" {...thumbProps} />
                </div>
            </div>
        </div>
    );
}

export default Example;
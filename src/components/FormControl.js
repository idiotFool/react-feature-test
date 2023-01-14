import React, { useState } from 'react'
import useInput from '../hooks/useInput';

export function FormControl() {
    const [textVal, setTextVal] = useState("")
    const [color, setColor] = useState("#000000")
    const submit = e => {
        e.preventDefault()
        alert(`textval: ${textVal} | color: ${color}`)
        setTextVal("")
        setColor("#000000")
    }

    return (
        <form onSubmit={submit}>
            <input type="text" value={textVal} onChange={e => setTextVal(e.target.value)} />
            <input type="color" value={color} onChange={e=> setColor(e.target.value)} />
            <button>change</button>
        </form>
    );
}

// 使用hooks 重写
export function FormControlByHook() {
    const [textProps, resetText] = useInput("")
    const [colorProps, resetColor] = useInput("#000000")
    const submit = e => {
        e.preventDefault()
        alert(`textval: ${textProps.value} | color: ${colorProps.value}`)
        resetText()
        resetColor()
    }

    return (
        <form onSubmit={submit}>
            <input type="text" {...textProps} />
            <input type="color" {...colorProps} />
            <button>change</button>
        </form>
    );
};
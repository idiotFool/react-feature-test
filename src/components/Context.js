import React, { useContext } from "react";
import { TreeContext, useTrees } from "../App";


export function Context() {
    const { trees } = useContext(TreeContext)
    return (
        <>
            <h2>trees</h2>
            <ul>
                {
                    trees.map(item => <li key={item.id}>{item.type}</li>)
                }
            </ul>
        </>
    )
}

export function ContextByHook() {
    const { trees } = useTrees()
    return (
        <>
            <h2>trees</h2>
            <ul>
                {
                    trees.map(item => <li key={item.id}>{item.type}</li>)
                }
            </ul>
        </>
    )
}


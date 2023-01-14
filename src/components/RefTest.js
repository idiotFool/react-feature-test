import React, { Component, createRef } from 'react'
export default class Reftest extends Component {
    constructor(){
        super();
        this.changeHandler = this.changeHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.testRef = createRef()
    }
    changeHandler(e) {
        this.testRef = e.target.value
    }
    clickHandler(){
        console.log(this.testRef)
        this.testRef.current.value = 'clicked'
    }
    render() {
        return (
            <div>
                <textarea ref={this.testRef}>
               
               </textarea>
               <button onClick={this.clickHandler}>
                惦记我
               </button>
            </div>
           
        );
    }
}
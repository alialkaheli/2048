import React from "react";
import './functionality.css'

class Functionality extends React.Component{
    constructor(){
        super()
    }

    render(){
        return(
        <div className="whole-board">

            <div className="updown-board">
                <button className="updown-button">UP</button>
            </div>

            <div className="mid-board">
                <button className="leftright-button"> LEFT </button>
                <div>{this.props.board}</div>
                <button className="leftright-button"> RIGHT </button>
            </div>

            <div className="updown-board">
                <button className="updown-button">DOWN</button>
            </div>
        </div>
        )
    }
}

export default Functionality
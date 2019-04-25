import React from "react";
import './functionality.css'

class Functionality extends React.Component{
    constructor(){
        super()
        this.left = this.left.bind(this)
    }

    left(){
        for(let i = 0; i < 4; i++){
            let k = 0
            for(let j = 1; j < 4; j++){
                if (
                  this.props.board[i][k] ===
                    this.props.board[i][j] &&
                    this.props.board[i][j] > 0
                ) {
                    this.props.board[i][k] *= 2;
                    this.props.board[i][j] = 0;
                } else if (this.props.board[i][k] > 0) {
                         k += 1;
                } else {
                    if (this.props.board[i][j] > 0) {
                        this.props.board[i][
                          k
                        ] = this.props.board[i][j];
                        this.props.board[i][j] = 0;
                           k += 1;
                    }
                }
            }
        }
        
    }
    win(){
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(this.props.board === 2048){
                    return true
                }
            }
        }
        return false
    }
    render(){
        return(
        
        <div className="whole-board">

            <div className="updown-board">
                <button className="updown-button">UP</button>
            </div>

            <div className="mid-board">
                <button onClick={() => this.left()} className="leftright-button"> LEFT </button>
                <div>{this.props.board}</div>
                    <button className="leftright-button"> RIGHT </button>
            </div>

            <div className="updown-board">
                <button className="updown-button">DOWN</button>
            </div>
        </div>)
        
        
    }
}

export default Functionality
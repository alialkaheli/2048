import React from 'react';
import './App.css';
import BlockItem from './blockitem'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      board: [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ]
    }
  }

  render(){
    let board = this.state.board.map(i =>{
       let row = i.map((item, j) => {return <BlockItem key={j} num={item}></BlockItem>})
      return <div className="board-row">{row}</div>
    })
    return (
      <div className="App">
        <h1>2048</h1>
        {board}
      </div>
    );
  }
}

export default App;

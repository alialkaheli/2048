import React from 'react';
import './App.css';
import BlockItem from './blockitem';
import Functionality from './functionality';

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
    this.addNumber = this.addNumber.bind(this)
  }

  addNumber(){
    let options = []
    for(let i = 0; i<4;i++){
      for(let j = 0; j<4; j++){
        if(this.state.board[i][j] === 0){
          options.push([i,j])
        }
      }
    }
    let idx = options[Math.floor(Math.random() * options.length)]
    let board = [...this.state.board]
    let item = board[idx[0]][idx[1]]
    item = 2
    board[idx[0]][idx[1]] = item
    this.setState({board})
  }

  componentDidMount(){
    this.addNumber()
    this.addNumber()
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

        <Functionality addNumber={this.addNumber} />
      </div>
    );
  }
}

export default App;

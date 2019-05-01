import React from 'react';
import './App.css';
import Functionality from './functionality';
import { HotKeys } from 'react-hotkeys'; //library to handle hotkeys

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // the game will keep tract of the board and the score
      gridData: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      score: 0
    };

    //blankGrid for reset
    this.blankGrid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    //binding this to all four directions
    this.leftOp = this.leftOp.bind(this);
    this.rightOp = this.rightOp.bind(this);
    this.upOp = this.upOp.bind(this);
    this.downOp = this.downOp.bind(this);

    this.map = {
      //first argument for hotkeys
      moveLeft: "left",
      moveRight: "right",
      moveUp: "up",
      moveDown: "down"
    };

    this.handlers = {
      //the second arg for hotkeys
      //handler has a (key: function)
      moveLeft: this.leftOp,
      moveRight: this.rightOp,
      moveUp: this.upOp,
      moveDown: this.downOp
    };
  }

  //initializer of the game
  componentDidMount() {
    this.initGame();
  }

  initGame() {
    // grid is an array of row and col 
    let grid = this.blankGrid.map(row => row.slice());
    //initialize with 2 or 4 in two random spots
    grid = this.addNumber(grid);
    grid = this.addNumber(grid);
    //sets the state to grid
    this.setState({
      gridData: grid,
      score: 0
    });
    //this.forceUpdate();
  }

  //function that adds 2 or 4 to a random spot
  addNumber(grid) {
    const availableSpot = [];
    //adds all available spots in an array
    grid.forEach((rowData, x) =>
      rowData.forEach((data, y) => {
        if (!data) availableSpot.push([x,y]);
      })
    );
    //chooses a random spot
    const randomSpot =
      availableSpot[Math.floor(Math.random() * availableSpot.length)];
      //gives that random spot a 2 or 4
    grid[randomSpot[0]][randomSpot[1]] = Math.random() < 0.5 ? 4 : 2;
    return grid;
  }
////////////// functionality of the game
  slide(row) {
    //create an array of numbers, no zeros
    const newRow = row.filter(data => data);
    //an array of the remaining are zeros
    const zerosArr = Array(4 - newRow.length).fill(0);
    //combine the two
    return [...zerosArr, ...newRow];
  }

  combine(row) {
    let a, b;
    let score = this.state.score;
    for (let i = 3; i > 0; i--) {
      a = row[i];
      b = row[i - 1];
      if (a === b) {
        score += 2 * a;
        row[i] = a + b;
        row[i - 1] = 0;
      }
    }
    this.setState({ score });
    return row;
  }

  slideAndCombine(row) {
    //sliding numbers to the right
    row = this.slide(row);
    //combine similar numbers and adding score
    row = this.combine(row);
    return row;
  }

  diffGrid(grid) {
    let isDiff = false;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] !== this.state.gridData[i][j]) {
          isDiff = true;
        }
      }
    }
    if (isDiff) {
      grid = this.addNumber(grid);
      this.setState({
        gridData: grid
      });
    }
  }

  flipGrid(grid) {
    return grid.map(row => row.reverse());
  }

  transpose(grid) {
    const newGrid = this.blankGrid.map(row => row.slice());
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        newGrid[i][j] = grid[j][i];
      }
    }
    return newGrid;
  }


  ////all directions
  rightOp() {
    //copy the state grid to copyGrid
    let copyGrid = this.state.gridData.map(row => row.slice());
    //Mapping each row and move numbers to the right
    copyGrid = copyGrid.map(row => this.slideAndCombine(row));
    //checks if numbers moved, if so then adds a new number randomly
    this.diffGrid(copyGrid);
  }
  leftOp() {
    //same as rightOp but flipGrid function reverses the coprGrid
    let copyGrid = this.state.gridData.map(row => row.slice());
    copyGrid = this.flipGrid(copyGrid).map(row => this.slideAndCombine(row));
    copyGrid = this.flipGrid(copyGrid);
    this.diffGrid(copyGrid);
  }
  upOp() {
    //same as leftOp but transpose it first
    let copyGrid = this.state.gridData.map(row => row.slice());
    copyGrid = this.transpose(copyGrid);
    copyGrid = this.flipGrid(copyGrid);
    copyGrid = copyGrid.map(row => this.slideAndCombine(row));
    copyGrid = this.flipGrid(copyGrid);
    copyGrid = this.transpose(copyGrid);
    this.diffGrid(copyGrid);
  }
  downOp() {
    //same as rightOp but ranspose it first
    let copyGrid = this.state.gridData.map(row => row.slice());
    copyGrid = this.transpose(copyGrid);
    copyGrid = copyGrid.map(row => this.slideAndCombine(row));
    copyGrid = this.transpose(copyGrid);
    this.diffGrid(copyGrid);
  }

  ///When board is filled then game over
  gameOver() {
    let over = true;
    this.state.gridData.forEach(row => {
      row.forEach(data => {
        if (data === 0) over = false;
      });
    });
    return over;
  }

  render() {
    let renderOverlay = "";
    //checks for game over
    if (this.gameOver()) {
      renderOverlay = (
        <div className="overlay">
          <div className="overlay-msg">
            <h4>Game Over</h4>
            <button onClick={() => this.initGame()}>Restart</button>
          </div>
        </div>
      );
    }
    return (
      <HotKeys keyMap={this.map} handlers={this.handlers}>
        <div className="container">
          <div className="centerGrid">
            <header className="header">
              <h4 className="title">2048 in React</h4>
              <div className="score">
                <span className="score-text">Score: </span>
                {this.state.score}
              </div>
            </header>
            <main id="game">
              <Functionality gridData={this.state.gridData} />
            </main>
            {renderOverlay}
          </div>
        </div>
      </HotKeys>
    );
  }
}

export default App
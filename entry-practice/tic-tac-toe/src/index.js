import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    let className = 'square';
    if(props.winner){
        let {lines} = props.winner;
        className = lines.indexOf(props.index) > -1 ? 'square winner' : 'square'
    }
    return (
        <button className={className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderRow (){
        let row = [0,1,2].map( (item)=>{
            return (
                <div className="board-row" key={item}>
                    {this.renderCol(item)}
                </div>
            )
        } )
        return row;
    }
    renderCol (rowIndex){
        let col = [0,1,2].map( (item)=>{
            let index = rowIndex*3 + item
            return (
                <Square
                    winner={this.props.winner}
                    key={index}
                    index={index}
                    value={this.props.squares[index]}
                    nextPlayer={this.props.nextPlayer}
                    onClick = {
                        () => this.props.onClick(index)
                    }
                />
            )
        } )
        return col;
    }
    render() {

       
        return (
            <div>
                {this.renderRow()}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor (props){
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(),
                selected: null
            }],
            xIsNext: true,
            stepNumber: 0,
            ascending: true
        }
    }
    jumpTo (step){
    
        this.setState({
            stepNumber: step,
            xIsNext: ( step % 2 ) === 0
        })
    }

    handleClick(i) {
        const history = this.state.history.slice( 0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (squares[i] || calculateWinner(squares) ) {
            return
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            history: history.concat([{
                squares,
                selected: i
            }])
        })

    }

    sortHistory (){
        this.setState({
            ascending: !this.state.ascending
        })
    }
    
    renderHistory(history, stepNumber){
        const isAscending = this.state.ascending;
        let move;
        if(isAscending){
            move = history.map((step, move) => {

                const selected = step.selected + 1;
                let selectedRow = Math.ceil(selected / 3);
                let selectedCol = selected % 3;
                selectedCol = selectedCol === 0 ? 3 : selectedCol;

                const desc = move === 0
                    ? `go to start`
                    : `selected(${selectedRow},${selectedCol})`;
                return (
                    <li key={move} className={move === stepNumber ? 'current-step' : ''}>
                        {move + 1}<button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                )
            })
        }else{
            let len = history.length;
            move = history.reverse().map((step, move) => {

                const selected = step.selected + 1;
                let selectedRow = Math.ceil(selected / 3);
                let selectedCol = selected % 3;
                selectedCol = selectedCol === 0 ? 3 : selectedCol;

                let currentMove = len - move - 1;
                const desc = currentMove === 0
                    ? `go to start`
                    : `selected(${selectedRow},${selectedCol})`;
                return (
                    <li key={'descending'+move} className={currentMove === stepNumber ? 'current-step' : ''}>
                        {currentMove + 1}<button onClick={() => this.jumpTo(currentMove)}>{desc}</button>
                    </li>
                )
            })
        }
        

        return move
    }

    render() {
        const history = this.state.history.slice();
        const stepNumber = this.state.stepNumber
        const current = history[stepNumber];
        const winner = calculateWinner(current.squares);

        let status;

        if (winner) {
            status = `winner: ${winner.winner}`;

        } else if (stepNumber === 9){
            status = 'game draw'
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                    winner={winner}
                    />
                </div>
                <div className="game-info">
                    <div>
                        <button onClick={() => this.sortHistory()}>{this.state.ascending ? '降序' : '升序'}</button>
                    </div>
                    <div>{ status }</div>
                    <ul>{this.renderHistory(history, stepNumber) }</ul>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { 
                winner: squares[a],
                lines: lines[i]
            };
        }
    }
    return null;
}
import React from "react";
import {randomCharacterGenerator} from "../utils/randomCharaterGenerator"

// function based component for each box with class name box
function Box(props) {
    return (
        <button className="box"
                onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

// class based component for whole 4X4 board which controls box component
class Board extends React.Component {
    constructor(props) {
        super(props);
        // maintain state of board component
        this.state = {
            // boxValues: Array(16).fill(null),
            boxValues: randomCharacterGenerator(16),
            isFirstSelection: true,
            selectedWord: '',
            lastSelectionIndex: null,
        };
    }

    handleClick(i) {
        let tempBoxValues = this.state.boxValues.slice()
        let tempIsFirstSelection
        let tempLastSelectionIndex
        let tempSelectedWord = this.state.selectedWord
        if (this.state.isFirstSelection) {
            console.log('It is first selection')
            tempIsFirstSelection = false
            tempSelectedWord += this.state.boxValues[i]
            tempLastSelectionIndex = i
        } else {
            // check if selection is valid
            if (isSelectionValid(this.state.lastSelectionIndex, i)){
                console.log('selection is valid')
                tempSelectedWord += this.state.boxValues[i]
                tempLastSelectionIndex = i
            }
            else {
                console.log('selection is not valid')
            }
        }
        console.log('------before-----')
        console.log('selected word is:')
        console.log(this.state.selectedWord)
        console.log('-----------------')
        this.setState({
            boxValues: tempBoxValues,
            isFirstSelection: tempIsFirstSelection,
            selectedWord: tempSelectedWord,
            lastSelectionIndex: tempLastSelectionIndex,
        });
        console.log('------after-----')
        console.log('selected word is:')
        console.log(this.state.selectedWord)
        console.log('-----------------')
    }

    renderBox(i) {
        return (
            <Box
                value={this.state.boxValues[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        let status = null;

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderBox(0)}
                    {this.renderBox(1)}
                    {this.renderBox(2)}
                    {this.renderBox(3)}
                </div>
                <div className="board-row">
                    {this.renderBox(4)}
                    {this.renderBox(5)}
                    {this.renderBox(6)}
                    {this.renderBox(7)}
                </div>
                <div className="board-row">
                    {this.renderBox(8)}
                    {this.renderBox(9)}
                    {this.renderBox(10)}
                    {this.renderBox(11)}
                </div>
                <div className="board-row">
                    {this.renderBox(12)}
                    {this.renderBox(13)}
                    {this.renderBox(14)}
                    {this.renderBox(15)}
                </div>
                <div className="reset">
                    <p>Click this botton to reset game</p>
                    <button
                        onClick={() => {
                            this.setState({
                                // boxValues: Array(16).fill(null),
                                boxValues: randomCharacterGenerator(16),
                                isFirstSelection: true,
                                selectedWord: '',
                                lastSelectionIndex: null,
                            });
                        }}
                    >
                        RESET
                    </button>
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game" style={{height: 10, display: 'flex', justifyContent: 'center'}}>
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

export default Game

// function to determine if selection is valid
function isSelectionValid(lastSelectionIndex, currentSelection) {
    /*[
        0  1  2  3
        4  5  6  7
        8  9  10 11
        12 13 14 15
    ]*/
    if (Math.abs(lastSelectionIndex-currentSelection) in [1,4,3,5]) {
        return true
    }
    return false
}
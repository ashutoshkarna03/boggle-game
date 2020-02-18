import React from "react";
import {randomCharacterGenerator} from "../utils/randomCharaterGenerator"
import isWordValid from "../models/score.model"

// function based component for each box with class name box
function Box(props) {
    return (
        <button className="box"
                onClick={props.onClick}
                style={ {backgroundColor: props.color} }
        >
            {props.value}
        </button>
    );
}

function Info(props) {
    return (
        <p className="info">
            {props.message}
        </p>
    )
}

// class based component for whole 4X4 board which controls box component
class Board extends React.Component {
    constructor(props) {
        super(props);
        // maintain state of board component
        this.state = {
            boxValues: randomCharacterGenerator(16),
            color: Array(16).fill('white'),
            isFirstSelection: true,
            selectedWord: '',
            isIndexSelected: Array(16).fill(false),
            lastSelectionIndex: null,
            userInfo: null,
        };
    }

    handleBoxClick(i) {
        console.log('------------------------')
        console.log('selected index: '+i)
        console.log('selected index array value: '+this.state.isIndexSelected[i])
        // change the color of clicked box to red and text to white
        let tempBoxColor = this.state.color.slice()
        let tempBoxValues = this.state.boxValues.slice()
        let tempIsFirstSelection = this.state.isFirstSelection
        let tempLastSelectionIndex = this.state.lastSelectionIndex
        let tempSelectedWord = this.state.selectedWord
        let tempIsIndexSelected = this.state.isIndexSelected.slice()
        console.log('index selection value: '+tempIsIndexSelected[i])
        if (tempIsFirstSelection) {
            console.log('It is first selection')
            tempBoxColor[i] = 'red'
            tempIsFirstSelection = false
            tempSelectedWord += tempBoxValues[i]
            tempLastSelectionIndex = i
            tempIsIndexSelected[i] = true
        } else {
            // check if selection is valid
            // first check if this box has been already selected or not, if it's already selected, then selection is invalid
            if (!tempIsIndexSelected[i]) {
                // now check if selection is neighbour of previous selection using function isSelectionValid
                if (isSelectionValid(tempLastSelectionIndex, i)) {
                    console.log('selection is valid')
                    tempBoxColor[i] = 'red'
                    tempSelectedWord += tempBoxValues[i]
                    tempLastSelectionIndex = i
                    tempIsIndexSelected[i] = true
                }
                else {
                    console.log('selection is not valid since this box is not neighbouring to previous selection')
                }
            }
            else {
                console.log('selection is not valid since this box has already been selected')
            }
        }
        // set the new state according to previous calculations
        this.setState({
            boxValues: tempBoxValues,
            color: tempBoxColor,
            isFirstSelection: tempIsFirstSelection,
            selectedWord: tempSelectedWord,
            isIndexSelected: tempIsIndexSelected,
            lastSelectionIndex: tempLastSelectionIndex,
        });
        // console.log(this.state)
        console.log('-------------------------')

    }

    renderBox(i) {
        return (
            <Box
                value={this.state.boxValues[i]}
                onClick={() => this.handleBoxClick(i)}
                color={this.state.color[i]}
            />
        );
    }

    // function to reset board, to be more specific reset the state value of board component
    resetBoard(changeBoxValue=false, infoMessage=null){
        let newStateVal = {
            color: Array(16).fill('white'),
            isFirstSelection: true,
            selectedWord: '',
            isIndexSelected: Array(16).fill(false),
            lastSelectionIndex: null,
            userInfo: infoMessage,
        }
        if (!changeBoxValue) {
            this.setState(newStateVal);
        }
        else {
            newStateVal.boxValues = randomCharacterGenerator(16)
            this.setState(newStateVal);
        }
    }

    infoToUser(msg) {
        return (
            <Info
                message = {msg}
            />
        )
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
                <div className="entered-word">
                    <p>Selected Word:  {this.state.selectedWord}</p>
                </div>
                <div className="submit-button">
                    <button onClick={ async () => {
                        let isSelectedWordValid = await isWordValid(this.state.selectedWord)
                        if (isSelectedWordValid) {
                            this.resetBoard(false, 'Word is valid')
                        }
                        else {
                            this.resetBoard(false, 'Word is invalid')
                        }
                        this.resetBoard()
                    }}>SUBMIT</button>
                    <Info message={this.state.selectedWord} />
                </div>
                <div className="reset">
                    <p>Click this botton to reset game: </p>
                    <button onClick={()=>{this.resetBoard(true)}}
                    >RESET</button>
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
    ]
    */
    // first filter out terminal matching element. i.e. [0,4,8,12] and [3,7,11,15]
    let firstTerminalArray = [0,4,8,12]
    let secondTerminalArray = [3,7,11,15]
    if ((firstTerminalArray.includes(lastSelectionIndex) && secondTerminalArray.includes(currentSelection)) || (firstTerminalArray.includes(currentSelection) && secondTerminalArray.includes(lastSelectionIndex))){
        return false
    }
    // now proceed for further checking
    let matchArray = [1,4,3,5]
    let compareValue = Math.abs(lastSelectionIndex-currentSelection)
    return matchArray.includes(compareValue)
}
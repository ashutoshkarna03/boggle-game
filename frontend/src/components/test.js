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

console.log(isSelectionValid(3,4))
function isSelectionValid(lastSelectionIndex, currentSelection) {
    /*[
        0  1  2  3
        4  5  6  7
        8  9  10 11
        12 13 14 15
    ]*/
    let matchArray = [1,4,3,5];
    let compareValue = Math.abs(lastSelectionIndex-currentSelection)
    console.log(compareValue)
    return matchArray.includes(compareValue)
}

console.log(isSelectionValid(9,14))
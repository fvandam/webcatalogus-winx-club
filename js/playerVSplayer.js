const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
] //makes the winning combinations

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('#board');
const winningMessageElement = document.querySelector('#winningMessage');
const winningMessage = document.querySelector('.winning-message');
const restartButton = document.querySelector('#restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');

let circleTurn;

startGame();

restartButton.addEventListener('click', startGame); //if clicked on the restart button the games start again

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true })
}) //if clicked on cellElement is calls the function handleclick

function startGame() { //makes everything empty to start over
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS) //removes all X marks
        cell.classList.remove(CIRCLE_CLASS) //removes all O marks
        cell.removeEventListener('click', handleClick) 
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessage.classList.remove('show') //it removes the show class, meaning it removes the pop up screen
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS //checks if cirle turn is true or false
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) { 
        endGame(false)  //you won
    } else if (isDraw()) {
        endGame(true) //you lost
    } else {
        swapTurns() //swaps turns
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) { 
        winningMessageElement.innerText = 'Draw!'; //if its a draw it adds the text draw
    } else {
        winningMessageElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`; 
        //if anyone wins it adds the text who won
    }
    winningMessage.classList.add('show'); //adds the class show that creates the pop up screen for winning the game
}

function isDraw() {
    return [...cellElements].every(cell => { 
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    }) //checks if every cell has a class in it, if there is no win it creates a draw
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}  //adds class to cell, this places the mark in the cell

function swapTurns() {
    circleTurn = !circleTurn
} //this swaps the turn between player

function setBoardHoverClass() {
    board.classList.remove(X_CLASS) //removes class from board
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)//adds class list circle, this places the circle mark when is circle turn
    } else {
    board.classList.add(X_CLASS)//adds class list X, this places the X mark when is X turn
    }
}

function checkWin(currentClass) { 
    return WINNING_COMBINATIONS.some(combinations => { //loops over all the winning combinations
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass) 
            //if the current class is in al 3 of a winning combination then there is a win
        })
    })
}


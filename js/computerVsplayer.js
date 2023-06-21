const gridElement = document.querySelector('#grid');
const messageElement = document.querySelector('.message');
const chooseElement = document.querySelector('form');
let mark;
let cells;

// add click listener to radio buttons
function setPlayer() {
    mark = this.value;
    messageElement.textContent = mark + ', click on a square to make your move!'; //add's text to our messageElement
    chooseElement.classList.add('game-on'); //add's the class game-on
    this.checked = false;
    buildGrid(); //calls function
  }

  // add click listener to each cell
function playerMove() {
    if (this.textContent == '') {
      this.textContent = mark; 
      checkRow();
      switchMark();
      computerMove();
    }
  }

  // let the computer make the next move
function computerMove() {
    let emptyCells = []; //creates empty cells with a empty array
    let random;
  
  
    cells.forEach(function (cell) {
      if (cell.textContent == '') { //if a cell element is empty it pushes the emptycell forward
        emptyCells.push(cell);
      }
    });

      // computer marks a random EMPTY cell
  random = Math.ceil(Math.random() * emptyCells.length) - 1;
  emptyCells[random].textContent = mark; //computer places a random mark because of math.random
  checkRow(); //it checks if anyone has won
  switchMark(); //switches between computer and player
}

// switch player mark
function switchMark() {
    if (mark == 'X') {
      mark = 'O';
    } else {
      mark = 'X';
    } //switches between x and o 
    //so if mark = x it will make mark place o 
  }

  // determine a winner
function winner(a, b, c) {
    if (a.textContent == mark && b.textContent == mark && c.textContent == mark) {
      //checks with a b and c if you have three in a row (needs to be the same mark)
      messageElement.textContent = mark + ' is the winner!'; //shows who is the winner
      a.classList.add('winner');
      b.classList.add('winner');
      c.classList.add('winner');
      return true; //if there is a winner it will return to begin 
    } else {
      return false; //if not a winner it will not go back to begin
    }
  }

  // check cell combinations 
function checkRow() { //checks if there is a winning combination
    winner(document.querySelector('#c1'), document.querySelector('#c2'), document.querySelector('#c3'));
    winner(document.querySelector('#c4'), document.querySelector('#c5'), document.querySelector('#c6'));
    winner(document.querySelector('#c7'), document.querySelector('#c8'), document.querySelector('#c9'));
    winner(document.querySelector('#c1'), document.querySelector('#c4'), document.querySelector('#c7'));
    winner(document.querySelector('#c2'), document.querySelector('#c5'), document.querySelector('#c8'));
    winner(document.querySelector('#c3'), document.querySelector('#c6'), document.querySelector('#c9'));
    winner(document.querySelector('#c1'), document.querySelector('#c5'), document.querySelector('#c9'));
    winner(document.querySelector('#c3'), document.querySelector('#c5'), document.querySelector('#c7'));
  }

  // clear the grid
function resetGrid() {
    mark = 'X'; //gives mark the valuable of x
    cells.forEach(function (cell) {
      cell.textContent = ''; //makes the cells empty
      cell.classList.remove('winner');
    });
    messageElement.textContent = 'Choose your player:'; //makes everything go back to the begin
    chooseElement.classList.remove('game-on');
    gridElement.innerHTML = ''; //makes the grid element empty
  }

  // build the grid
function buildGrid() {
    for (let i = 1; i <= 9; i++) { //a loop that wont go further than 9 because you only need nine <li> elements
      let cell = document.createElement('li'); //creates the element <li>
      cell.id = 'c' + i; //add the id thats givin so in this case c + the total of number
      cell.addEventListener('click', playerMove, false);
      gridElement.appendChild(cell); //adds a node to the end of the list of children of a specified parent node
    }
    cells = Array.prototype.slice.call(gridElement.getElementsByTagName('li'));
    //prototype.slice.call return a shallow copy of an portion of an array
    //a shallow copy is a a copy from a object that share the same references
  }

  let players = Array.prototype.slice.call(document.querySelectorAll('input[name=player-choice]'));
players.forEach(function (choice) {
  choice.addEventListener('click', setPlayer, false);
});

let resetButton = chooseElement.querySelector('button');
resetButton.addEventListener('click', function (e) {
  e.preventDefault();
  resetGrid(); //reset button resets the grid and goes back to the front page
});
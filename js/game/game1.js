function canFitAllShips(ship2, ship3, ship4, ship5) {

    createBoard();

    if (placeShips(ship2, 2) == false) {
        return false;
    }

    if (placeShips(ship3, 3) == false) {
        return false;
    }

    if (placeShips(ship4, 4) == false) {
        return false;
    }

    if (placeShips(ship5, 5) == false) {
        return false;
    }

    return true;

}


// ---------- Elements ----------

const board = document.getElementById("board");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const message = document.getElementById("message");

const boom = document.getElementById("boom");
const boomSound = document.getElementById("boomSound");

const left2 = document.getElementById("left2");
const left3 = document.getElementById("left3");
const left4 = document.getElementById("left4");
const left5 = document.getElementById("left5");

// ---------- Variables ----------

let boardSize;

let gameBoard = [];
let ships = [];

let gameStarted = false;

let shipsLeft = {
    2: 0,
    3: 0,
    4: 0,
    5: 0
};

// ---------- Start ----------

board.classList.add("hidden");
resetBtn.style.display = "none";

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

const shipInputs = [

    document.getElementById("ship2"),
    document.getElementById("ship3"),
    document.getElementById("ship4"),
    document.getElementById("ship5")

];

let previousValues = {

    ship2:0,
    ship3:0,
    ship4:0,
    ship5:0

};


shipInputs.forEach(function(input){

    input.addEventListener("focus",function(){

        previousValues[input.id]=Number(input.value);

    });

});

shipInputs.forEach(function(input){

    input.addEventListener("input",checkShips);

});


function checkShips(){

    const sizeRadio =
    document.querySelector("input[name='boardSize']:checked");

    if(sizeRadio==null){
        return;
    }

    boardSize=Number(sizeRadio.value);

    let ship2=Number(document.getElementById("ship2").value);

    let ship3=Number(document.getElementById("ship3").value);

    let ship4=Number(document.getElementById("ship4").value);

    let ship5=Number(document.getElementById("ship5").value);

    if(
        canFitAllShips(ship2,ship3,ship4,ship5)
    ){

        previousValues.ship2=ship2;
        previousValues.ship3=ship3;
        previousValues.ship4=ship4;
        previousValues.ship5=ship5;

        message.textContent="";

    }

    else{

        this.value=previousValues[this.id];

        message.textContent=
        "Too many ships for this board.";

    }

}


// ---------- Start Game ----------

function startGame() {

    message.textContent = "";

    const sizeRadio = document.querySelector("input[name='boardSize']:checked");

    if (sizeRadio == null) {
        message.textContent = "Please choose a board size.";
        return;
    }

    boardSize = Number(sizeRadio.value);

    let ship2 = Number(document.getElementById("ship2").value);
    let ship3 = Number(document.getElementById("ship3").value);
    let ship4 = Number(document.getElementById("ship4").value);
    let ship5 = Number(document.getElementById("ship5").value);
    
    if (ship2 < 0 || ship3 < 0 || ship4 < 0 || ship5 < 0 || !Number.isInteger(ship2) ||
        !Number.isInteger(ship3) || !Number.isInteger(ship4) || !Number.isInteger(ship5))
    {
        message.textContent = "Please enter whole numbers greater than or equal to 0.";
        return;
    }

    if (ship2 + ship3 + ship4 + ship5 == 0) {
        message.textContent = "Choose at least 1 battleship.";
        return;
    }

    


    if (!canFitAllShips(ship2, ship3, ship4, ship5)) {

    message.textContent =
    "This combination of ships cannot fit on this board.";

    return;
}






    shipsLeft[2] = ship2;
    shipsLeft[3] = ship3;
    shipsLeft[4] = ship4;
    shipsLeft[5] = ship5;

    updateTable();

    createBoard();

    if (placeShips(ship2, 2) == false) {
    return;
    }

    if (placeShips(ship3, 3) == false) {
    return;
    }

    if (placeShips(ship4, 4) == false) {
    return;
    }

    if (placeShips(ship5, 5) == false) {
    return;
    }

    board.classList.remove("hidden");

    startBtn.style.display = "none";
    resetBtn.style.display = "block";

    gameStarted = true;
}

// ---------- Create Board ----------

function createBoard() {

    board.innerHTML = "";

    board.style.gridTemplateColumns = "repeat(" + boardSize + ", 42px)";

    gameBoard = [];
    ships = [];

    for (let i = 0; i < boardSize; i++) {

        gameBoard[i] = [];

        for (let j = 0; j < boardSize; j++) {

            gameBoard[i][j] = {
                ship: -1,
                hit: false
            };

            let cell = document.createElement("div");

            cell.classList.add("cell");

            cell.dataset.row = i;
            cell.dataset.col = j;

            cell.addEventListener("click", cellClick);

            board.appendChild(cell);

        }

    }

}

// ---------- Cell Click ----------

function cellClick() {

    if (!gameStarted) {
        return;
    }

    let row = Number(this.dataset.row);
    let col = Number(this.dataset.col);

    if (gameBoard[row][col].hit == true) {
        return;
    }

    gameBoard[row][col].hit = true;

    let shipNumber = gameBoard[row][col].ship;

    if (shipNumber == -1) {

        this.classList.add("miss");
        return;

    }

    this.classList.add("hit");

    ships[shipNumber].hits++;

    if (ships[shipNumber].hits == ships[shipNumber].size) {

        shipDestroyed(shipNumber);

    }

    checkWin();

}


// ---------- Place Ships ----------

function placeShips(amount, size) {

    for (let i = 0; i < amount; i++) {

        let placed = false;
        let tries = 0;

        const max_tries = 1000;

        while (placed == false && tries < max_tries) {

            tries++;

            let direction;

            if (Math.random() < 0.5) {
                direction = "horizontal";
            }
            else {
                direction = "vertical";
            }

            let row = Math.floor(Math.random() * boardSize);
            let col = Math.floor(Math.random() * boardSize);

            if (canPlaceShip(row, col, size, direction) == true) {

                addShip(row, col, size, direction);
                placed = true;

            }

        }

        if (placed == false) {

            return false;
        }

    }

    return true;

}

// ---------- Check If Ship Can Be Placed ----------

function canPlaceShip(row, col, size, direction) {

    if (direction == "horizontal") {

        if (col + size > boardSize) {
            return false;
        }

        for (let i = 0; i < size; i++) {

            let currentCol = col + i;

            for (let r = row - 1; r <= row + 1; r++) {

                for (let c = currentCol - 1; c <= currentCol + 1; c++) {

                    if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {

                        if (gameBoard[r][c].ship != -1) {
                            return false;
                        }

                    }

                }

            }

        }

    }

    else {

        if (row + size > boardSize) {
            return false;
        }

        for (let i = 0; i < size; i++) {

            let currentRow = row + i;

            for (let r = currentRow - 1; r <= currentRow + 1; r++) {

                for (let c = col - 1; c <= col + 1; c++) {

                    if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {

                        if (gameBoard[r][c].ship != -1) {
                            return false;
                        }

                    }

                }

            }

        }

    }

    return true;

}

// ---------- Add Ship ----------

function addShip(row, col, size, direction) {

    let ship = {

        size: size,
        hits: 0,
        cells: []

    };

    ships.push(ship);

    let shipIndex = ships.length - 1;

    if (direction == "horizontal") {

        for (let i = 0; i < size; i++) {

            gameBoard[row][col + i].ship = shipIndex;

            ship.cells.push({
                row: row,
                col: col + i
            });

        }

    }

    else {

        for (let i = 0; i < size; i++) {

            gameBoard[row + i][col].ship = shipIndex;

            ship.cells.push({
                row: row + i,
                col: col
            });

        }

    }

}


// ---------- Ship Destroyed ----------

function shipDestroyed(shipNumber) {

    let size = ships[shipNumber].size;

    shipsLeft[size]--;

    updateTable();

    boom.classList.remove("hidden");

    boomSound.currentTime = 0;
    boomSound.play();

    setTimeout(function () {

        boom.classList.add("hidden");

    }, 800);

}

// ---------- Update Table ----------

function updateTable() {

    left2.textContent = shipsLeft[2];
    left3.textContent = shipsLeft[3];
    left4.textContent = shipsLeft[4];
    left5.textContent = shipsLeft[5];

}

// ---------- Check Win ----------

function checkWin() {

    for (let i = 0; i < ships.length; i++) {

        if (ships[i].hits != ships[i].size) {
            return;
        }

    }

    gameStarted = false;

    setTimeout(function () {

        alert("You Win!");

    }, 300);

    startBtn.style.display = "block";
    resetBtn.style.display = "none";

}

// ---------- Reset Game ----------

function resetGame() {

    board.innerHTML = "";

    board.style.gridTemplateColumns = "";

    board.classList.add("hidden");

    message.textContent = "";

    gameBoard = [];
    ships = [];

    gameStarted = false;

    shipsLeft[2] = 0;
    shipsLeft[3] = 0;
    shipsLeft[4] = 0;
    shipsLeft[5] = 0;

    left2.textContent = "0";
    left3.textContent = "0";
    left4.textContent = "0";
    left5.textContent = "0";

    startBtn.style.display = "block";
    resetBtn.style.display = "none";

    document.getElementById("ship2").value = 0;
    document.getElementById("ship3").value = 0;
    document.getElementById("ship4").value = 0;
    document.getElementById("ship5").value = 0;

    let radios = document.querySelectorAll("input[name='boardSize']");

    radios.forEach(function (radio) {

        radio.checked = false;

    });

}
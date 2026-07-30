
let gameActive = false;
let gameGrid = [];
let gameShips = [];
let remainingShipsCount = { 2: 0, 3: 0, 4: 0, 5: 0 };
let previousValidInputs = { ship2: 0, ship3: 0, ship4: 0, ship5: 0 };

let startBtn = document.getElementById("start-btn");
let resetBtn = document.getElementById("reset-btn");
let messageEl = document.getElementById("message");

let shipInputs = [
    document.getElementById("ship2"),
    document.getElementById("ship3"),
    document.getElementById("ship4"),
    document.getElementById("ship5")
];

// הסתרת כפתור האיפוס בטעינת הדף
resetBtn.style.display = "none";

// בעת שינוי גודל לוח - בודקים את כל האינפוטים הקיימים
let radioButtons = document.querySelectorAll("input[name='boardSize']");
for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener("change", function() {
        validateAllInputs();
    });
}

for (let i = 0; i < shipInputs.length; i++) {
    let input = shipInputs[i];

    input.addEventListener("focus", function() {
        previousValidInputs[this.id] = Number(this.value);
    });

    input.addEventListener("input", function() {
        validateSingleInput(this);
    });
}

function getSelectedBoardSize() {
    let checked = document.querySelector("input[name='boardSize']:checked");
    if (checked) {
        return Number(checked.value);
    } else {
        return 0;
    }
}

function validateSingleInput(changedInput) {
    let size = getSelectedBoardSize();
    if (!size) return;

    let counts = {
        2: Number(document.getElementById("ship2").value) || 0,
        3: Number(document.getElementById("ship3").value) || 0,
        4: Number(document.getElementById("ship4").value) || 0,
        5: Number(document.getElementById("ship5").value) || 0
    };

    if (!simulatePlacement(counts, size)) {
        messageEl.textContent = "Too many ships for this board size!";
        changedInput.value = previousValidInputs[changedInput.id];
    } else {
        messageEl.textContent = "";
        previousValidInputs[changedInput.id] = Number(changedInput.value);
    }
}

function validateAllInputs() {
    let size = getSelectedBoardSize();
    if (!size) return;

    let counts = {
        2: Number(document.getElementById("ship2").value) || 0,
        3: Number(document.getElementById("ship3").value) || 0,
        4: Number(document.getElementById("ship4").value) || 0,
        5: Number(document.getElementById("ship5").value) || 0
    };

    if (!simulatePlacement(counts, size)) {
        messageEl.textContent = "Adjusted ship quantities for new board size.";
        for (let i = 0; i < shipInputs.length; i++) {
            shipInputs[i].value = 0;
            previousValidInputs[shipInputs[i].id] = 0;
        }
    } else {
        messageEl.textContent = "";
    }
}

startBtn.addEventListener("click", function() {
    let boardSize = getSelectedBoardSize();
    if (!boardSize) {
        messageEl.textContent = "Please choose a board size!";
        return;
    }

    let shipCounts = {
        2: Number(document.getElementById("ship2").value) || 0,
        3: Number(document.getElementById("ship3").value) || 0,
        4: Number(document.getElementById("ship4").value) || 0,
        5: Number(document.getElementById("ship5").value) || 0
    };

    let totalShips = shipCounts[2] + shipCounts[3] + shipCounts[4] + shipCounts[5];
    if (totalShips === 0) {
        messageEl.textContent = "Choose at least 1 battleship.";
        return;
    }

    let placementData = generateShipPositions(shipCounts, boardSize);
    if (!placementData) {
        messageEl.textContent = "Could not place ships. Try reducing the amount.";
        return;
    }

    gameGrid = placementData.grid;
    gameShips = placementData.ships;
    remainingShipsCount = {
        2: shipCounts[2],
        3: shipCounts[3],
        4: shipCounts[4],
        5: shipCounts[5]
    };
    gameActive = true;

    updateShipsTable(remainingShipsCount);
    createBoardUI(boardSize, handleCellClick);

    startBtn.style.display = "none";
    resetBtn.style.display = "block";
    messageEl.textContent = "";
});

function handleCellClick(row, col, cellElement) {
    if (!gameActive) return;
    if (cellElement.classList.contains("hit") || cellElement.classList.contains("miss")) return;

    let shipId = gameGrid[row][col];

    if (shipId === -1) {
        cellElement.classList.add("miss");
    } else {
        cellElement.classList.add("hit");
        
        // שימוש ב-find למציאת הספינה
        let ship = gameShips.find(function(s) {
            return s.id === shipId;
        });

        if (ship) {
            ship.hits++;

            if (ship.hits === ship.size) {
                remainingShipsCount[ship.size]--;
                updateShipsTable(remainingShipsCount);
                triggerBoom();
            }
        }

        checkWinState();
    }
}

function checkWinState() {
    // שימוש ב-filter לבדיקת ספינות שעוד לא הוטבעו
    let activeShips = gameShips.filter(function(s) {
        return s.hits < s.size;
    });

    if (activeShips.length === 0) {
        gameActive = false;
        setTimeout(function() {
            alert("You Win! All battleships destroyed!");
        }, 300);
    }
}

resetBtn.addEventListener("click", function() {
    gameActive = false;
    resetBoardUI();
    
    startBtn.style.display = "block";
    resetBtn.style.display = "none";
    messageEl.textContent = "";

    let numberInputs = document.querySelectorAll("input[type='number']");
    for (let i = 0; i < numberInputs.length; i++) {
        numberInputs[i].value = 0;
    }

    let boardRadios = document.querySelectorAll("input[name='boardSize']");
    for (let i = 0; i < boardRadios.length; i++) {
        boardRadios[i].checked = false;
    }
    
    previousValidInputs = { ship2: 0, ship3: 0, ship4: 0, ship5: 0 };
});
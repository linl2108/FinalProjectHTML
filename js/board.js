
const boardElement = document.getElementById("board");
const boomElement = document.getElementById("boom");
const boomSound = document.getElementById("boomSound");

function createBoardUI(boardSize, onCellClick) {
    boardElement.innerHTML = "";
    boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 42px)`;
    boardElement.classList.remove("hidden");

    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener("click", () => onCellClick(r, c, cell));
            boardElement.appendChild(cell);
        }
    }
}

function updateShipsTable(shipsLeft) {
    document.getElementById("left2").textContent = shipsLeft[2] || 0;
    document.getElementById("left3").textContent = shipsLeft[3] || 0;
    document.getElementById("left4").textContent = shipsLeft[4] || 0;
    document.getElementById("left5").textContent = shipsLeft[5] || 0;
}

function triggerBoom() {
    boomElement.classList.remove("hidden");
    if (boomSound) {
        boomSound.currentTime = 0;
        boomSound.play().catch(() => {}); // התעלמות מהגבלות autoplay של בדפדפן
    }
    setTimeout(() => {
        boomElement.classList.add("hidden");
    }, 800);
}

function resetBoardUI() {
    boardElement.innerHTML = "";
    boardElement.classList.add("hidden");
    updateShipsTable({ 2: 0, 3: 0, 4: 0, 5: 0 });
}
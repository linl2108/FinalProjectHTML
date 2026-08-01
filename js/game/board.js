// מקבלת אלמנטים
const boardElement = document.getElementById("board");
const boomElement = document.getElementById("boom");
const boomSound = document.getElementById("boomSound");

// יצירת לוח המשחק
function createBoardUI(boardSize, onCellClick) {
    
    // מנקה לוח קיים
    boardElement.innerHTML = "";

    // גודל הלוח אשמור כמשתנה כדי להשתמש בו ב-css
    boardElement.style.setProperty("--size", boardSize);
    boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 42px)`;

    boardElement.classList.remove("hidden");

    // עוברת על כל השורות בלוח
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

// עדכון בר התקדמות (הספינות שנשארו למשתמש) בצד ימין במסך המחשב
function updateShipsTable(shipsLeft) {
    document.getElementById("left2").textContent = shipsLeft[2] || 0;
    document.getElementById("left3").textContent = shipsLeft[3] || 0;
    document.getElementById("left4").textContent = shipsLeft[4] || 0;
    document.getElementById("left5").textContent = shipsLeft[5] || 0;
}

// השמעת בום כאשר
function triggerBoom() {
    boomElement.classList.remove("hidden");
    if (boomSound) {
        boomSound.currentTime = 0;
        boomSound.play().catch(() => {}); // התעלמות מהגבלות autoplay של בדפדפן
    }
     // לאחר 800 מילשניות האנימציה תרד/תוסתר
    setTimeout(() => {
        boomElement.classList.add("hidden");
    }, 800);
}

// עדכון הגדרות
function resetBoardUI() {
    boardElement.innerHTML = "";
    boardElement.classList.add("hidden");
    updateShipsTable({ 2: 0, 3: 0, 4: 0, 5: 0 });
}

// בדיקה האם ניתן להציב ספינה במיקום מסוים כולל מרווח של משבצת
function canPlaceShip(grid, row, col, size, direction, boardSize) {
    if (direction === 'horizontal') {
        if (col + size > boardSize) return false;
        for (let r = Math.max(0, row - 1); r <= Math.min(boardSize - 1, row + 1); r++) {
            for (let c = Math.max(0, col - 1); c <= Math.min(boardSize - 1, col + size); c++) {
                if (grid[r][c] !== -1) return false;
            }
        }
    } else {
        if (row + size > boardSize) return false;
        for (let r = Math.max(0, row - 1); r <= Math.min(boardSize - 1, row + size); r++) {
            for (let c = Math.max(0, col - 1); c <= Math.min(boardSize - 1, col + 1); c++) {
                if (grid[r][c] !== -1) return false;
            }
        }
    }
    return true;
}

// אלגוריתם הצבה על לוח דמה שבודק אם כמות הספינות נכנסת בלוח
function simulatePlacement(shipCounts, boardSize) {
    let grid = Array.from({ length: boardSize }, () => Array(boardSize).fill(-1));
    let shipList = [];

    // יצירת רשימה ומיוון מהגדול לקטן (5 down to 2)
    [5, 4, 3, 2].forEach(size => {
        for (let i = 0; i < (shipCounts[size] || 0); i++) {
            shipList.push(size);
        }
    });

    for (let size of shipList) {
        let placed = false;
        let attempts = 0;
        const maxAttempts = 500;

        while (!placed && attempts < maxAttempts) {
            attempts++;

            // בחירת כיוון באמצעות if-else
            let direction = 'vertical';
            if (Math.random() < 0.5) {
                direction = 'horizontal';
            }

            let row = Math.floor(Math.random() * boardSize);
            let col = Math.floor(Math.random() * boardSize);

            if (canPlaceShip(grid, row, col, size, direction, boardSize)) {
                // הצבת הספינה בלוח הדמה
                for (let i = 0; i < size; i++) {
                    if (direction === 'horizontal') {
                        grid[row][col + i] = size;
                    } else {
                        grid[row + i][col] = size;
                    }
                }
                placed = true;
            }
        }

        if (!placed) return false; // לא נכנס בלוח
    }
    return true;
}

// ביצוע הצבה בפועל עבור המשחק
function generateShipPositions(shipCounts, boardSize) {
    let grid = Array.from({ length: boardSize }, () => Array(boardSize).fill(-1));
    let ships = [];
    let shipId = 0;

    let shipSizes = [5, 4, 3, 2];

    for (let size of shipSizes) {
        let count = shipCounts[size] || 0;
        for (let i = 0; i < count; i++) {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < 1000) {
                attempts++;
                let direction = 'horizontal';
                if (Math.random() >= 0.5) {
                    direction = 'vertical';
                }
                
                let row = Math.floor(Math.random() * boardSize);
                let col = Math.floor(Math.random() * boardSize);

                if (canPlaceShip(grid, row, col, size, direction, boardSize)) {
                    let occupiedCells = [];
                    for (let s = 0; s < size; s++) {
                        let r = row;
                        let c = col;

                        // חישוב המיקומים בעזרת if-else
                        if (direction === 'horizontal') {
                            c = col + s;
                        } else {
                            r = row + s;
                        }

                        grid[r][c] = shipId;
                        occupiedCells.push({ row: r, col: c });
                    }
                    ships.push({
                        id: shipId,
                        size: size,
                        hits: 0,
                        cells: occupiedCells
                    });
                    shipId++;
                    placed = true;
                }
            }
            if (!placed) return null; // כשל נדיר בהצבה
        }
    }
    return { grid: grid, ships: ships };
}
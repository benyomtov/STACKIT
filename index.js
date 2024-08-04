// document.addEventListener('DOMContentLoaded', () => {
//     const grid = document.getElementById('grid-container');
//     const colorButtons = document.querySelectorAll('#color-buttons button');
//     const player1PointsDisplay = document.getElementById('player1-points');
//     const player2PointsDisplay = document.getElementById('player2-points');
//     const turnIndicator = document.getElementById('turn-indicator');
//     const gameResult = document.getElementById('game-result');
//     const movesLeftDisplay = document.getElementById('moves-left'); // New element for moves left
//     const blocks = [];
//     const blockColors = Array(64).fill('white'); // Initialize block colors with white
//     let selectedColor = 'red'; // Default color
//     let hoveredIndex = null; // To keep track of the currently hovered block
//     let points = [0, 0]; // Points for Player 1 and Player 2
//     let currentPlayer = 0; // 0 for Player 1, 1 for Player 2
//     let turnsLeft = 64; // Total turns in the game

//     // Create the 8x8 grid of divs
//     for (let i = 0; i < 64; i++) {
//         const block = document.createElement('div');
//         block.className = 'grid-item';
//         grid.appendChild(block);
//         blocks.push(block);
//     }

//     // Add event listeners to buttons
//     colorButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             selectedColor = button.getAttribute('data-color');
//             console.log(`Selected color: ${selectedColor}`); // Debugging
//         });
//     });

//     function updateGlowEffect(index) {
//         if (index === null) return; // If no index, do nothing

//         const rowCount = 8;
//         const colCount = 8;
//         const centerRow = Math.floor(index / rowCount);
//         const centerCol = index % colCount;

//         blocks.forEach((block, idx) => {
//             block.classList.remove('glow', 'light'); // Reset all blocks
//             block.style.backgroundColor = blockColors[idx]; // Reset to stored color
//         });

//         // Glow the center block
//         if (blocks[index]) {
//             blocks[index].classList.add('glow');
//             blocks[index].style.backgroundColor = selectedColor; // Set the glow color
//         }

//         // Highlight surrounding blocks
//         for (let r = -1; r <= 1; r++) {
//             for (let c = -1; c <= 1; c++) {
//                 if (r === 0 && c === 0) continue; // Skip the center block itself

//                 const newRow = centerRow + r;
//                 const newCol = centerCol + c;
//                 if (newRow >= 0 && newRow < rowCount && newCol >= 0 && newCol < colCount) {
//                     const surroundingIndex = newRow * rowCount + newCol;
//                     blocks[surroundingIndex].classList.add('light');
//                     blocks[surroundingIndex].style.backgroundColor = getLighterColor(selectedColor);
//                 }
//             }
//         }
//     }

//     function getLighterColor(color) {
//         const colorMap = {
//             red: '#ffcccc',
//             green: '#ccffcc',
//             blue: '#ccccff',
//             yellow: '#ffffcc'
//         };
//         return colorMap[color] || 'lightgray';
//     }

//     function getDarkerColor(color) {
//         const colorMap = {
//             red: '#cc0000',   // Darker red
//             green: '#009900', // Darker green
//             blue: '#000099',  // Darker blue
//             yellow: '#cccc00' // Darker yellow
//         };
//         return colorMap[color] || 'gray';
//     }

//     function getColorName(hex) {
//         const hexMap = {
//             '#cc0000': 'red',
//             '#009900': 'green',
//             '#000099': 'blue',
//             '#cccc00': 'yellow',
//             'white': 'white'
//         };
//         return hexMap[hex] || 'unknown';
//     }

//     function calculatePoints(oldColor, newColor) {
//         const pointsMap = {
//             red: { yellow: 1, blue: 3, green: 2, white: 0, red: 0 },
//             yellow: { green: 1, red: 3, blue: 2, white: 0, yellow: 0 },
//             green: { blue: 1, yellow: 3, red: 2, white: 0, green: 0 },
//             blue: { red: 1, green: 3, yellow: 2, white: 0, blue: 0 },
//             white: { red: 0, yellow: 0, green: 0, blue: 0, white: 0 }
//         };
    
//         // Handle initial white color transition and same color transition
//         if (oldColor === newColor || oldColor === 'white') {
//             return 0;
//         }
    
//         if (!pointsMap[oldColor] || !pointsMap[oldColor][newColor]) {
//             console.error(`Invalid color transition from ${oldColor} to ${newColor}`);
//             return 0;
//         }
    
//         return pointsMap[oldColor][newColor];
//     }

//     function handleClick(index) {
//         if (index === null) return; // If no index, do nothing
    
//         const rowCount = 8;
//         const colCount = 8;
//         const centerRow = Math.floor(index / rowCount);
//         const centerCol = index % colCount;
    
//         let newPoints = 0; // Points earned in this click
    
//         // Set the center block and surrounding blocks to the darker color
//         for (let r = -1; r <= 1; r++) {
//             for (let c = -1; c <= 1; c++) {
//                 const newRow = centerRow + r;
//                 const newCol = centerCol + c;
//                 if (newRow >= 0 && newRow < rowCount && newCol >= 0 && newCol < colCount) {
//                     const surroundingIndex = newRow * rowCount + newCol;
//                     let oldColor = getColorName(blockColors[surroundingIndex]); // Use 'let' for reassignment
//                     const newColor = getColorName(getDarkerColor(selectedColor));
//                     const pointsEarned = calculatePoints(oldColor, newColor);
//                     newPoints += pointsEarned;
//                     blocks[surroundingIndex].style.backgroundColor = getDarkerColor(selectedColor);
//                     blockColors[surroundingIndex] = getDarkerColor(selectedColor); // Persist color
//                 }
//             }
//         }
    
//         let oldColor = getColorName(blockColors[index]); // Use 'let' for reassignment
//         const newColor = getColorName(getDarkerColor(selectedColor));
//         const pointsEarned = calculatePoints(oldColor, newColor);
//         newPoints += pointsEarned;
//         blocks[index].style.backgroundColor = getDarkerColor(selectedColor); // Set center block color
//         blockColors[index] = getDarkerColor(selectedColor); // Persist color

//         console.log(`Points earned this turn: ${newPoints}`); // Debugging
        
//         // Update points based on player
//         points[currentPlayer] += newPoints; 
//         if (currentPlayer === 0) {
//             player1PointsDisplay.innerHTML = `Player 1 Points: <span id="bigger">${points[0]}</span>`;
//         } else {
//             player2PointsDisplay.innerHTML = `Player 2 Points: <span id="bigger">${points[1]}</span>`;
//         }
    
//         // Update moves left
//         turnsLeft--;
//         movesLeftDisplay.innerHTML = `Moves Left: <span id="bigger">${turnsLeft}</span>`;
    
//         if (turnsLeft === 0) {
//             // Game over
//             endGame();
//         } else {
//             // Switch player turn
//             currentPlayer = 1 - currentPlayer; // Toggle between 0 and 1
//             turnIndicator.textContent = `Player ${currentPlayer + 1}'s Turn`;
//         }
//     }

//     function endGame() {
//         const playAgain=document.getElementById('hover');
//         // Determine the winner
//         const [player1Score, player2Score] = points;
//         let winner;
//         if (player1Score > player2Score) {
//             winner = 'Player 1 Wins!';
//         } else if (player2Score > player1Score) {
//             winner = 'Player 2 Wins!';
//         } else {
//             winner = 'It\'s a Tie!';
//         }
    
//         // Display the result
//         gameResult.textContent = winner;

//         grid.style.display = 'none'; // Hide the grid
//         colorButtons.forEach(button => button.style.display = 'none');
//         gameResult.style.display= 'block';
//         playAgain.style.display= 'block';
//         // Hide color
//     }

//     // Add event listeners to grid blocks
//     blocks.forEach((block, index) => {
//         block.addEventListener('mouseenter', () => {
//             hoveredIndex = index;
//             updateGlowEffect(index);
//         });

//         block.addEventListener('mouseleave', () => {
//             hoveredIndex = null;
//             updateGlowEffect(null);
//         });

//         block.addEventListener('click', () => {
//             if (hoveredIndex !== null) {
//                 handleClick(hoveredIndex);
//             }
//         });
//     });

//     // Initialize UI elements
//     turnIndicator.textContent = `Player ${currentPlayer + 1}'s Turn`;
//     player1PointsDisplay.innerHTML = `Player 1 Points: <span id="bigger">${points[0]}</span`;
//     player2PointsDisplay.innerHTML = `Player 2 Points: <span id="bigger">${points[1]}</span>`;
//     movesLeftDisplay.innerHTML = `Moves Left: <span id="bigger">${turnsLeft}</span>`; // Initialize moves left display
//     gameResult.textContent = '';
// });

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid-container');
    const colorButtons = document.querySelectorAll('#color-buttons button');
    const player1PointsDisplay = document.getElementById('player1-points');
    const player2PointsDisplay = document.getElementById('player2-points');
    const turnIndicator = document.getElementById('turn-indicator');
    const gameResult = document.getElementById('game-result');
    const movesLeftDisplay = document.getElementById('moves-left'); // New element for moves left
    const blocks = [];
    const blockColors = Array(64).fill('white'); // Initialize block colors with white
    let selectedColor = 'red'; // Default color
    let hoveredIndex = null; // To keep track of the currently hovered block
    let points = [0, 0]; // Points for Player 1 and Player 2
    let currentPlayer = 0; // 0 for Player 1, 1 for Player 2
    let turnsLeft = 64; // Total turns in the game

    // Create the 8x8 grid of divs
    for (let i = 0; i < 64; i++) {
        const block = document.createElement('div');
        block.className = 'grid-item';
        grid.appendChild(block);
        blocks.push(block);
    }

    // Add event listeners to buttons
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedColor = button.getAttribute('data-color');
            console.log(`Selected color: ${selectedColor}`); // Debugging
        });
    });

    function updateGlowEffect(index) {
        if (index === null) return; // If no index, do nothing

        const rowCount = 8;
        const colCount = 8;
        const centerRow = Math.floor(index / rowCount);
        const centerCol = index % colCount;

        blocks.forEach((block, idx) => {
            block.classList.remove('glow', 'light'); // Reset all blocks
            block.style.backgroundColor = blockColors[idx]; // Reset to stored color
        });

        // Glow the center block
        if (blocks[index]) {
            blocks[index].classList.add('glow');
            blocks[index].style.backgroundColor = selectedColor; // Set the glow color
        }

        // Highlight surrounding blocks
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                if (r === 0 && c === 0) continue; // Skip the center block itself

                const newRow = centerRow + r;
                const newCol = centerCol + c;
                if (newRow >= 0 && newRow < rowCount && newCol >= 0 && newCol < colCount) {
                    const surroundingIndex = newRow * rowCount + newCol;
                    blocks[surroundingIndex].classList.add('light');
                    blocks[surroundingIndex].style.backgroundColor = getLighterColor(selectedColor);
                }
            }
        }
    }

    function getLighterColor(color) {
        const colorMap = {
            red: '#ffcccc',
            green: '#ccffcc',
            blue: '#ccccff',
            yellow: '#ffffcc'
        };
        return colorMap[color] || 'lightgray';
    }

    function getDarkerColor(color) {
        const colorMap = {
            red: '#cc0000',   // Darker red
            green: '#009900', // Darker green
            blue: '#000099',  // Darker blue
            yellow: '#cccc00' // Darker yellow
        };
        return colorMap[color] || 'gray';
    }

    function getColorName(hex) {
        const hexMap = {
            '#cc0000': 'red',
            '#009900': 'green',
            '#000099': 'blue',
            '#cccc00': 'yellow',
            'white': 'white'
        };
        return hexMap[hex] || 'unknown';
    }

    function calculatePoints(oldColor, newColor) {
        const pointsMap = {
            red: { yellow: 1, blue: 3, green: 2, white: 0, red: 0 },
            yellow: { green: 1, red: 3, blue: 2, white: 0, yellow: 0 },
            green: { blue: 1, yellow: 3, red: 2, white: 0, green: 0 },
            blue: { red: 1, green: 3, yellow: 2, white: 0, blue: 0 },
            white: { red: 0, yellow: 0, green: 0, blue: 0, white: 0 }
        };

        // Handle initial white color transition and same color transition
        if (oldColor === newColor || oldColor === 'white') {
            return 0;
        }

        if (!pointsMap[oldColor] || !pointsMap[oldColor][newColor]) {
            console.error(`Invalid color transition from ${oldColor} to ${newColor}`);
            return 0;
        }

        return pointsMap[oldColor][newColor];
    }

    function handleClick(index) {
        if (index === null) return; // If no index, do nothing

        const rowCount = 8;
        const colCount = 8;
        const centerRow = Math.floor(index / rowCount);
        const centerCol = index % colCount;

        let newPoints = 0; // Points earned in this click

        // Set the center block and surrounding blocks to the darker color
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                const newRow = centerRow + r;
                const newCol = centerCol + c;
                if (newRow >= 0 && newRow < rowCount && newCol >= 0 && newCol < colCount) {
                    const surroundingIndex = newRow * rowCount + newCol;
                    let oldColor = getColorName(blockColors[surroundingIndex]); // Use 'let' for reassignment
                    const newColor = getColorName(getDarkerColor(selectedColor));
                    const pointsEarned = calculatePoints(oldColor, newColor);
                    newPoints += pointsEarned;
                    blocks[surroundingIndex].style.backgroundColor = getDarkerColor(selectedColor);
                    blockColors[surroundingIndex] = getDarkerColor(selectedColor); // Persist color
                }
            }
        }

        let oldColor = getColorName(blockColors[index]); // Use 'let' for reassignment
        const newColor = getColorName(getDarkerColor(selectedColor));
        const pointsEarned = calculatePoints(oldColor, newColor);
        newPoints += pointsEarned;
        blocks[index].style.backgroundColor = getDarkerColor(selectedColor); // Set center block color
        blockColors[index] = getDarkerColor(selectedColor); // Persist color

        console.log(`Points earned this turn: ${newPoints}`); // Debugging

        // Subtract points if the earned points are 9, 18, or 27
        if ([9, 18, 27].includes(newPoints)) {
            newPoints -= newPoints;
        }

        // Update points based on player
        points[currentPlayer] += newPoints;
        if (currentPlayer === 0) {
            player1PointsDisplay.innerHTML = `Player 1 Points: <span id="bigger">${points[0]}</span>`;
        } else {
            player2PointsDisplay.innerHTML = `Player 2 Points: <span id="bigger">${points[1]}</span>`;
        }

        // Update moves left
        turnsLeft--;
        movesLeftDisplay.innerHTML = `Moves Left: <span id="bigger">${turnsLeft}</span>`;

        if (turnsLeft === 0) {
            // Game over
            endGame();
        } else {
            // Switch player turn
            currentPlayer = 1 - currentPlayer; // Toggle between 0 and 1
            turnIndicator.textContent = `Player ${currentPlayer + 1}'s Turn`;
        }
    }

    function endGame() {
        const playAgain = document.getElementById('hover');
        // Determine the winner
        const [player1Score, player2Score] = points;
        let winner;
        if (player1Score > player2Score) {
            winner = 'Player 1 Wins!';
        } else if (player2Score > player1Score) {
            winner = 'Player 2 Wins!';
        } else {
            winner = 'It\'s a Tie!';
        }

        // Display the result
        gameResult.textContent = winner;

        grid.style.display = 'none'; // Hide the grid
        colorButtons.forEach(button => button.style.display = 'none');
        gameResult.style.display = 'block';
        playAgain.style.display = 'block';
        // Hide color
    }

    // Add event listeners to grid blocks
    blocks.forEach((block, index) => {
        block.addEventListener('mouseenter', () => {
            hoveredIndex = index;
            updateGlowEffect(index);
        });

        block.addEventListener('mouseleave', () => {
            hoveredIndex = null;
            updateGlowEffect(null);
        });

        block.addEventListener('click', () => {
            if (hoveredIndex !== null) {
                handleClick(hoveredIndex);
            }
        });
    });

    // Initialize UI elements
    turnIndicator.textContent = `Player ${currentPlayer + 1}'s Turn`;
    player1PointsDisplay.innerHTML = `Player 1 Points: <span id="bigger">${points[0]}</span`;
    player2PointsDisplay.innerHTML = `Player 2 Points: <span id="bigger">${points[1]}</span>`;
    movesLeftDisplay.innerHTML = `Moves Left: <span id="bigger">${turnsLeft}</span>`; // Initialize moves left display
    gameResult.textContent = '';
});


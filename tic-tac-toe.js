document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll("#board > div");
    let currentPlayer = "X";

    let gameOver = false;
    const status = document.querySelector("#status");
    const originalStatus = status.textContent;
    const newGameButton = document.querySelector(".controls .btn");

    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWinner(player) {
        for (const line of winningLines) {
            const [a, b, c] = line;

            if (
                squares[a].textContent === player &&
                squares[b].textContent === player &&
                squares[c].textContent === player
            ) {
                return true;
            }
        }

        return false;
    }

    squares.forEach(function (square) {
        square.classList.add("square");

        square.addEventListener("click", function () {
            if (gameOver) {
                return;
            }

            square.textContent = currentPlayer;
            square.classList.add(currentPlayer);

            if (checkWinner(currentPlayer)) {
                status.textContent =
                    "Congratulations! " + currentPlayer + " is the Winner!";
                status.classList.add("you-won");
                gameOver = true;
                return;
            }

            if (currentPlayer === "X") {
                currentPlayer = "O";
            } else {
                currentPlayer = "X";
            }
        });

        square.addEventListener("mouseover", function () {
            square.classList.add("hover");
        });

        square.addEventListener("mouseout", function () {
            square.classList.remove("hover");
        });
    });

    newGameButton.addEventListener("click", function () {
        squares.forEach(function (square) {
            square.textContent = "";
            square.classList.remove("X", "O", "hover");
        });

        status.textContent = originalStatus;
        status.classList.remove("you-won");

        currentPlayer = "X";
        gameOver = false;
    });


});
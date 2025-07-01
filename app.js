let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // playerO starts

// Play a beep sound (no mp3 file needed)
function playClickSound() {
    const context = new(window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(440, context.currentTime); // A4 note
    gainNode.gain.setValueAtTime(0.1, context.currentTime); // volume

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.2); // 0.1 seconds beep
}

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "#ffffff"; // reset color
    }
};

const showwinner = (winner) => {
    msg.innerText = `🎉 Winner is ${winner}!`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showwinner(pos1val);
                return;
            }
        }
    }

    // Draw check
    let isDraw = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (isDraw) {
        msg.innerText = "😐 Again game!";
        msgcontainer.classList.remove("hide");
        disableBoxes();
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        playClickSound();

        if (turnO) {
            box.innerText = "O";
            box.style.backgroundColor = "#ffe4b5"; // O color
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.backgroundColor = "#90ee90"; // X color
            turnO = true;
        }

        box.disabled = true;
        checkWinner();
    });
});

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
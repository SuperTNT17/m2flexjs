class Rect {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.x2 = x + w
        this.y2 = y + h
    }
}

// oude functie in plaats van een class

// function createRect(x, y, w, h)
// {
//     let rectangle = {
//         x : x,
//         y : y,
//         x2 : x + w,
//         y2 : y + h,
//         w : w,
//         h : h
//     }
//     return rectangle
// }

let uiWindow = new Rect(600, 200, 300, 300)
let canvas = document.getElementById("canvas")
let g = canvas.getContext("2d")

const gamestate_start = 0
const gamestate_ingame = 1
const gamestate_gameover = 2

const ingamestate_start = 0
const ingamestate_roll = 1
const ingamestate_end = 0

let images = {}

let gameState = gamestate_start
let ingameState = ingamestate_start

let boardPositionSize = 50
let pawnPositions = []
let boardPositions = []
let playerAmountButtons = []

function loadImages() {
    let sources = [
        "img/dice1.png", "img/dice2.png", "img/dice3.png", "img/dice4.png", "img/dice5.png", "img/dice6.png",
        "img/pawn0.png", "img/pawn1.png", "img/pawn2.png", "img/pawn3.png",
        "img/snakes.png",
        "img/trophy.png",
        "img/window.png",
    ];

    let scope = this;

    let loaded = 0;
    for (let i = 0; i < sources.length; i++) {
        let img = new Image();


        img.onload = function () {
            loaded++;
            if (loaded == sources.length) {
                imageLoaded();
            }
        };
        img.src = sources[i];

        images[sources[i].replace("img/", "")] = img;
    }
}

function imageLoaded() {
    initGame()
    canvas.addEventListener("click", (e) => { canvasClicked(e) })
    draw()
}

function canvasClicked(mouseEvent) {
    if (gameState == gamestate_start) {
        for (let i = 0; i < playerAmountButtons.length; i++) {
            let button = playerAmountButtons[i];
            let mX = mouseEvent.clientX
            let mY = mouseEvent.clientY
            let hitButton = inRect(mX, mY, button)
            if (hitButton) {
                startGame(button.playerAmount)
                break;
            }
        }
    }
}

function inRect(px, py, rect) {
    let result = (px >= rect.x && px <= rect.x2 && py >= rect.y && py <= rect.y2)
    return result
}

function clearCanvas() {
    g.fillStyle = "lightslategray";
    g.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clearCanvas()
    if (gameState == gamestate_start) {
        drawGameStart()
    }
    if (gameState == gamestate_ingame) {
        drawIngame()
    }
}

function createBoardPositions() {
    let x = 0;
    let y = canvas.height - boardPositionSize;
    let path = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    for (let i = 0; i < path.length; i++) {

        if (path[i] == 1)//gaan naar rechts
        {
            //bedenk hier wat je met de x moet doen
            x += boardPositionSize + 5
        }
        else if (path[i] == 3)//gaan naar links
        {
            // bedenk hier wat je met de x moet doen
            x -= boardPositionSize + 5
        }
        else if (path[i] == 0)//gaan hier naar boven
        {
            //bedenk hier wat je met de y moet doen
            y -= boardPositionSize + 5
        }
        boardPositions.push(new Rect(x, y, boardPositionSize, boardPositionSize));
    }
}

function startGame(playerAmount) {
    gameState = gamestate_ingame
    ingameState = ingamestate_start
    pawnPositions = []
    playerTurn = 0
    winner = -1
    console.log("playerAmount " + playerAmount)
    for (let i = 0; i < playerAmount; i++) {
        pawnPositions.push(createPawn(i))
    }

    draw()
}

function createPawn(playerI) {
    return { boardI: 0, playerI: playerI }
}

function initGame() {
    createBoardPositions()
    for (let i = 0; i < 4; i++) {
        let button = new Rect(uiWindow.x + 5 + i * 55, uiWindow.y + 50, 50, 50)
        playerAmountButtons[i] = button
        button.playerAmount = i + 1
    }
}

function drawGameStart() {
    for (let i = 0; i < playerAmountButtons.length; i++) {
        g.fillStyle = "#004400";
        g.fillRect(playerAmountButtons[i].x, playerAmountButtons[i].y, playerAmountButtons[i].h, playerAmountButtons[i].w);
        g.fillStyle = "#FFFFFF";
        g.fillText((i + 1) + "", playerAmountButtons[i].x, playerAmountButtons[i].y + 20);
        g.drawImage(images["pawn" + i + ".png"], playerAmountButtons[i].x, playerAmountButtons[i].y, playerAmountButtons[i].w, playerAmountButtons[i].h)
    }
    g.fillText("Click the amount of players to start", uiWindow.x, uiWindow.y);
}

function drawIngame() {
    for (let i = 0; i < boardPositions.length; i++) {
        let pos = boardPositions[i];

        g.fillStyle = "#004400";
        g.fillRect(pos.x, pos.y, pos.h, pos.w);
        g.fillStyle = "#FFFFFF";
        g.fillText((i + 1) + "", pos.x, pos.y + 20);
    }

    let x = 0
    let y = 0
    for (let i = 0; i < pawnPositions.length; i++) {
        let pos = pawnPositions[i]
        let boardI = pos.boardI

        let boardpos = boardPositions[boardI]
        let pawnSize = boardPositionSize / 2
        g.drawImage(images["pawn" + i + ".png"], boardpos.x + (x) * pawnSize, boardpos.y + (y)*pawnSize, boardpos.w / 2, boardpos.h / 2)
        x++;
        if(x == 2){
            x = 0
            y += 1
        }
    }
    g.drawImage(images["snakes.png"], 0, 55, 600, 600)
}

function drawGameOver() {

}

loadImages()
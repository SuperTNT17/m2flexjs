class Rect
{
    constructor(x, y, w, h)
    {
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

let gameState = gamestate_start
let ingameState = ingamestate_start

let boardPositionSize = 50
let pawnPositions = []
let boardPositions =[]
let playerAmountButtons = []



function clearCanvas()
{
    g.fillStyle = "lightslategray";
    g.fillRect(0, 0, canvas.width, canvas.height);
}

function draw()
{
    clearCanvas()
    if (gameState == gamestate_start) {
        drawGameStart()
    }
    if (gameState == gamestate_ingame) {
        drawIngame()
    }
}

function createBoardPositions()
{
    let x= 0;
    let y = canvas.height - boardPositionSize;
    let path = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1] ;

    for(let i = 0 ; i < path.length; i++)
    {

        if(path[i] == 1)//gaan naar rechts
        {
            //bedenk hier wat je met de x moet doen
            x += boardPositionSize + 5
        }
        else if(path[i] == 3)//gaan naar links
        {
            // bedenk hier wat je met de x moet doen
            x -= boardPositionSize + 5
        }
        else if(path[i] == 0)//gaan hier naar boven
        {
            //bedenk hier wat je met de y moet doen
            y -= boardPositionSize + 5
        }
        boardPositions.push(new Rect(x, y, boardPositionSize, boardPositionSize));
    }
}

function initGame(){
    createBoardPositions()
    for (let i = 0; i < 4; i++) {
        let button = new Rect(uiWindow.x + 5 + i * 55, uiWindow.y + 50, 50 ,50)       
        playerAmountButtons[i] = button
        button.playerAmount = i + 1
    }
}

function drawGameStart()
{
    for (let i = 0; i < playerAmountButtons.length; i++) {
        g.fillStyle = "#004400";
        g.fillRect(playerAmountButtons[i].x, playerAmountButtons[i].y, playerAmountButtons[i].h, playerAmountButtons[i].w);
        g.fillStyle = "#FFFFFF";
        g.fillText((i + 1) + "", playerAmountButtons[i].x, playerAmountButtons[i].y + 20);
    }
    g.fillText("Click the amount of players to start", uiWindow.x, uiWindow.y);
}

function drawIngame()
{
    for(let i = 0 ; i < boardPositions.length; i++)
    {
        let pos = boardPositions[i];

        g.fillStyle = "#004400";
        g.fillRect(pos.x, pos.y, pos.h, pos.w);
        g.fillStyle = "#FFFFFF";
        g.fillText((i + 1) + "", pos.x, pos.y + 20);
    }
}

function drawGameOver()
{

}

initGame()
draw()
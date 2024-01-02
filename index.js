const grid = document.querySelector('.grid');
const gameOver = document.querySelector('.game-over')
const upBtn = document.querySelector('.up')
const downBtn = document.querySelector('.down')
const leftBtn = document.querySelector('.left')
const rightBtn = document.querySelector('.right')
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const scoreDisplay = document.getElementById('score');
const finalScore = document.getElementById('final-score');
let squares = [];
let currentSnake = [2,1,0];
let direction = 1;
const width = 15;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;
let dead = new Audio();
let eat = new Audio();

dead.src = 'audio/dead.mp3'
eat.src = 'audio/eat.mp3'

function createGrid() {
    //create 100 of these elements with a for loop
    for (let i=0; i<width*width; i++) {
    //create element
    const square = document.createElement('div');
    //add styling to the element
    square.classList.add('square');
    //put the element in the grid
    grid.appendChild(square);
    //put the element in squares array
    squares.push(square);
    }
}
//create the playing field
createGrid()
//create the snake
currentSnake.forEach(index => squares[index].classList.add('snake'));

function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0];
    score = 0;
    scoreDisplay.textContent = score;
    direction = 1;
    intervalTime = 1000;
    generateApple()
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    timerId = setInterval(move, intervalTime)
    gameOver.style.display = "none"
}

function move() {
    if(
        (currentSnake[0] + width >= width*width && direction === width) || //if snake hits bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake hits top
        //if snake hits itself
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
    return (
        clearInterval(timerId),
        gameOver.style.display = "block",
        finalScore.textContent = score,
        dead.play()
    )

pauseBtn.addEventListener('click', function() {
    clearInterval(timerId)
})

    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add('snake')

    if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        generateApple();
        score++;
        scoreDisplay.textContent = score;
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
        eat.play()
    }
}

move()

timerId = setInterval(move, intervalTime)

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}
generateApple()
// clearInterval(timerId)

function control(e) {
    if(e.keyCode === 39){
        console.log("right")
        direction = 1
    } else if (e.keyCode === 38) {
        console.log("up")
        direction = -width
    } else if (e.keyCode === 37) {
        console.log("left")
        direction = -1
    } else if (e.keyCode === 40) {
        console.log("down")
        direction = +width
    }
}
document.addEventListener('keyup', control)
startBtn.addEventListener('click', startGame)


upBtn.addEventListener('click', () =>  direction = -width)
downBtn.addEventListener('click', () =>  direction = +width)
leftBtn.addEventListener('click', () =>  direction = -1)
rightBtn.addEventListener('click', () =>  direction = 1)
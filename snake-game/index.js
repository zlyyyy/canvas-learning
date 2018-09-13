import './index.css'

const CANVAS_BACKGROUND_COLOR = '#fff'
const CANVAS_BORDER_COLOUR = '#000'
const SNAKE_BODY_COLOR = 'lightgreen'
const SNAKE_BODY_LINE_COLOR = 'darkgreen'
const LEFT_KEY = 37
const RIGHT_KEY = 39
const UP_KEY = 38
const DOWN_KEY = 40

const gameCavans = document.getElementById('gameCanvas')
const W = gameCavans.width
const H = gameCavans.height
const ctx = gameCavans.getContext('2d')
let dx = 10
let dy = 0
let changingDirection = false

let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 }
]

const changeDirection = function (event) {
  const keyPressed = event.keyCode
  const goingUp = dy === -10
  const goingDown = dy === 10
  const goingRight = dx === 10
  const goingLeft = dx === -10
  if (changingDirection) return
  changingDirection = true

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10
    dy = 0
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0
    dy = -10
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10
    dy = 0
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0
    dy = 10
  }
}

const initCanvas = function () {
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = CANVAS_BACKGROUND_COLOR
  ctx.strokeStyle = CANVAS_BORDER_COLOUR
  ctx.fillRect(0, 0, W, H)
  ctx.strokeRect(0, 0, W, H)
}

const advanceSnake = function (snake) {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy }
  snake.unshift(head)
  snake.pop()
}

const drawSnakePart = function (snakePark) {
  const { x, y } = snakePark
  ctx.fillStyle = SNAKE_BODY_COLOR
  ctx.strokeStyle = SNAKE_BODY_LINE_COLOR
  ctx.fillRect(x, y, 10, 10)
  ctx.strokeRect(x, y, 10, 10)
}
const drawSnake = function () {

  snake.forEach(drawSnakePart)
}

const start = function () {
  let timer = setTimeout(() => {
    changingDirection = false
    initCanvas()
    advanceSnake(snake)
    drawSnake()
    start()
  }, 100)
}

document.addEventListener('keydown', changeDirection)

start()
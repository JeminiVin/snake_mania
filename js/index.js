// game constraints
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio("../music/food.mp3");
const gameoverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/movement.mp3");
const musicbg = new Audio("../music/bgmusic.mp3");
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;

// game functions
function main(ctime) {
  window.requestAnimationFrame(main);
 // console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide(snake){
    // if you bumpinto yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if u bump into the wall    
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
              return true;
    }
        
    
}
function gameEngine() {
  // part 1 : updating the snake array & food
  if(isCollide(snakeArr)){
      gameoverSound.pause();
      musicbg.pause();
      inputDir = {x:0, y:0}
      snakeArr = [{x: 13, y: 15}];
    //  musicbg.pause()
      score = 0;
      alert("Game Over, Press any key to play again")

  } 
  musicbg.play()
  // if you have eaten the food , increment the score and regenerate 
  if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
      foodsound.play();
      score +=1;
      if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML = "high score: "+ hiscoreval;
      }
      scoreBox.innerHTML = "Score: " + score;
     snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
     let a = 2;
     let b = 16;
     food = {x: Math.round(a+(b-a)* Math.random()), y: Math.round(a+(b-a)* Math.random())}
  }

  // moving the snake
  for (let i = snakeArr.length-2; i>=0; i--) {
            snakeArr[i+1] = {...snakeArr[i]};   
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;


  // part 2 : render the snake and food
  //display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic starts here
let hiscore = localStorage.getItem('hiscore');
if(hiscore === null){
  let hiscoreval= 0;
  localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
}
else{
   hiscoreval = JSON.parse(hiscore)
   hiscoreBox.innerHTML = "high score:" + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 3 }; //starts the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;

      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
 
    case 'ArrowRight':
      console.log("ArrowRight")
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});

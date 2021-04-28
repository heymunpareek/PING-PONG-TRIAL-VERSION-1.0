var playerPaddle, computerPaddle;
var ballSprite, ballImg;
var topground, bottomground;
var upArrowImg, upArrow;
var downArrowImg, downArrow;
var startSprite, startImg;
var quitSprite, quitImg;
var instrSprite, instrImg;


PLAY = 1;
MID = 2;
MIDPLAY = 3;
END = 0;
INS = 4;
QUIT = 5;
var gs = PLAY;

//scoreCounter
var playerScore = 0;
var computerScore = 0;

function preload() {
  upArrowImg = loadImage("UP_ARROW.png");
  downArrowImg = loadImage("DOWN_ARROW.png");
  startImg = loadImage("startImg.png");
  quitImg = loadImage("quitImg.png");
  instrImg = loadImage("instr.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);


  computerPaddle = createSprite((1920/2048)*width, (504/1000)*height, (30/2048)*width,(150/1000)*height)
  computerPaddle.shapeColor = "black";
  computerPaddle.visible = false;
  
  
  playerPaddle = createSprite((125/2048)*width, (504/1000)*height, (30/2048)*width,(150/1000)*height)
  playerPaddle.shapeColor = "red";
  playerPaddle.visible = false;

  ballSprite = createSprite((1060/2048)*width, (Math.round(random(319,619))/1000)*height, 15,15)
  ballSprite.shapeColor = "orange";
  ballSprite.visible = false;
  ballSprite.velocityX = 0;
  ballSprite.velocityY = 0;
  
  
  ballSprite.velocityX = 0;
  ballSprite.velocityY = 0;
  
  topground = createSprite((1027/2048)*width, (75/1000)*height, (1900/2048)*width, (5/1000)*height);
  topground.visible = false;
  bottomground = createSprite((1027/2048)*width, (919/1000)*height, (1900/2048)*width, (5/1000)*height);
  bottomground.visible = false;

  upArrow = createSprite((700/2048)*width,(800/1000)*height,(175/2048)*width, (175/1000)*height);
  upArrow.visible = false;
  
  

  downArrow = createSprite((1400/2048)*width,(800/1000)*height,(175/2048)*width, (175/1000)*height);
  downArrow.visible = false;

  startSprite = createSprite((1060/2048)*width, (300/1000)*height, (300/2048)*width, (100/1000)*height);
  startSprite.addImage("startSprite", startImg);
  startSprite.scale = 0.5;

  instrSprite = createSprite((1060/2048)*width, (500/1000)*height, (300/2048)*width, (100/1000)*height);
  instrSprite.addImage("instrSprite", instrImg);
  instrSprite.scale = 0.45;


  quitSprite = createSprite((1060/2048)*width, (700/1000)*height, (300/2048)*width, (100/1000)*height);
  quitSprite.addImage("quitSprite", quitImg);
  quitSprite.scale = 0.43;
  
}

function draw() {
  background(0);

  if(gs === PLAY) {    
  displayButtons()
  }

  else if (gs === MID) {
    startSprite.visible = false;
    quitSprite.visible = false;
    instrSprite.visible = false;
    
      //call functions
  startGame();
  displaySprites();
  backr();
  borders();
  arrows();  
  controls();
  
  artificialIntelligence();
  collision();
  reset();
  gameFinish();
  
  computerPaddle.display();
  
  playerPaddle.display();

  push()
  textSize(40);
  fill("white");
  strokeWeight(1.5);
  stroke("white");
  text(playerScore, (970/2048)*width, (150/1000)*height);
  text(computerScore, (1102.5/2048)*width, (150/1000)*height);
  
  pop()


  
  }

  else if(gs === INS) {
    displayNothing();
    push()
    stroke("white");
    strokeWeight(3);
    rectMode(CENTER);
    rect(width/2, height/2, (2000/2048)*width, ((1000-48)/1000)*height);
    
    fill("white");
    strokeWeight(0.55);    
    textSize(30);
    textAlign(CENTER);
    text("How to play?", width/2, (65/1000)*height);
    textAlign(RIGHT);
    strokeWeight(0);
    textSize(20);
    text("There are 3 modes in this game. First - Single player mode, i.e., against the AI. Second - Multiplayer mode (in the local computer). Lastly, ", (1900/2048)*width, (170/1000)*height);
    pop()

  }

  else if(gs === QUIT) {
    displayNothing();
    push()
    textAlign(CENTER);
    fill("white");
    strokeWeight(1.5);
    textSize(32);
    text("LEAVING SO SOON!",(1024/2048)*width, (300/1000)*height);
    textSize(22);
    text("Press Home Button",(1024/2048)*width, (500/1000)*height)
    text("Or close the current window",(1024/2048)*width, (570/1000)*height)
    text("to exit",(1024/2048)*width, (650/1000)*height)
    
    pop()
  }

  else if(gs === END) {
    textAlign(CENTER);
    text("GAME OVER", width/2, height/2);
    displayNothing();
  }
  

  
  drawSprites();
}


function borders() {
  push();
  stroke("white")
  strokeWeight(5);
  //1st border
  line((85/2048)*width, (75/1000)*height, (85/2048)*width, (919/1000)*height);
  //2nd border
  line((85/2048)*width, (75/1000)*height, (1963/2048)*width, (75/1000)*height);
  //3rd Border
  line((1963/2048)*width, (75/1000)*height, (1963/2048)*width, (919/1000)*height);
  //4th border
  line((1963/2048)*width, (919/1000)*height, (85/2048)*width, (919/1000)*height);
  pop();

  //inner borders
  push();
  stroke(180)
  strokeWeight(3);

  //1st inner border
  line((85/2048)*width, (504/1000)*height, (1963/2048)*width, (504/1000)*height);


  //2nd inner border
  stroke("white");
  strokeWeight(5);
  line((1060/2048)*width, (75/1000)*height, (1060/2048)*width, (919/1000)*height);

  //scoreboard
  line((930/2048)*width, (175/1000)*height, (1185/2048)*width, (175/1000)*height);

  pop()

}

function backr() {
  
  push();
  fill(0,96,205);
  stroke(0,96,205);
  rectMode(CENTER);
  rect((1025/2048)*width,(498/1000)*height,(1873/2048)*width,(840/1000)*height);
  pop();

  push();
  textAlign(CENTER);
  fill("white");
  stroke("white");
  strokeWeight(0.5);
  textSize(15);
  text("Press Space to serve", (1060/2048)*width, (50/1000)*height)

  pop();
}

function arrows() {
  if(mousePressedOver(upArrow)) {
    tint(255,126)
  upArrow.addImage("upArrow", upArrowImg);  
  upArrow.scale = 0.35;
  
}
else if(mousePressedOver(downArrow)) {
  tint(255,126);
  downArrow.addImage("downArrow", downArrowImg);
  downArrow.scale = 0.35;
}
else {
  tint(255)
  upArrow.addImage("upArrow", upArrowImg);  
  upArrow.scale = 0.35;
  tint(255);
  downArrow.addImage("downArrow", downArrowImg);
  downArrow.scale = 0.35;
}
}

function controls() {
  if(mousePressedOver(upArrow) && playerPaddle.y> (160/1000)*height) {
    playerPaddle.y = playerPaddle.y - 10
  }
  else if (mousePressedOver(downArrow) && (830/1000)*height > playerPaddle.y ) {
    playerPaddle.y = playerPaddle.y +10;
  }
  else if (keyDown("up") && playerPaddle.y> (160/1000)*height) {
    playerPaddle.y = playerPaddle.y - 10
  }
  else if(keyDown("down") && (830/1000)*height > playerPaddle.y ) {
    playerPaddle.y = playerPaddle.y +10;
  }
}



function artificialIntelligence() {
  computerPaddle.y = ballSprite.y;
}

function collision() {
  ballSprite.bounceOff(playerPaddle);
  ballSprite.bounceOff(computerPaddle);
  ballSprite.bounceOff(topground);
  ballSprite.bounceOff(bottomground);
}

function reset() {
  if(ballSprite.x < 0) {
    ballSprite.x = (1060/2048)*width;
    ballSprite.velocityX = 0;
    ballSprite.y = (Math.round(random(319,619))/1000)*height;
    ballSprite.velocityY = 0;
    computerScore = computerScore + 1;
  }
  else if(ballSprite.x > (1963/2048)*width) {
    ballSprite.x = (1060/2048)*width;
    ballSprite.y = (Math.round(random(319,619))/1000)*height;
    playerScore = playerScore+1;
    ballSprite.velocityX = 0;
    ballSprite.velocityY = 0;
  }
}

function displayButtons() {
  if(mousePressedOver(startSprite)) {
    gs = MID;
  }
  else if (mousePressedOver(instrSprite)) {
    gs = INS;
  }
  else if(mousePressedOver(quitSprite)) {
    gs = QUIT;
  }
}

function displaySprites() {
  computerPaddle.visible = true;
  playerPaddle.visible = true;
  ballSprite.visible = true;
  upArrow.visible = true;
  downArrow.visible = true;
  
}
function startGame() {  
  if(keyDown("space") && ballSprite.velocityX === 0 && ballSprite.velocityY === 0) {
    ballSprite.velocityX = Math.round(random(7,9));
    ballSprite.velocityY = Math.round(random(5,9));
  }
}

function gameFinish() {
  if(computerScore === 11) {
    gs = END;
  }
}

function displayNothing() {
  computerPaddle.visible = false;
  playerPaddle.visible = false;
  ballSprite.visible = false;
  upArrow.visible = false;
  downArrow.visible = false;
  startSprite.visible = false;
  quitSprite.visible = false;
  instrSprite.visible = false;
  
}







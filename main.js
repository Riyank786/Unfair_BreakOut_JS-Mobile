// HERE WE GO
// GETTING THE CANVAS ELEMENT

const cvs=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

// Game Constants ans variables 
const BG_IMG=new Image();
BG_IMG.src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxrP-yhHJ6KDkaNCeA686dvT4XCAvNxIgIlw&usqp=CAU";

let LIVES = 5;
let SCORE =0;
let LEVELS =1;
let retry =false;
let leftArrow=false;
let rightArrow=false;
let GAME_OVER =false;
const BALL_RADIUS=3;
const MAX_LEVELS=15;
const SCORE_UNIT =10;
const PADDLE_WIDTH=50;
const PADDLE_HEIGHT=3;
const PADDLE_MARGIN_BOTTOM=3;

// list of levels 
let listOfLevels=[/*0*/"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ2wha2wLdSSXqt3Czs5jcUqQNr0puiWb9Cjg&usqp=CAU", /*1*/"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1cfK_rdyvPLzhJQaFwrNQBPYQYrV0g6Y38w&usqp=CAU", /*2*/"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSsa6vbKQa6NLKLxk-a-MWIqSBBLZ72S-t5ig&usqp=CAU", /*3*/"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRC1zyVblcmSWaJkSdhe4jLjNJuKiIQeS7dBg&usqp=CAU", /*4*/"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX0AQkUwjOnsggEjj9I4vX1MibktolZZIB1tc6NfTyfM09ZZQ&s", /*5*/"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS_ULY6rkLaVzkkYn6Q5JgBYh0aJHJ_jeLrKg&usqp=CAU", /*6*/"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgG3QhsI7oiZ5BR-NCOLnTtlnwWjbK0y2uzQ&usqp=CAU", /*7*/"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmQ-UuP1UsSOJuDbbGyMbM0JcHuE-DaF0WlQ&usqp=CAU", /*8*/"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpDncxcj-cJ7-19Gdh1hD_WMNy7us4h7ApMxT-OmmTdfGalx8&s", /*9*/"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0T8VrYDw0kxXqKPbvxlxcFAv2xRPyF5iqoWCowjiAsVYu-VWr&s", /*10*/"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyA4x5dTZQNtubC18Pq7ctCC3nHdAyOUhIA1bYBfDKPZYLm98&s", /*11*/ "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuGLDGpU_KLA6AjVf5pgH0v55xR7MhuNQRNCVlp9IxiZu1l13N&s",/*12*/"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQry4Yz0VXHG4sl5Eiq3SQ4cgTt4U7pSy4TtijLbErWhXc_g_I&s",/*13*/"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxvQjgO49iMEbvMPC_rNuZNM0GOKg7aOtfCg&usqp=CAU"]
// create paddle object
const paddle={
    x:cvs.width/2-PADDLE_WIDTH/2, 
y:cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT, 
    width:PADDLE_WIDTH, 
    height:PADDLE_HEIGHT, 
    dx:5, 
    color:"blue"
}

// move paddle function
function movePaddle(){
    if(LEVELS>5){
        paddle.dx=10;
    }
    if(LEVELS>10){
        paddle.dx=15;
    }
    if(leftArrow && paddle.x>0){
        paddle.x-=paddle.dx
    }
    else if(rightArrow && paddle.x+paddle.width<cvs.width){
        paddle.x+=paddle.dx
    }
}

const ball={
    x:cvs.width/2, 
    y:paddle.y-BALL_RADIUS, 
    radius:BALL_RADIUS, 
    speed:2.7, 
    dx:2*(Math.random()*2-1), 
    dy:-2, 
    color:"white"
}

// drawing the ball
function drawBall(){
    ctx.beginPath();
  ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,false);
    ctx.fillStyle=ball.color;
    ctx.fill();
    ctx.closePath();
}
// draw the paddle 
function drawPaddle(){
    if(LEVELS>=5){
        paddle.width=75;
        paddle.color="orange";
    }
    if(LEVELS>=10){
        paddle.width=100;
        paddle.color="yellow";
    }
   ctx.fillStyle=paddle.color;   
ctx.fillRect(paddle.x,paddle.y,paddle.width,paddle.height);
}

// move ball
function moveBall(){
    ball.x+=ball.dx;
    ball.y+=ball.dy;
}

// reset the ball after out
function resetBall(){
    ball.x=cvs.width/2; 
    ball.y=paddle.y-BALL_RADIUS; 
    ball.dx=2*(Math.random()*2-1);
    ball.dy=-2;
}

function ballPaddleCollision(){
    if(ball.x<paddle.x+paddle.width && ball.x>paddle.x && paddle.y<paddle.y+paddle.height && ball.y+ball.radius >paddle.y){
    //check whether the ball hit the paddle 
    let collidePoint = ball.x-(paddle.x+paddle.width/2);
    //normalise the value
    collidePoint=collidePoint/(paddle.width/2);
    //calculate the angle of fhe ball 
   let angle=collidePoint*Math.PI/3;
    
        ball.dx=ball.speed * Math.sin(angle);
        ball.dy=-ball.speed * Math.cos(angle);
      playpaddleSound();
    }
}

// create the bricks object
const brick={
    row:1, 
    column:7, 
    width:40, 
    height:3, 
    offSetLeft:2.5, 
    offSetTop:1, 
    marginTop:10,
    color:"lightgreen"
}

let bricks=[];
function createBricks(){
    for(let r=0;r<brick.row;r++){
    bricks[r]=[];
        for(let c=0;c<brick.column;c++){
        bricks[r][c]={
            x:c*(brick.offSetLeft+brick.width)+brick.offSetLeft, 
            y:r*(brick.offSetTop+brick.height)+brick.offSetTop+brick.marginTop, 
            status:true
        }
        }
    }
}
createBricks();

// draw bricks function
function drawBricks(){
    for(let r=0;r<brick.row;r++){
        for(let c=0;c<brick.column;c++){
let b=bricks[r][c];
if(b.status){
    if(r<=4){
    ctx.fillStyle ="red";    
    }
    else if(r<=8){
     ctx.fillStyle ="orange";    
    }
    else if(r<=11){
     ctx.fillStyle ="lightgreen";    
    }
    else if(r<=13){
     ctx.fillStyle ="yellow";    
    }
    else if(r<=14){
     ctx.fillStyle ="white";    
    }
    
    ctx.fillRect(b.x,b.y,brick.width,brick.height );
}
        }
    }
}

// ball brick collision 
function ballBrickCollisio(){
    for(let r=0;r<brick.row;r++){
        for(let c=0;c<brick.column;c++){
let b=bricks[r][c];
    if(b.status){
        if(ball.x+ball.radius>b.x && ball.x-ball.radius<b.x+brick.width && ball.y+ball.radius>b.y && ball.y-ball.radius<b.y+brick.height){
            ball.dy=-ball.dy;
            b.status=false; //the brick is broken
            SCORE+=SCORE_UNIT;
           playBrickSound();
        }
        
    }
    }
}
}

// Games status function
function showGameStats(text,textX,textY){
// fill text
    ctx.fillStyle="#FFF";
    ctx.font="9px Impact, Charcoal, sans-serif";
    ctx.fillText(text,textX,textY);
}
// draw function 
function draw(){
drawPaddle(); 
 drawBall() ;
 drawBricks();
//  show score
showGameStats("⭐ "+SCORE,10,9);
// show lives
showGameStats("❤  "+LIVES,cvs.width-50,9);
// show levels
showGameStats("🚩  "+LEVELS,cvs.width/2-12,9);
}
// ball wall collision function 
function ballWallCollision(){
    if(ball.x+ball.radius>cvs.width || ball.x-ball.radius<0)
    {
        ball.dx=-ball.dx;
    }
    if(ball.y-ball.radius<0){
       ball.dy=-ball.dy;
   }
  if(ball.y+ball.radius>cvs.height){
      LIVES--;
     if(LIVES>0){
      playOutSound();} 
      resetBall();
      resetPaddle();
  }
    
}
// game over function
function gameOver(){
    if(LIVES<=0){
        GAME_OVER=true;
        playGameOverSound();
document.getElementById("out-box").style.display="flex";
document.getElementById("Fscore").innerHTML=SCORE;
        if(retry){
            resetGame();
        }
    }
}

// level up function
function levelUp(){
    let isLevelDone=true;
    for(let r=0;r<brick.row;r++){
        for(let c=0;c<brick.column;c++){
 isLevelDone = isLevelDone && !bricks[r][c].status;
    }
}
    if(isLevelDone){
        if(LEVELS>=MAX_LEVELS){
            GAME_OVER =true;
            return;
        }
        brick.row++;
        createBricks();
        if(LEVELS<=5){
        ball.speed+=0.2;}
        else if(LEVELS<=10){
        ball.speed+=0.1;
        }
        else if(LEVELS<=15){
        ball.speed+=0.05;
        }
        if(LEVELS>7){
            ball.radius=4;
        }
        if(LIVES<5){
            LIVES++;
        }
        resetBall();
        LEVELS++;
        playLevelUpSound();
        resetPaddle();
        switch(LEVELS) {
  case 2:
    BG_IMG.src=listOfLevels[0];
    break;
    case 3:
    BG_IMG.src=listOfLevels[1];
    break;
  case 4:
   BG_IMG.src=listOfLevels[2];
ball.color="black";
    break;
    case 5:
   BG_IMG.src=listOfLevels[3];
ball.color="red";
    break;
    case 6:
   BG_IMG.src=listOfLevels[4];
ball.color="white";
    break;
    case 7:
   BG_IMG.src=listOfLevels[5];
ball.color="blue";
    break;
    case 8:
   BG_IMG.src=listOfLevels[6];
ball.color="blue";
    break;
    case 9:
   BG_IMG.src=listOfLevels[7];
ball.color="orange";
    break;
    case 10:
   BG_IMG.src=listOfLevels[8];
ball.color="brown";
    break;
    case 11:
   BG_IMG.src=listOfLevels[9];
ball.color="lightgreen";
    break;
    case 12:
   BG_IMG.src=listOfLevels[10];
ball.color="lightgreen";
    break;
    case 13:
   BG_IMG.src=listOfLevels[11];
ball.color="yellow";
    break;
    case 14:
   BG_IMG.src=listOfLevels[12];
ball.color="white";
    break;
    case 15:
   BG_IMG.src=listOfLevels[13];
ball.color="white";
    break;
  default:
  BG_IMG.src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxrP-yhHJ6KDkaNCeA686dvT4XCAvNxIgIlw&usqp=CAU";
}
        
    }
}
// update game function 
function update(){
   movePaddle()
   moveBall();
   ballWallCollision();
   ballPaddleCollision();
   ballBrickCollisio();
   gameOver();
   levelUp();
}
// loop function for game looping
function loop(){


// controll the paddle
let gameLevel=document.getElementById("gameLevel");
if(gameLevel.value=="Beginner"){
let btnL=document.getElementById("btnL");
let btnR=document.getElementById("btnR");

btnL.ontouchstart=()=>{
    leftArrow=true;
}
btnL.ontouchend=()=>{
    leftArrow=false;
}
btnR.ontouchstart=()=>{
    rightArrow=true;
}
btnR.ontouchend=()=>{
    rightArrow=false;
}
}
else if(gameLevel.value=="Expert"){
let btnL=document.getElementById("btnR");
let btnR=document.getElementById("btnL");

btnL.ontouchstart=()=>{
    leftArrow=true;
}
btnL.ontouchend=()=>{
    leftArrow=false;
}
btnR.ontouchstart=()=>{
    rightArrow=true;
}
btnR.ontouchend=()=>{
    rightArrow=false;
}    
    
}
    ctx.drawImage(BG_IMG,0,0)
    draw();
    update();
    if(!GAME_OVER){
    requestAnimationFrame(loop);
    }
    
}

function playpaddleSound(){
let paddleSound=document.getElementById("paddleSound");
    if(sound.innerHTML==soundOn)
    paddleSound.play();
}

function playBrickSound(){
let brickSound=document.getElementById("brickSound");
    if(sound.innerHTML==soundOn)
    brickSound.play();
}
function playLevelUpSound(){
let levelUpSound=document.getElementById("levelUpSound");
    if(sound.innerHTML==soundOn)
    levelUpSound.play();
}
function playOutSound(){
let outSound=document.getElementById("outSound");
    if(sound.innerHTML==soundOn)
    outSound.play();
}
function playGameOverSound(){
        let gameOverSound=document.getElementById("gameOverSound");
if(sound.innerHTML==soundOn)        
gameOverSound.play();
}
function resetPaddle(){
    paddle.x=cvs.width/2-PADDLE_WIDTH/2; 
paddle.y=cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT;
    paddle.width=PADDLE_WIDTH; 
    paddle.height=PADDLE_HEIGHT;
    paddle.dx=5;
    paddle.color="blue";
}
function resetGame(){
SCORE=0;
LEVELS=1;
LIVES=5;
brick.row=1;
brick.column=7;
for(let r=0;r<brick.row;r++){
    for(let c=0;c<brick.column;c++){
        let b=bricks[r][c];
        b.status=true;
        if(b.status){
    ctx.fillStyle =brick.color;
    ctx.fillRect(b.x,b.y,brick.width,brick.height );
}
        }
    }
ball.speed=2.7;
ball.color="white"
resetBall();
resetPaddle();
BG_IMG.src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxrP-yhHJ6KDkaNCeA686dvT4XCAvNxIgIlw&usqp=CAU";
}
let restart=document.getElementById("restart");
restart.addEventListener("click",()=>{
document.getElementById("out-box").style.display="none";
resetGame();
GAME_OVER=false;
goto:loop();
})
let home=document.getElementById("home");
home.addEventListener("click",()=>{
document.getElementById("out-box").style.display="none";
document.getElementById("gameArea").style.display="none";
document.getElementById("startPage").style.display="flex";
resetGame();
})
// go home function 

// start game function 
function start(){
GAME_OVER =false;
document.getElementById("startPage").style.display="none";
document.getElementById("gameArea").style.display="flex";
loop();
}
let closeSettingbtn=document.getElementById ("closeSettings");
closeSettingbtn.addEventListener("click",function closeSettings(){
document.getElementById("settings").style.display="none";
})
function openSettings(){
document.getElementById("settings").style.display="flex";    
}
function closeAbout(){
document.getElementById("about-Us").style.display="none";
}
function openAbout(){
document.getElementById("about-Us").style.display="flex";    
}

var soundOn='<i class="fa fa-volume-up" aria-hidden="true"></i>'
var soundOff='<i class="fa fa-volume-off" aria-hidden="true"></i>'
var sound=document.getElementById("sound");
function soundOnOff(){
    if(sound.innerHTML!=soundOn){
        sound.innerHTML=soundOn;
    }
    else{
        sound.innerHTML=soundOff;
    }
}
window.onload=()=>{
sound.innerHTML=soundOn;
}
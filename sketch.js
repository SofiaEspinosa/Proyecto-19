var path,mainCyclist;
var player1;
var pathImg,cyclistImg1,cyclistImg2;

var opp1Img,opp2Img;
var gameOverImg;

var pinkCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;



function preload(){
    pathImg = loadImage("Road.png");
    cyclistImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
    cyclistImg2= loadAnimation("mainPlayer3.png");
    
    opp1Img = loadAnimation("opponent1.png","opponent2.png");
    opp2Img = loadAnimation("opponent3.png");
   
    gameOverImg = loadImage("gameOver.png");
}

function setup() {
    createCanvas(600,600);

    path=createSprite(100,150);
    path.addImage(pathImg);
    path.velocityX=-3

mainCyclist=createSprite(60,150)
mainCyclist.addAnimation(cyclistImg1);
mainCyclist.scale=0.07;
mainCyclist.setCollider("rectangle",0,0,40,40);

gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale= 0.8;
gameOver.visible= false;  

pinkCG= new Group();
}

function draw() {
    background(0);
  
    drawSprites();
    textSize(20);
    fill(255);
    text("Distancia: "+ distance,900,30);
    
    if(gameState===PLAY){
      
     distance = distance + Math.round(getFrameRate()/50);
     path.velocityX = -(6 + 2*distance/150);
    
     mainCyclist.y = World.mouseY;
    
     edges= createEdgeSprites();
     mainCyclist .collide(edges); 

     if(path.x < 0 ){
        path.x = width/2;
    }
 }
    
    if(pinkCG.isTouching(mainCyclist)){
        gameState = END;
        player1.velocityY = 0;
        player1.addAnimation("opponentPlayer1",oppPink2Img);
       }
    }

if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Presiona espacio para reiniciar el juego", 500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);

    if(keyDown("space")) {
        reset();
      }
 }

function pinkCyclists(){
    player1 =createSprite(1100,Math.round(random(50, 250)));
    player1.scale =0.06;
    player1.velocityX = -(6 + 2*distance/150);
    player1.addAnimation("opponentPlayer1",oppPink1Img);
    player1.setLifetime=170;
    pinkCG.add(player1);
}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    mainCyclist.addAnimation("SahilRunning",cyclistImg1);
    
    pinkCG.destroyEach();
    yellowCG.destroyEach();
    redCG.destroyEach();
    
    distance = 0;
   }
  




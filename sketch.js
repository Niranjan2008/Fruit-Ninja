//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

var knife, knifeImage;
var knifeImage, fruit1, fruit2, fruit3, fruit4, monster, monsterImage;
var gameoverSound, gameOver, gameoverImage, fruit, knifeSound;


function preload() {

  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameoverImage = loadImage("gameover.png");
  gameoverSound = loadSound("gameover.mp3");
  knifeSound = loadSound("knifeSwoosh.mp3");


}

function setup() {
  createCanvas(600, 600);

  //creating sword
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.addImage("gameover", gameoverImage)
  knife.scale = 0.7




  //set collider for sword
  knife.setCollider("rectangle", 0, 0, 40, 40);

  score = 0;
  //create fruit and monster Group variable here
  fruitGroup = createGroup();
  monsterGroup = createGroup();
}

function draw() {
  background("lightblue");

  if (gameState === PLAY) {

    fruits();
    Monster();

    // Move knife with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;

    // Increase score if knife touching fruit
    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach();
      score = score + 2
      knifeSound.play();
    }

    // Go to end state if knife touching enemy

  }
  if (monsterGroup.isTouching(knife)) {
    gameState = END;
    gameoverSound.play();

    fruitGroup.destroyEach();
    monsterGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    monsterGroup.setVelocityXEach(0);
    //change the image to gameover
    knife.changeImage("gameover", gameoverImage);
    knife.x = 300;
    knife.y = 300;

  }

  drawSprites();

  //Display score
  textSize(25);
  text("Score : " + score, 250, 50);


}

function fruits() {
  if (World.frameCount % 80 === 0) {
    position = Math.round(random(1, 2));

    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    if (position == 1) {
      fruit.x = 600
      fruit.velocityX = -(7 + (score / 4));
    } else if (position == 2) {
      fruit.x = 0
      fruit.velocityX = 7 + (score / 4);
    }


    fruit.setLifetime = 100;

    fruitGroup.add(fruit);
  }

}

function Monster() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100, 600));
    monster.velocityX = -(8 + (score / 10));
    monster.setLifetime = 50;

    monsterGroup.add(monster);
  }
}
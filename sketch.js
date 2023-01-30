let canvas;
let button;
let button2;
let button3;

let food = [];
let foodLimit = 2;

let hungry = 0;
let full = 1;
let tamaState = hungry;

let tamaX;
let tamaY;
let tamaDiam;

let particle = [];

let cleanState = 0;

let myShape;
let counter;

class Particle{
  constructor(_x,_y){
    this.acceleration = createVector(0,0.05);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.position = createVector(_x,_y);
    this.lifespan = 255;
  }

  update(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }

  display(){
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
  }

  isDead(){
    return this.lifespan<0;
  }
}

function setup() {

  canvas = createCanvas(600, 600);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element
  
  myShape = {
  x: width/2,
  y: -25,
  w: 40,
  h: 40
}

  tamaX = width/2;
  tamaY = height/2;
  tamaDiam = width/6;
  feeding = false;
   for(let i=0;i<50;i++){
  let p = new Particle(width / 2, 50);
   particle.push(p);
 }
  addGUI();

  counter=0;
}

function draw() {
  background(200,200,250);
  
  //Drawing
  noStroke();

  
  if(cleanState == 1){
    for(let i=0;i<particle.length-1;i++){
particle[i].display();
particle[i].update();
 
}
cleanState =0; 
}
  
 if(tamaState == hungry){
    fill(255);
    if(tamaDiam > width/4){
      tamaState = full;
    }
  }else if(tamaState == full){
    fill(0,255,0);
    if(tamaDiam > width/6){
      if(frameCount % 2 == 0) tamaDiam--; // reduce every second frame
    }else{
      tamaState = hungry;
    }
  }


  if(myShape.y == tamaY-tamaDiam/2){
    fill(255,255,0);
  }

  if(cleanState ==0){
    fill(255-counter);
    }
      
  circle(tamaX,tamaY,tamaDiam);
  fill(0);
  let mouthOffset = tamaDiam/2;
  rect(tamaX-mouthOffset/2,tamaY,mouthOffset,3);

  updateFood();//update and draw food

  if(food.length > 0 && tamaState == hungry){
    eatFood();
  } 
  
  if(food.length <= foodLimit-1){
    button.html("FEED");
    button.removeClass("inactive");
  }


  noStroke();
  fill(255, 0, 0);
  ellipse(myShape.x, myShape.y, myShape.w, myShape.h);

  counter+=0.05;

}
function eatFood(){
for(let i = food.length-1; i >= 0 ; i--){
    let distanceY =  tamaY - food[i].y;

    if(food[i].y > tamaX){
      fill(0);
      circle(tamaX,tamaY,tamaDiam/2);
    }

    if(abs(distanceY) < 10){
      tamaDiam += food[food.length-1].d;
      food.splice(i,1);
    }
  }
}

function updateFood(){
  for(let i = food.length-1; i >= 0 ; i--){
    fill(100);
    circle(food[i].x,food[i].y,food[i].d);
    food[i].y -= 1;
    if(food[i].y < 0){
      food.splice(i,1);//remove one from array at index i
    }
  }
}

function addGUI()
{

   //add a button
  button = createButton("FEED");

  button.addClass("button");

  //Add the play button to the parent gui HTML element
  button.parent("gui-container");
  
  //Adding a mouse pressed event listener to the button 
  button.mousePressed(handleButtonPress); 

  button2 = createButton("Play");
  button2.addClass("button");
  button2.parent("gui-container");
  button2.mousePressed(playButtonPressed); 

  button3 = createButton("CLEAN");
  button3.parent("gui-container");
  button3.addClass("button");
  button3.mousePressed(cleanButtonPress);

  


}
function addPlay(){
  p5.tween.manager.addTween(myShape, 'tween1')
  .addMotions([
    { key: 'y', target: tamaY-tamaDiam/2 },
    { key: 'w', target: 30 },
    { key: 'h', target: 80 },
  ], 600, 'easeInQuad')
  .addMotions([
      { key: 'w', target: 100 },
      { key: 'h', target: 10 },
    ], 120)
  .addMotions([
      { key: 'w', target: 10 },
      { key: 'h', target: 100 },
    ], 100)
  .addMotions([
      { key: 'w', target: 50 },
      { key: 'h', target: 50 },
      { key: 'y', target: -50 }
   ], 500, 'easeOutQuad')
   .startTween(); //replace this with .startTween() to just play once

}

//state
function handleButtonPress(){
     if(food.length <= foodLimit-1){
      food.push({
          x:width/2,
          y:height,
          d:random(10,40)
        });
    }
    
    if(food.length > foodLimit-1){
      button.html("FEEDING");
      button.addClass("inactive");
    }
}

function playButtonPressed(){
/*
    if(tween.isPaused){
      tween.resume();
    } else {
      tween.pause();
    }    
    */
   addPlay();
    if(playState == interesting){
      playState = boring; 
    }else{
      playState = interesting;
    }
}

function cleanButtonPress(){
cleanState =1;
counter =0;
}


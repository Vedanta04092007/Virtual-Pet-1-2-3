//Create variables here
var dog,happyDog;
var database;
var foodS,foodstock;
var foodObj;
var lastFed,fedTime;
var feedPetbutton;
var addFoodbutton;
var gameState = 0;
var bedroompic, gardenpic, washroompic;

function preload()
{
  //load images here
  DogImg = loadImage("images/dogImg.png");
  DoghappyImg = loadImage("images/dogImg1.png");
  bedroompic = loadImage("Bed Room.png");
  gardenpic = loadImage("Garden.png");
  washroompic = loadImage("Wash Room.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(200 ,200 , 50 , 50);
  dog.addImage(DogImg);
gameState.update('gameState');
readState = database.ref('gameState');
readState.on("value", function(data){
  gameState = data.val();  
})
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
 feedPetbutton = createButton("Feed the Dog");
 feedPetbutton .position(700,95);
 feedPetbutton.mousePressed(feedDog);


 addFoodbutton = createButton("Add Food");
 addFoodbutton.position(800,95);
 addFoodbutton.mousePressed(addFoods);
  
}


function draw() {  
background(46,139,87);
fill(255,255,254);
textSize(15);
fedTime = database.ref('FeedTime');
fedTime.on("value", function(data){
  lastFed = data.val();
});
if(lastFed>=12){
  text( "Last Feed :"+lastFed%12 + " PM" , 350,30);

}else if (lastFed==0){
  text(" Last Feed : 12AM",350,30);

}else{
  text( "Last Feed : "+ lastFed + " AM", 350,30);
}

currentTime = hour();
if(currentTime===(lastFed+1)){
  update("Playing");
  foodObj.garden();
}else if(currentTime===(lastFed+2)){
  update("Sleeping");
  foodObj.bedroom();
  }else if (currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry")
    foodObj . display();
  }
display();

  drawSprites();
  

}
//function to read values from DB.
function readStock(data){
  foodS = data.val();
}
//function to write values in DB
function writeStock(x){
  if(x<=0){
x=0;
  }else{
    x = x-1;
  }
  database.ref('/').update({

  })
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(DoghappyImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()

  })
}
function update(state){
  database.ref('/').update({
gameState:state
  });
}

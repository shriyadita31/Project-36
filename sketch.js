//Create variables here
var dog,dog1,happyDog;
var database,foodS,foodStock,foodimage,add,feed;




function preload()
{
	//load images here
  dog1 = loadImage("dog.png");
  happyDog = loadImage("happy dog.png");
  
}




function setup() {
	createCanvas(500, 500);

  dog = createSprite(250,380);
  dog.addImage(dog1);
  dog.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  add = createButton("ADD FOOD");
  add.position(400,140);
  add.mousePressed(addStock);

  foodimage = new Food();

  feed = createButton("FEED");
  feed.position(340,140);
  feed.mousePressed(deductStock);
}





function draw() { 
  if(foodS === undefined && frameCount >60){
    textSize(30);
    text("Reload the page",10,50);
  }
  
   
  if(foodS != undefined){
  background(46,139,87);

drawSprites();
  //add styles here

  fill(255);
  textSize(25);
  stroke(255,0,0);
  text("Bottles remaining: "+foodS,10,120);
  fill(11,230,219);
 
  
  foodimage.display();
  }
}





function readStock(data){

foodS = data.val();
foodimage.getStock(foodS);
}




function deductStock(){

  if(foodS<= 0.1){
    foodS = 0;
  } else if(foodS>=0){
    foodS = foodS-1;
  }
  dog.addImage(happyDog);

  database.ref("/").update({
    food: foodS
  })
}





function addStock(){

  if(foodS>=0 && foodS<20){
    foodS = foodS+1;
  }
  
dog.addImage(dog1);
  database.ref("/").update({
    food: foodS
  })
}
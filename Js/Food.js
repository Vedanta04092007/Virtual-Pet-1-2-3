class Food {
constructor(){
    this.FoodStock =0;
    this.lastFed =0;
    this.image = loadImage("Project-35 Image.png");
}

getFoodStock(){

}
updateFoodStock(){

}
 deductFood(){

 }
 bedroom(){
     background(bedroom,550,500);

 }

 garden(){
     background(garden,550,500);

 }
 washroom(){
     background(washroon,550,500);
 }
display(){
    var x=80,y=100;

    imageMode(CENTRE);
    image(this.image,720,220,70,70);

    if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
            if(i%10==0){
                x=80;
                y=y+50;
            }
            this.image(this.image,x,y,50,50);
            x=x+30
        }
    }
}

};
var data = [];
var m=1;var b=0;

function setup(){
  createCanvas(800,800);
  background(51);
}

function drawLine(){
  var x1 = 0;
  var y1 = m * x1 + b;
  var x2 = 1;
  var y2 = m * x2 + b;

  x1=map(x1, 0,1, 0,width);
  y1=map(y1, 0,1, height,0);
  x2=map(x2, 0,1, 0,width);
  y2=map(y2, 0,1, height,0);
  
  stroke(255,0,255);
  line(x1,y1, x2,y2);
}

function gradient_descent(){

}

// function linear_regression(){  
//   // xbar lib
//   var sumx=0;
//   var xbar=0;
//   var sumy=0;
//   var ybar=0;
//   for(let i=0;i<data.length;i++){
//     sumx+=data[i].x;
//     sumy+=data[i].y;
//   }
//   xbar=sumx/data.length;
//   ybar=sumy/data.length;

//   var Sxy=0;
//   var Sxx=0;
//   for(let i=0;i<data.length;i++){
//     Sxy+=(data[i].x-xbar)*(data[i].y-ybar);
//     Sxx+=(data[i].x-xbar)*(data[i].x-xbar);
//   }
//   m=Sxy/Sxx;  //  be careful of Sxx = 0 whenall the x vals are the same.

//   b=ybar - m*xbar;
// }

function draw(){
  background(51);

  drawLine();

  if(mouseIsPressed){
    var x = map(mouseX, 0,width, 0,1);
    var y = map(mouseY, 0,height, 1,0);
    var pt = createVector(x,y);
    data.push(pt);
    linear_regression();
  }

  for(let i=0;i<data.length;i++){
    var x=map(data[i].x, 0,1, 0,width);
    var y=map(data[i].y, 0,1, height,0);
    fill(255);
    stroke(255);
    ellipse(x,y, 8,8);
  }
}
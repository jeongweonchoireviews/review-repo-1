float f(float x){ return 0.3*x + 0.2; }

class Point{
  float x, y; int bias, label;
  //the bias is common, could be instantiated at initialise 
  Point(){ x=random(-1,1);y=random(-1,1);bias=1;
    if(f(x)>y) label=1; else label=-1;
  }
  
  Point(float x, float y){ this.x=x;this.y=y;bias=1; }
  
  float getx(){ return map(x, -1,1, 0,width); }
  float gety(){ return map(y, -1,1, height,0); }
  
  void show(){
    float p_x=getx(); float p_y=gety();
    stroke(0);
    if(label==1) fill(255);
    else fill(0);
    ellipse(p_x,p_y,30,30);
  }
}

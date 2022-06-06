Perceptron brain;
Point[] points=new Point[100];
int mp=0;
void setup() {
  size(800,800);

  brain=new Perceptron(3);
  
  for(int i=0;i<points.length;i++){points[i]=new Point();}
}

void draw() {
  background(255);
  stroke(0); 
  
  Point p1=new Point(-1,f(-1));
  Point p2=new Point(1,f(1));
  line(p1.getx(),p1.gety(), p2.getx(),p2.gety()); 
  
  Point p3=new Point(-1,brain.guessy(-1));
  Point p4=new Point(1,brain.guessy(1));
  line(p3.getx(),p3.gety(), p4.getx(),p4.gety()); 
  
  for(Point p:points){ p.show(); }
  
  print("FIRST<"+brain.weights[0]+","+brain.weights[1]+">\n");
  
  for(Point p:points){ 
    float[] inputs={p.x,p.y,p.bias};
    int target=p.label;
    //brain.learn(inputs, target);  // commenting this line out will apply the initial weihts to all guesses, this may result in a fully corret set of guesses.
    print("<"+brain.weights[0]+","+brain.weights[1]+","+brain.weights[2]+">\n");
    
    int guess=brain.guess(inputs);
    if(guess==target) fill(0,255,0);
    else fill(255,0,0);
    noStroke(); ellipse(p.getx(),p.gety(), 10,10);
    
  }
  //noLoop();
}

void mousePressed(){ mp++;
  print("train on all points\n");
  for(Point p:points){ 
    float[] inputs={p.x,p.y,p.bias};
    int target=p.label;
    brain.learn(inputs, target);  // commenting this line out will apply the initial weihts to all guesses, this may result in a fully corret set of guesses.
    print("training<"+"("+mp+")"+brain.weights[0]+","+brain.weights[1]+","+brain.weights[2]+">\n");
  }
}

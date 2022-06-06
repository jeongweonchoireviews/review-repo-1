class Point{
  Point(x,y){ this.x=x; this.y=y; }
}

let xs = []; let ys = [];
let no_ps = 3; let p = [];

//  POLYNOMIAL COFACTORS
let m, b;

const learning_rate = 0.2;
const optimiser = tf.train.sgd(learning_rate);

function setup(){ createCanvas(800,800);
  for(let i=0;i<no_ps;i++){ p[i] = createP();
    p[i].style('font-size', '15px');
    p[i].position(810, 17*i);
  }

  m = tf.variable(tf.scalar(random(1)));
  b = tf.variable(tf.scalar(random(1)));
  // documented
  // tf.scalar(Math.random()).variable();
}

function loss(pred, labels){ return pred.sub(labels).square().mean(); }

function predict(x){ const tx = tf.tensor1d(x);
  let ty = tx.mul(m).add(b); return ty;
}

function train(cycles){
  for(let i=0;i<cycles;i++){ 
    optimiser.minimize(() => loss(predict(xs), tf.tensor1d(ys)));
  }
}

function drawLine(){
  const lineX = [0, 1];  //  unscaled dimension
  const line_ys = predict(lineX);  //  assigns tensor1d to line_ys, must be const
  let lineY = line_ys.dataSync(); line_ys.dispose();

  let x1 = map(lineX[0], 0,1, 0,width); let y1 = map(lineY[0], 0,1, height,0);
  let x2 = map(lineX[1], 0,1, 0,width); let y2 = map(lineY[1], 0,1, height,0);  
  p[2].html("x1: "+x1+", x2: "+x2+", y1: "+round(y1,2)+", y2: "+round(y2,2));

  stroke(255); line(x1,y1, x2,y2);
}

function draw(){ background(51);

  p[0].html("number of points: "+xs.length);
  p[1].html("number of Tensors: "+tf.memory().numTensors);

  if(xs.length>0){ tf.tidy( () => train(10) ); }
  tf.tidy(() => drawLine());

  let x, y;
  if(mouseIsPressed){ 
    x = map(mouseX, 0,width, 0,1); y = map(mouseY, 0,height, 1,0);
    xs.push(x); ys.push(y); 
  }

  for(let i=0;i<xs.length;i++){
    let canx = map(xs[i], 0,1, 0,width);
    let cany = map(ys[i], 0,1, height,0);
    ellipse(canx,cany, 8,8);
  }

}
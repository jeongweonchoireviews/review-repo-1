let xs = []; let ys = [];
let no_ps = 3; let p = [];

//  POLYNOMIAL COFACTORS
let a,b,c,d;

const learning_rate = 0.2;
const optimiser = tf.train.sgd(learning_rate);
// const optimiser = tf.train.adam(learning_rate);

function setup(){ createCanvas(800,800);
  for(let i=0;i<no_ps;i++){ p[i] = createP();
    p[i].style('font-size', '15px');
    p[i].position(810, 17*i);
  }

  a = tf.variable(tf.scalar(random(-1,1)));
  b = tf.variable(tf.scalar(random(-1,1)));
  c = tf.variable(tf.scalar(random(-1,1)));
  d = tf.variable(tf.scalar(random(-1,1)));
}

function loss(pred, labels){ return pred.sub(labels).square().mean(); }

function predict(x){ const tx = tf.tensor1d(x);
  // let ty = tx.mul(a).add(b); return ty;
  let ty = tx.square().mul(a).add(tx.mul(b)).add(c); return ty;
}

function predict_degree3(x){ const tx = tf.tensor1d(x);
  let ty = tx.pow(tf.scalar(3)).mul(a)
    .add(tx.square().mul(b))
    .add(tx.mul(c))
    .add(d); return ty;
}

function train(cycles){
  for(let i=0;i<cycles;i++){ 
    // optimiser.minimize(() => loss(predict(xs), tf.tensor1d(ys)));
    optimiser.minimize(() => loss(predict_degree3(xs), tf.tensor1d(ys)));
  }
}

function drawLine(){
  const curveX = [];
  for(let i=-1;i<1.01;i+=0.05){ curveX.push(i); }
  const curve_ys = tf.tidy(() => predict_degree3(curveX));  //  assigns tensor1d to line_ys, must be const
  let curveY = curve_ys.dataSync(); curve_ys.dispose();

  beginShape();
  noFill(); stroke(255); strokeWeight(1);
  for(let i=0;i<curveX.length;i++){
    let x = map(curveX[i], -1,1, 0,width);
    let y = map(curveY[i], -1,1, height,0);
    vertex(x,y);
  }
  endShape();
}

function draw(){ background(51);
  p[0].html("number of points: "+xs.length);
  p[1].html("number of Tensors: "+tf.memory().numTensors);

  if(xs.length>0){ tf.tidy( () => train(10) ); }
  tf.tidy(() => drawLine());

  let x, y; 
  if(mouseIsPressed){ 
    x = map(mouseX, 0,width, -1,1); y = map(mouseY, 0,height, 1,-1);
    xs.push(x); ys.push(y); 
  }

  for(let i=0;i<xs.length;i++){
    let canx = map(xs[i], -1,1, 0,width);
    let cany = map(ys[i], -1,1, height,0);
    fill(255);
    ellipse(canx,cany, 8,8);
  }
}
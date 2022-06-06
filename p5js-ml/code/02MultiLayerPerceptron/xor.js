//  Short test framework for XOR problem
//  test for number of hidden nodes & iterations per NN

//  XOR truth table
let training_data=[
  { inputs: [0,0], target: [0] },
  { inputs: [0,1], target: [1] },
  { inputs: [1,0], target: [1] },
  { inputs: [1,1], target: [0] }
]

//  setup for 200 NN instances of 500k trainings to average the outputs
function setup(){
  let nn1 = new NN(2,8,1);
  let scores = [];
  let bars = Array(4).fill(0);
  let s_count = Array(4).fill(0);

  for(let i=0;i<200;i++){ scores[i] = []; nn1 = new NN(2,8,1);
    for(let j=0;j<500000;j++){ let data = random(training_data);
      nn1.train(data.inputs, data.target);
    }
    for(let j=0;j<4;j++){
      scores[i][j] = round(nn1.feedforward(training_data[j].inputs),5);

      if(j==0 || j==3){ if(scores[i][j]>0.05) s_count[j]++; }

      if(j==1 || j==2){ if(scores[i][j]<0.95) s_count[j]++; }

      bars[j]+=scores[i][j];
    } console.log(i);
  }
  
  for(let j=0;j<4;j++){ bars[j]=round(bars[j]/200,5); }

  console.table(bars); console.table(s_count);
}
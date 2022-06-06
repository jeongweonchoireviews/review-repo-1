//  constructs 2 NN instances with different layer configurations
//  and demonstrates the desired inputs to train the NN.

function setup(){
  let nn1 = new NN(2,2,1);
  let inputs1 = [1,0];
  let targets1 = [1];
  nn1.train(inputs1,targets1);

  console.log("second nn:");
  let nn2 = new NN(2,2,2);
  let inputs2 = [1,0];
  let targets2 = [1,1];
  nn2.train(inputs2,targets2);
}
function sigmoid(x){ return 1 / (1 + Math.exp(-x)); }
function dsigmoid(o){ return o * (1 - o); }

class NN{
  constructor(input_nodes, hidden_nodes, output_nodes){
    this.input_nodes=input_nodes;
    this.hidden_nodes=hidden_nodes;
    this.output_nodes=output_nodes;

    this.weights_ih=new M(this.hidden_nodes, this.input_nodes);
    this.weights_ho=new M(this.output_nodes, this.hidden_nodes);
    this.weights_ih.random();
    this.weights_ho.random();

    this.bias_h=new M(this.hidden_nodes,1);
    this.bias_o=new M(this.output_nodes,1);
    this.bias_h.random();
    this.bias_o.random();

    this.lr=0.1;
  }

  feedforward(input_array){
    let inputs=M.fromArray(input_array);
    let hidden=M.mult(this.weights_ih,inputs);
    hidden.add(this.bias_h);
    //activation function 
    hidden.map(sigmoid);

    let output=M.mult(this.weights_ho,hidden);
    output.add(this.bias_o); output.map(sigmoid);

    return output.toArray();
  }

  train(input_array, target_array){  
    //  find the hidden layer errors using the labelled data.
    let inputs=M.fromArray(input_array);
    let hidden=M.mult(this.weights_ih,inputs);
    hidden.add(this.bias_h); hidden.map(sigmoid);  //  preserve hidden
    let outputs=M.mult(this.weights_ho,hidden);
    outputs.add(this.bias_o); outputs.map(sigmoid);

    let targets = M.fromArray(target_array);
    let output_errors = M.subtract(targets, outputs);

    // Calculate gradient and produce the delta_weights factor
    let gradients = M.map(outputs, dsigmoid);
    gradients.mult(output_errors); gradients.mult(this.lr);

    // Calculate Deltas using the delta weights factor
    let hidden_T = M.transpose(hidden);
    let weights_ho_deltas = M.mult(gradients, hidden_T);
    this.weights_ho.add(weights_ho_deltas);  //   <--<--
    this.bias_o.add(gradients);


    // Repeat for in_hidden layer
    let weights_ho_t = M.transpose(this.weights_ho);
    let hidden_gradients = M.map(hidden, dsigmoid);
    let hidden_errors = M.mult(weights_ho_t, output_errors);
    hidden_gradients.mult(hidden_errors);
    hidden_gradients.mult(this.lr);

    let inputs_T = M.transpose(inputs);
    let weights_ih_deltas = M.mult(hidden_gradients, inputs_T);
    this.weights_ih.add(weights_ih_deltas);  //  <--<--
    this.bias_h.add(hidden_gradients);
  }
}
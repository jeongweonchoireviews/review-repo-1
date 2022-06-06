// XOR inputs and labels
const xs = tf.tensor2d([ [0,0], [0,1], [1,0], [1,1] ]);
const ys = tf.tensor2d([ [0], [1], [1], [0] ]);

// list of tf.optimizers: sgd; momentum; adagrad; adadelta; adam; adamax; rmsprop; momentum has been omitted for overshooting tendency
const sgd_model = tf.sequential();
// const adagrad_model = tf.sequential();
// const adadelta_model = tf.sequential();
// const adam_model = tf.sequential();
// const adamax_model = tf.sequential();
// const rmsprop_model = tf.sequential();

// 2 layer solution for XOR
const hidden = tf.layers.dense({ units: 8, inputShape: [2], activation: 'sigmoid' });
const output = tf.layers.dense({ units: 1, activation: 'sigmoid' });

const sgd_compile_config = { optimizer: tf.train.sgd(0.5), loss: tf.losses.meanSquaredError }
// const adagrad_compile_config = { optimizer: tf.train.adagrad(0.5), loss: tf.losses.meanSquaredError }
// const adadelta_compile_config = { optimizer: tf.train.adadelta(0.5), loss: tf.losses.meanSquaredError }
// const adam_compile_config = { optimizer: tf.train.adam(0.5), loss: tf.losses.meanSquaredError }
// const adamax_compile_config = { optimizer: tf.train.adamax(0.5), loss: tf.losses.meanSquaredError }
// const rmsprop_compile_config = { optimizer: tf.train.rmsprop(0.5), loss: tf.losses.meanSquaredError }

sgd_model.add(hidden); sgd_model.add(output); sgd_model.compile(sgd_compile_config);
// adagrad_model.add(hidden); adagrad_model.add(output); adagrad_model.compile(adagrad_compile_config);
// adadelta_model.add(hidden); adadelta_model.add(output); adadelta_model.compile(adadelta_compile_config);
// adam_model.add(hidden); adam_model.add(output); adam_model.compile(adam_compile_config);
// adamax_model.add(hidden); adamax_model.add(output); adamax_model.compile(adamax_compile_config);
// rmsprop_model.add(hidden); rmsprop_model.add(output); rmsprop_model.compile(rmsprop_compile_config);

sgd_losses = []; //adagrad_losses = []; adadelta_losses = [];
// adam_losses = []; adamax_losses = []; rmsprop_losses = [];

train(sgd_model,sgd_losses).then(() => { console.log("training complete"); sgd_model.predict(xs).print(); });
// train(adagrad_model,adagrad_losses).then(() => { console.log("training complete"); adagrad_model.predict(xs).print(); });
// train(adadelta_model,adadelta_losses).then(() => { console.log("training complete"); adadelta_model.predict(xs).print(); });
// train(adam_model,adam_losses).then(() => { console.log("training complete"); adam_model.predict(xs).print(); });
// train(adamax_model,adamax_losses).then(() => { console.log("training complete"); adamax_model.predict(xs).print(); });
// train(rmsprop_model,rmsprop_losses).then(() => { console.log("training complete"); rmsprop_model.predict(xs).print(); });

async function train(model, losses){ 
  let thresh = 0.01;
  for(let i=0;i<10000;i++){
    const history = await model.fit(xs, ys, { 
      shuffle: true ,
      epochs: 1
    });
    let loss = history.history.loss[0];
    if(loss<=thresh){ losses.push({i,loss,thresh}); thresh/=10; }
    console.log([i,history.history.loss[0]]);
  }
}
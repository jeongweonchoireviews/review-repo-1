// Activation sign function
int sign(float sum){ if(sum>0) return 1; return -1; } //classification requires the points on the line to be ignored, for now?

class Perceptron{
  //float[] weights=new float[2];
  float[] weights;
  float lr=0.05;
  Perceptron(int n){
    weights=new float[n];
    for(int i=0;i<weights.length;i++){ weights[i]=random(-1,1); }
  }
  
  int guess(float[] inputs){
    float wsum=0; 
    for(int i=0;i<inputs.length;i++){ wsum+=(weights[i]*inputs[i]); }
    return sign(wsum);
  }
  
  void learn(float[] inputs, int label){
    int guess=guess(inputs); int error=label-guess;
    if(error==0) return;
    print("guessed("+guess+"),error("+error+") learning("+inputs[0]+","+inputs[1]+") -> ");
    print("<");
    for(int i=0;i<weights.length;i++){ print(weights[i]); if(i!=weights.length-1) print(","); weights[i]+=error*inputs[i]*lr; }
    print("> -> ");
  }
  
  float guessy(float x){
    float m = -(weights[0]/weights[1]); float b = -(weights[2]/weights[1]);
    return m*x + b;
  }
}

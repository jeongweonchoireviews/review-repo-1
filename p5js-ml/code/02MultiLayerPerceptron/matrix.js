class M{    
  constructor(r,c){ 
    this.r=r; this.c=c; this.data=[];
    for(let i=0;i<this.r;i++){ this.data[i]=[];
      for(let j=0;j<this.c;j++){ this.data[i][j]=0; }
    }
  }

  static fromArray(arr){ let m=new M(arr.length,1);
    for(let i=0;i<arr.length;i++){
      m.data[i][0]=arr[i];
    } return m;
  }

  static subtract(a,b){ let m = new M(a.r,a.c);
    for(let i=0;i<a.r;i++){
      for(let j=0;j<a.c;j++){
        m.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    } return m;
  }

  toArray(){
    let arr=[];
    for(let i=0;i<this.r;i++){
      for(let j=0;j<this.c;j++){
        arr.push(this.data[i][j]);
      }
    } return arr;
  }

  random(){
    for(let i=0;i<this.r;i++){
      for(let j=0;j<this.c;j++){ this.data[i][j]=Math.random()*2-1; 
        // this.data[i][j]=Math.floor(Math.random()*10); 
      }
    }
  }

  add(n){
    if(n instanceof M){ 
      for(let i=0;i<this.r;i++){
        for(let j=0;j<this.c;j++){ this.data[i][j]+=n.data[i][j]; }
      }
    } else{
      for(let i=0;i<this.r;i++){
        for(let j=0;j<this.c;j++){ this.data[i][j]+=n; }
      }
    }
  }

  static transpose(m){
    let result=new M(m.c, m.r);
    for(let i=0;i<m.r;i++){
      for(let j=0;j<m.c;j++){ result.data[j][i]=m.data[i][j]; }
    }return result;
  }

  static mult(a,b){
    if(a.c!==b.r){ console.error("invalid dimensions"); return undefined; }
    let result=new M(a.r,b.c);

    for(let i=0;i<result.r;i++){
      for(let k=0;k<result.c;k++){ let cur=0;
        for(let j=0;j<a.c;j++){ cur+=a.data[i][j]*b.data[j][k]; }
        result.data[i][k]=cur;
      }
    } return result;
  }
  mult(n){
    if(n instanceof M){
      for(let i=0;i<this.r;i++){
        for(let j=0;j<this.c;j++){ this.data[i][j]*=n.data[i][j]; }
      } return;
    }
    for(let i=0;i<this.r;i++){
      for(let j=0;j<this.c;j++){ this.data[i][j]*=n; }
    }
  }

  map(func) {
    // Apply a function to every element of data
    for (let i = 0; i < this.r; i++){
      for (let j = 0; j < this.c; j++){ let val = this.data[i][j];
        this.data[i][j] = func(val);
      }
    } return this;
  }

  static map(mat, fun){ let m=new M(mat.r,mat.c);
    for (let i = 0; i < mat.r; i++){
      for (let j = 0; j < mat.c; j++){ let val = mat.data[i][j];
        m.data[i][j] = fun(val);
      } 
    } return m;
  }

  print(message){ if(message)console.log(message); console.table(this.data); }
}


#include<stdio.h>
#include<stdlib.h>

typedef struct No{int v;struct No *l,*r;}No;
typedef struct{int cap,count,type,*ar;}H;

H *createH(int cap, int type);
int par(H *h, int i); int lCh(H *h, int i); int rCh(H *h, int i); int getMax(H *h);  //  positions
void pDown(H *h, int i);  //  main
int delMax(H *h); void insert(H *h, int d);  //  data
void resize(H *h); void destroyH(H *h); void buildH(H *h, int A[], int n);  //  utils
void hSort(int A[], int n);  //  sort

int main(int argc, char *argv[]){
  for(int i=0;i<5;i++) printf("%d\n",i);
  return 0;
}

H *createH(int cap, int type){ H *h=malloc(sizeof(H));
  h->cap=cap,h->type=type;h->count=0;
  h->ar=malloc(cap*sizeof(int)); return h; } 
int par(H *h, int i){ if(i<=0||i>=h->count) return -1; return (i-1)/2; }
int lCh(H *h, int i){ int l=(i*2)+1; if(l>=h->count) return -1; return l; }
int rCh(H *h, int i){ int l=(i*2)+1; if(l>=h->count) return -1; return l; }
int getMax(H *h){ if(h->count==0) return -1; return h->ar[0]; }
void pDown(H *h, int i){ int l=lCh(h,i),r=rCh(h,i),max=i,tmp;
  if(l!=-1&&h->ar[l]>h->ar[max]) max=l; if(r!=-1&&h->ar[r]>h->ar[max]) max=r;
  if(max!=i){tmp=h->ar[i];h->ar[i]=h->ar[max];h->ar[max]=tmp;pDown(h,max);}
}
int delMax(H *h){ if(h->count==0) return -1;
  int d=h->ar[0];h->ar[0]=h->ar[--h->count]; pDown(h,0); return d; }
void insert(H *h, int d){ if(h->cap==h->count) resize(h);
  int i=h->count++;
  while(i>=0&&d>h->ar[(i-1)/2]){ h->ar[i]=h->ar[(i-1)/2]; i=(i-1)/2; }
  h->ar[i]=d; }
void resize(H *h){ int *oldar=h->ar;
  h->ar=malloc(2*h->cap*sizeof(int)); 
  for(int i=0;i<h->cap;i++){ h->ar[i]=oldar[i]; }
  h->cap*=2; free(oldar); }
void altResize(H *h){ h->cap*=2;
  h->ar=realloc(h->ar, h->cap*sizeof(int)); }
void destroyH(H *h){ if(h==NULL) return; free(h->ar); free(h); h=NULL; }
void buildH(H *h, int A[], int n){ if(h==NULL) return;
  while(n>h->cap) resize(h);
  for(int i=0;i<n;i++) h->ar[i]=A[i]; h->count=n;
  for(int i=(n-1)/2;i>=0;i--) pDown(h,i);
}
void hSort(int A[], int n){ H *h=createH(n,1); buildH(h,A,n);
  int tmp; for(int i=0;i<n-1;i++){ 
    tmp=h->ar[0]; h->ar[0]=h->ar[--h->count]; 
    h->ar[h->count]=tmp; pDown(h,0); 
  } h->count=n; 
}
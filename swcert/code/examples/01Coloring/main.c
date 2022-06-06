/* 2017
Coloring Exercise
  
0 = white 1 = black
Colour the white areas in red, green & blue.
Area must be coloured from largest area to smallest in the sequence shown above.
Black areas are not to be filled.
EXAMPLE
1 <- T
10 10 <- W & H
0 0 0 0 0 0 0 0 0 0 <- data
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 1 1 1 1 1
1 1 1 1 1 0 0 0 0 0
0 0 0 0 0 0 1 1 1 1
1 1 1 1 1 1 0 0 1 0
0 0 0 0 0 1 0 1 1 0
0 0 0 0 0 0 1 0 1 0
0 0 0 0 0 0 0 0 1 0

Result would be: 
R R R R R R R R R R
R R R R R R R R R R
R R R R R R R R R R
R R R R R 1 1 1 1 1
1 1 1 1 1 B B B B B
B B B B B B 1 1 1 1
1 1 1 1 1 1 G G 1 R
G G G G G 1 G 1 1 R
G G G G G G 1 G 1 R
G G G G G G G G 1 R

five white area sizes are:
1: 35
2: 11
3: 3
4: 4
5: 20

Sum of red areas = 35 + 4 = 39

INPUT
T number of tests 1<= T <=20
W with of grid 5 <= W <= 50
H height of grid 5 <= H <= 50
0 or 1 sample area data

OUTPUT
Return sum.

#1 39
#2 25
#3 34
#4 214
#5 464

*/

#include<stdio.h>

int recurse(int g[25][25],int r,int c,int *count){ if(g[r][c] == 1) return 0;
  g[r][c] = 1; *count += 1;
  if(g[r-1][c] == 0) recurse(g, r-1, c, count);
  if(g[r+1][c] == 0) recurse(g, r+1, c, count);
  if(g[r][c-1] == 0) recurse(g, r, c-1, count);
  if(g[r][c+1] == 0) recurse(g, r, c+1, count);
  return 0;
}

int main(int argc, char *argv[]){ FILE *fp = fopen(argv[1], "r");
  int t, T, W, H, count, ans;
  int g[25][25]; int counts[320], c_i;

  fscanf(fp, "%d", &T); 
  for(t = 1;t <= T;t++){
    for(int r = 0; r < 25; r++){
      for(int c = 0; c < 25; c++){ g[r][c] = 1; }
    }
    for(int i = 0; i < 320; i++){ counts[i] = 0; }
    fscanf(fp, "%d%d", &W, &H);

    for(int r = 1; r <= H; r++){
      for(int c = 1; c <= W; c++){ fscanf(fp, "%d", &g[r][c]); }
    }

    c_i = 0;
    for(int r = 1; r <= H; r++){
      for(int c = 1; c <= W; c++){ count = 0;
        if(g[r][c] == 0){ recurse(g, r, c, &count);
          counts[c_i] = count; c_i += 1;
        }
      }
    }

    for(int i = 0; i <= c_i-2; i++){
      for(int j = i+1; j <= c_i-1; j++){
        if(counts[i] < counts[j]){ int tmp = counts[i];
          counts[i] = counts[j]; counts[j] = tmp;
        }
      }
    }

    ans = 0;
    for(int i = 0; i < c_i; i++){ if(i%3 == 0) ans += counts[i]; }

    printf("#%d %d\n", t, ans); 
  } 
  return 0;
}
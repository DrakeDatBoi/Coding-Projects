#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>


void printW(){ //W image
    printf("            WW             WW\n");
    printf("             WW    WWW    WW\n");
    printf("              WW  W   W  WW\n");
    printf("               WWW     WWW");
}

void printWBox(){// W boxed
    printf("           -------------------\n");
    printf("          | WW             WW |\n");
    printf("          |  WW    WWW    WW  |\n");
    printf("          |   WW  W   W  WW   |\n");
    printf("          |    WWW     WWW    |\n");
    printf("           -------------------\n");
}

void printIBox(){// I boxed
  int switchT = 0;
  printf("                ----------\n");
  for(int i = 0; i< 3; i++){
    if(switchT == 0){
      printf("               | ");
      for( int j = 0; j < 8; ++j){
        printf("I");
      }
      printf(" |\n");
      switchT = 1;
    }
    else{
      for(int i = 0; i < 3; i++){
        printf("               | ");
        printf("   II    |\n");
      }
      switchT = 0;
    }
  }
  printf("                ----------\n");
}

void printI(){ //I image
  int switchT = 0;
  for(int i = 0; i< 3; i++){
    if(switchT == 0){
      printf("                 ");
      for( int j = 0; j < 8; ++j){
        printf("I");
      }
      printf("\n");
      switchT = 1;
    }
    else{
      for(int i = 0; i < 3; i++){
        printf("                 ");
        printf("   II\n");
      }
      switchT = 0;
    }
  }
    

}

void printAO(){ // A O image
  printf("    A                              OOOO\n");
  printf("   A A                           OO    OO\n");
  printf("  AAAAA                          OO    OO\n");
  printf(" AA   AA                         OO    OO\n");
  printf("AA     AA                          OOOO\n");
}

void printOBox() { //A and O but O is boxed
  printf("                                ----------\n");
  printf("    A                          |   OOOO   |\n");
  printf("   A A                         | OO    OO |\n");
  printf("  AAAAA                        | OO    OO |\n");
  printf(" AA   AA                       | OO    OO |\n");
  printf("AA     AA                      |   OOOO   |\n");
  printf("                                ----------\n");
}

void printABox(){ //A and O but A is boxed
  printf(" -----------\n");
  printf("|     A     |                         OOOO\n");
  printf("|    A A    |                       OO    OO\n");
  printf("|   AAAAA   |                       OO    OO\n");
  printf("|  AA   AA  |                       OO    OO\n");
  printf("| AA     AA |                         OOOO\n");
  printf(" -----------\n");
}

void printBoard(){ //printing the board without a box
   printI();
   printf("\n");
   printAO();
   printf("\n");
   printW();
   printf("\n");
}

void printBoard1(){ //printing board with I boxed
  printIBox();
  printf("\n");
  printAO();
  printf("\n");
  printW();
  printf("\n");
}

void printBoard2(){ //printing the board with O boxed
  printI();
  printf("\n");
  printOBox();
  printf("\n");
  printW();
  printf("\n");
}

void printBoard3(){ //printing board with A boxed
  printI();
  printf("\n");
  printABox();
  printf("\n");
  printW();
  printf("\n");
}

void printBoard4(){ //printing the board with W boxed
  printI();
  printf("\n");
  printAO();
  printf("\n");
  printWBox();
  printf("\n");
}

typedef struct scores{ //struct of scores and names
  int score;
  char name[3];
}scores;

void highScore(){ //printing the text file in a high score table
  int num = 0;
  int rank = 1;
  scores temp[10];
  FILE *fp = NULL;
  fp = fopen("testFile.txt", "r");
  printf("HIGHEST SCORES:\n\n");
  printf("RANK---SCORE---NAME\n");
  while(!feof(fp)){
    fscanf(fp, "%2d %s", &temp[num].score, temp[num].name);
    if(rank == 10)
      printf("  %d     %2d     %s\n", rank, temp[num].score, temp[num].name);
    else
      printf("  %d      %2d     %s\n", rank, temp[num].score, temp[num].name);
    rank++; 
    num++;
  }
  fclose(fp);
}

int main(){
  const int constScores = 10;
  char s;
  int score = 0;
  int current;
  int i = 0;
  int turn = 1;
  FILE* fp = NULL;
  fp = fopen("testFile.txt", "r");
  int rank = 0;
  scores scoreBoard[constScores];
  while(!feof(fp)){
    fscanf(fp, "%d %s", &scoreBoard[rank].score,scoreBoard[rank].name);
    rank++;
  }
  fclose(fp);
  FILE* moves = NULL;
  
  srand(time(0));
  printf("Welcome to the Memory Game!\n"); //introduction and directions for the game
  sleep(1);
  printf("In the game various shapes will appear with a box around it\n");
  printf("You must remember the shapes that are circled and repeat the order\n");
  printf("Use w for up, s for down, d for right, a for left.\n\n");
  highScore();
  printf("\n\n\n");
  sleep(1);
  moves = fopen("moves.txt", "w");
  printf("Enter 'g' to start the game\n");
while(1){
  scanf("%c", &s);
  if(s == 'g'){
  printf("3...\n");
  sleep(1);
  printf("2...\n");
  sleep(1);
  printf("1...\n");
  sleep(1);
  while(1){
    while(i < turn){
    
    current = rand() % 4 + 1; //setting the random number to a variable and then printing the boxes based on that number

    if(current == 1){ 
      printBoard1();
      printf("\n");
      printf("\n");
      fprintf(moves, "w ");
    }

    else if(current == 2){
      printBoard2();
      printf("\n");
      printf("\n");
      fprintf(moves, "d ");
    }

    else if(current == 3){
      printBoard3();
      printf("\n");
      printf("\n");
      fprintf(moves, "a ");
    }

    else{
      printBoard4();
      printf("\n");
      printf("\n");
      fprintf(moves, "s ");
    }
    i++;
    sleep(2);
    }
    fclose(moves);
    i = 0;
    printf("Turn: %d\n", turn);
    printf("Score: %d\n", score);
    printf("Okay, what was the order?(w,a,s,d)\n");
    moves = fopen("moves.txt", "r");
    int times = 1;
    while(!feof(moves)){ //starts checking for the moves
      char curChar;
      char memory;
      fscanf(moves, "%c ", &memory);
      if(times == 1){
        printf("%d time: ", times);
      } 
      else {
        printf("%d times: ", times);
      }
      scanf(" %c", &curChar); //scans for what moves happened
      if(curChar != memory){
        printf("Nope the correct answer was %c\n", memory);       
        printf("Sorry, you lose. You got to turn %d\n", turn);
        printf("Your final score was %d. Try again and get even higher!\n", score);
 
        if(score > scoreBoard[8].score){ //moves the score down if new high score is greater than current high scores
          char initials[3];
          printf("Congratulations! You made it on the high score table!\n");
          printf("Please enter your name (Only 3 capital letters):\n");
          scanf(" %s", initials);
          printf("\n\n");
            for(int i = 0; i < constScores-1; i++){ //starts scanning the high score table for position
              if(score > scoreBoard[i].score){ 
                for(int j = constScores; j > i; j--){ //once found, it moves the the scores down one
                  scoreBoard[j] = scoreBoard[j-1];
                }
                if (score >= 100)
                  score = 99;
                scoreBoard[i].score = score;
                strcpy(scoreBoard[i].name, initials); //adds player to the scoreboard, putting their score at 99
                break;
              }
            }
            FILE* newFp = NULL; 
            newFp = fopen("testFile.txt", "w");  //creates file for high scores
            printf("HIGHEST SCORES:\n\n");
            printf("RANK---SCORE---NAME\n");
            rank = 1;
            for(int i = 0; i < constScores; i++){ //iterates through the file, printing out the scores, names and ranks
              fprintf(newFp, "%d %s\n", scoreBoard[i].score, scoreBoard[i].name);
              if(rank == 10) // for asthetic purpose
                printf("  %d    %d      %s\n", rank, scoreBoard[i].score, scoreBoard[i].name);
              else
                printf("  %d     %d      %s\n", rank, scoreBoard[i].score, scoreBoard[i].name);
              rank++;              
            }
            fclose(newFp);
        }
        exit(0);
      }
      else{//if the move was right then it will add one to
        score++;
        times++;
        printf("Score: %d", score);
        printf("\n");
      }
    }
    fclose(moves); //closes the file scanner
    moves = fopen("moves.txt", "w"); //scans moves.txt
    turn++;
    printf("Good job, get ready for the next round.\n");
    printf("3...\n");
    sleep(1);
    printf("2..\n");
    sleep(1);
    printf("1...\n");
    sleep(1);
    }
  }
  else{ //executes if the answer is wrong
  printf("Wrong input, try again.\n");
  printf("Enter 'g' to start the game\n");
  scanf("%c", &s);
  }
}
  
  return 0;
}


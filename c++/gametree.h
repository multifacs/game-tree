#include <iomanip>
#include <iostream>

using std::cout;
using std::setw;

struct treeNode {
  int state[9] = {0, 0, 0, 0, 0, 0, 0, 0, 0};
  struct treeNode** next = nullptr;
  int number = 0;
  int go = 0;
  int children = 0;
  bool win = false;

  void print();
  void printChildren(int num = 3);

  bool checkWin();

  void generate(int num = 8);
  void generateZero(int num = 18);


  treeNode* makeMove(int position);
  treeNode* makeMovePC();
};

treeNode* startGame(int side);

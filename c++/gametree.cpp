#include "gametree.h"

#include <random>

std::random_device
    rd;  // Will be used to obtain a seed for the random number engine
std::mt19937 gen(rd());  // Standard mersenne_twister_engine seeded with rd()
std::uniform_int_distribution<> distrib(0, 8);

void treeNode::print() {
  cout << "Move num: " << number << "\n";
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      char output = '-';
      if (state[3 * i + j] == 1) output = 'X';
      if (state[3 * i + j] == 2) output = 'O';
      cout << output << " ";
    }
    cout << "\n";
  }
}

void treeNode::printChildren(int num) {
  int part = children / num;
  int rem = children % num;

  for (int k = 0; k < num; k++) {
    for (int c = part * k; c < part * (k + 1); c++) {
      cout << next[c]->number << setw(10);
    }
    cout << "\n";

    for (int i = 0; i < 3; i++) {
      for (int c = part * k; c < part * (k + 1); c++) {
        for (int j = 0; j < 3; j++) {
          char output = '-';
          if (next[c]->state[3 * i + j] == 1) output = 'X';
          if (next[c]->state[3 * i + j] == 2) output = 'O';
          cout << output << " ";
        }
        cout << setw(5);
      }
      cout << "\n";
    }
    cout << "\n";
  }

  for (int c = part * num; c < part * num + rem; c++) {
    cout << next[c]->number << setw(10);
  }
  cout << "\n";

  for (int i = 0; i < 3; i++) {
    for (int c = part * num; c < part * num + rem; c++) {
      for (int j = 0; j < 3; j++) {
        char output = '-';
        if (next[c]->state[3 * i + j] == 1) output = 'X';
        if (next[c]->state[3 * i + j] == 2) output = 'O';
        cout << output << " ";
      }
      cout << setw(5);
    }
    // cout << "\n";
  }
}

bool treeNode::checkWin() {
  for (int i = 0; i < 3; i++) {
    int consecutiveMovesX = 0;
    int consecutiveMovesY = 0;
    for (int j = 0; j < 3; j++) {
      if (state[i * 3 + j] == 1) consecutiveMovesX++;
      if (state[i * 3 + j] == 2) consecutiveMovesY++;
    }
    if (consecutiveMovesX % 3 == 0 && consecutiveMovesX != 0) {
      win = true;
      break;
    }
    if (consecutiveMovesY % 3 == 0 && consecutiveMovesY != 0) {
      win = true;
      break;
    }
  }

  if (state[0] + state[4] + state[8] != 0) {
    if (state[0] + state[4] + state[8] % 3 == 0) {
      win = true;
    }
  }
  if (state[2] + state[4] + state[6] != 0) {
    if (state[2] + state[4] + state[6] % 3 == 0) {
      win = true;
    }
  }

  return win;
}

void treeNode::generate(int num) {
  int moves = 0;
  int moveSpots[9] = {0, 0, 0, 0, 0, 0, 0, 0, 0};

  if (go == 0) {
    generateZero(num);
    return;
  }

  for (int spot = 0; spot < 9; spot++) {
    if (state[spot] == 0) {
      moveSpots[moves] = spot;
      // cout << spot << " ";
      moves += 1;
    }
  }
  // cout << "\n";
  children = num;
  if (children > moves) children = moves;
  if (children) next = new treeNode*[children];

  for (int spot = 0; spot < moves; spot++) {
    int index = moveSpots[spot];

    next[spot] = new treeNode;
    std::copy(state, state + 9, next[spot]->state);
    next[spot]->number = number + spot + 1;

    if (go == 1) {
      next[spot]->state[index] = 2;
      next[spot]->go = 2;
    }

    if (go == 2) {
      next[spot]->state[index] = 1;
      next[spot]->go = 1;
    }

    next[spot]->checkWin();
  }
}

void treeNode::generateZero(int num) {
  next = new treeNode*[num];
  children = num;

  for (int spot = 0; spot < num; spot++) {
    int index = spot % 9;

    next[spot] = new treeNode;
    next[spot]->number = number + spot + 1;

    if (spot % 2 == 0) {
      next[spot]->state[index] = 1;
      next[spot]->go = 1;
    }
    if (spot % 2 != 0) {
      next[spot]->state[index] = 2;
      next[spot]->go = 2;
    }
  }
}

treeNode* treeNode::makeMove(int position) {
  if (state[position]) return this;

  if (go == 1) {
    state[position] = 1;
  }
  if (go == 2) {
    state[position] = 2;
  }

  if (checkWin()) return this;

  children = 1;
  next = new treeNode*[1];
  next[0] = new treeNode;
  std::copy(state, state + 9, next[0]->state);
  next[0]->number = number + 1;

  if (go == 1) {
    next[0]->go = 2;
  }
  if (go == 2) {
    next[0]->go = 1;
  }

  return next[0];
}

treeNode* treeNode::makeMovePC() {

  bool canExit = false;
  int pos = 0;
  while (!canExit) {
    pos = distrib(gen);

    if (!state[pos]) canExit = true;
  }

  if (go == 1) {
    state[pos] = 1;
  }
  if (go == 2) {
    state[pos] = 2;
  }

  if (checkWin()) return this;

  children = 1;
  next = new treeNode*[1];
  next[0] = new treeNode;
  std::copy(state, state + 9, next[0]->state);
  next[0]->number = number + 1;

  if (go == 1) {
    next[0]->go = 2;
  }
  if (go == 2) {
    next[0]->go = 1;
  }

  return next[0];
}

treeNode* startGame(int side) {
  treeNode* gameTree = new treeNode();

  gameTree->go = side;
  gameTree->number = 0;

  return gameTree;
}

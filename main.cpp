#include <gtest/gtest.h>

#include "gametree.h"

TEST(GameTree, DISABLED_CREATE_TREE) {
  treeNode* gameTree = nullptr;
  ASSERT_NO_THROW(gameTree = new treeNode());
  ASSERT_EQ(gameTree->go, 0);
}

TEST(GameTree, DISABLED_GENERATE) {
  treeNode* gameTree = new treeNode();
  // ASSERT_NO_THROW(gameTree->generate(5));
}

TEST(GameTree, DISABLED_WIN) {
  treeNode* gameTree = new treeNode();
  gameTree->state[1] = 1;
  gameTree->go = 1;
  // gameTree->print();
  // cout << "\n";

  gameTree->generate(5);
  // gameTree->printChildren();
  treeNode* game1 = gameTree->next[2];

  game1->generate(5);
  // game1->printChildren();
  treeNode* game2 = game1->next[4];

  game2->generate(5);
  // game2->printChildren();
  treeNode* game3 = game2->next[2];

  game3->generate(5);
  // game3->printChildren();
  treeNode* game4 = game3->next[4];

  game4->generate(5);
  // game4->printChildren();
  treeNode* game5 = game4->next[2];

  // game1->print();
  // cout << "\n";
  // game2->print();
  // cout << "\n";
  // game3->print();
  // cout << "\n";
  // game4->print();
  // cout << "\n";
  // game5->print();
  // cout << "\n";

  // cout << game5->win;
}

TEST(GameTree, DISABLED_GENERATE_ZERO) {
  treeNode* gameTree = new treeNode();
  gameTree->generate(18);
  gameTree->printChildren(6);
}

TEST(GameTree, GAME) {

  std::cout << "Choose side 1 or 2:\n";
  int side;
  std::cin >> side;
  if (side != 1 && side != 2) return;

  treeNode* gameTree = startGame(side);
  gameTree->print();

  while (true) {
    int pos = 0;
    std::cout << "Enter move pos:\n";
    std::cin >> pos;
    if (gameTree->state[pos]) continue;
    gameTree = gameTree->makeMove(pos);
    gameTree->print();
    std::cout << "\n";

    if (gameTree->win) {
      std::cout << "You won!\n";
      break;
    }

    gameTree = gameTree->makeMovePC();
    gameTree->print();
    std::cout << "\n";

    if (gameTree->win) {
      std::cout << "You lost!\n";
      break;
    }
  }
}

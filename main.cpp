#include <gtest/gtest.h>
#include "gametree.h"

// Demonstrate some basic assertions.
TEST(HelloTest, BasicAssertions) {
    treeNode* gameTree = new treeNode();
    gameTree->state[1] = 1;
    gameTree->go = 1;
    gameTree->print();
    cout << "\n";

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

    game1->print();
    cout << "\n";
    game2->print();
    cout << "\n";
    game3->print();
    cout << "\n";
    game4->print();
    cout << "\n";
    game5->print();
    cout << "\n";

    cout << game5->win;
}

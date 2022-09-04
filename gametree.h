#include <iostream>
#include <iomanip>

using std::cout;
using std::setw;

struct treeNode {
    int state[9] = { 0, 0, 0, 0, 0, 0, 0, 0, 0 };
    struct treeNode** next = nullptr;
    int number = 0;
    int go = 0;
    int children = 0;
    bool win = false;

    void print() {
        cout << number << "\n";
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

    void printChildren() {
        for (int c = 0; c < children; c++) {
            cout << next[c]->number << setw(10);
        }
        cout << "\n";

        for (int i = 0; i < 3; i++) {
            for (int c = 0; c < children; c++) {
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
    }

    bool checkWin() {
        for (int i = 0; i < 3; i++) {
            int consecutiveMovesX = 0;
            int consecutiveMovesY = 0;
            for (int j = 0; j < 3; j++) {
                consecutiveMovesX += state[i * 3 + j];
                consecutiveMovesY += state[j * 3 + i];
            }
            if (consecutiveMovesX % 3 == 0 || consecutiveMovesY % 3 == 0) {
                win = true;
                break;
            }
        }

        if (state[0] + state[4] + state[8] % 3 == 0) {
            win = true;
        }
        if (state[2] + state[4] + state[6] % 3 == 0) {
            win = true;
        }

        return win;
    }

    void generate(int num = 8) {
        int moves = 0;
        int moveSpots[9] = { 0, 0, 0, 0, 0, 0, 0, 0, 0 };

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
        if (children) next = new treeNode * [children];

        for (int spot = 0; spot < moves; spot++) {
            int index = moveSpots[spot];

            next[spot] = new treeNode;
            std::copy(state, state + 9, next[spot]->state);
            next[spot]->number = number + spot + 1;

            if (go == 0) {
                if (spot % 2 == 0) {
                    next[spot]->state[index] = 1;
                    next[spot]->go = 1;
                }
                if (spot % 2 != 0) {
                    next[spot]->state[index] = 2;
                    next[spot]->go = 2;
                }
            }

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
};

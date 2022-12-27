import random
from treelib import Tree

class GameNode:
    def __init__(self, side = 0):
        self.next = []
        self.number = 0
        self.go = side
        self.children = 0
        self.win = False
        self.state = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    def print(self):
        print("Move num: ", self.number, "\n")
        for i in range(0, 3):
            s = ""
            for j in range(0, 3):
                output = '-'
                if (self.state[3 * i + j] == 1):
                    output = 'X'
                if (self.state[3 * i + j] == 2):
                    output = 'O'
                s += output + " "
            print(s)

    def print_children(self, num = 3):
        part = self.children / num
        rem = self.children % num

        for k in range(0, num):
            for c in range(part * k, part * (k + 1)):
                print(self.next[c].number)
            print("\n")

        
        for i in range(0, 3):
            for c in range(part * k, part * (k + 1)):
                for j in range(0, 3):
                    output = '-'
                    if (self.state[3 * i + j] == 1):
                        output = 'X'
                    if (self.state[3 * i + j] == 2):
                        output = 'O'
                    print(output, " ")
                print("\n")
            print("\n")

        for c in range(part * num, part * num + rem):
            print(self.next[c].number)
        print("\n")

        for i in range(0, 3):
            for c in range(part * num, part * num + rem):
                for j in range(0, 3):
                    output = '-'
                    if (self.state[3 * i + j] == 1):
                        output = 'X'
                    if (self.state[3 * i + j] == 2):
                        output = 'O'
                    print(output, " ")
                print("\n")
            print("\n")

    def check_win(self):
        for i in range(0, 3):
            consecutiveMovesX = 0
            consecutiveMovesY = 0
            for j in range(0, 3):
                if (self.state[i * 3 + j] == 1): consecutiveMovesX += 1
                if (self.state[i * 3 + j] == 2): consecutiveMovesY += 1

            if consecutiveMovesX == 3:
                self.win = True
                break
            if consecutiveMovesY == 3:
                self.win = True
                break

            consecutiveMovesX = 0
            consecutiveMovesY = 0
            for j in range(0, 3):
                if (self.state[j * 3 + i] == 1): consecutiveMovesX += 1
                if (self.state[j * 3 + i] == 2): consecutiveMovesY += 1

            if consecutiveMovesX == 3:
                self.win = True
                break
            if consecutiveMovesY == 3:
                self.win = True
                break
        
        if self.state[0] == 1 and self.state[4] == 1 and self.state[8] == 1:
            self.win = True
        if self.state[0] == 2 and self.state[4] == 2 and self.state[8] == 2:
            self.win = True

        if self.state[2] == 1 and self.state[4] == 1 and self.state[6] == 1:
            self.win = True
        if self.state[2] == 2 and self.state[4] == 2 and self.state[6] == 2:
            self.win = True

        return self.win

    def generate_zero(self, num = 18):
        self.next = [GameNode() for x in range(0, num)]
        self.children = num

        for spot in range(0, num):
            index = spot % 9
            self.next[spot].number = self.number + spot + 1
            if spot % 2 == 0:
                self.next[spot].state[index] = 1
                self.next[spot].go = 1
            if spot % 2 != 0:
                self.next[spot].state[index] = 2
                self.next[spot].go = 2

    def generate(self, num = 8):
        moves = 0
        move_spots = [0, 0, 0, 0, 0, 0, 0, 0, 0]

        if self.go == 0:
            self.generate_zero(num)
            return

        for spot in range(0, num):
            if self.state[spot] == 0:
                move_spots[moves] = spot
                print(spot, " ")
                moves += 1
        print("\n")

        self.children = num
        if self.children > moves: self.children = moves
        if self.children: self.next = [GameNode() for x in range(0, self.children)]

        for spot in range(0, moves):
            index = move_spots[spot]

            self.next[spot].state = self.state.copy()
            self.next[spot].number = self.number + spot + 1

            if self.go == 1:
                self.next[spot].state[index] = 2
                self.next[spot].go = 2

            if self.go == 2:
                self.next[spot].state[index] = 1
                self.next[spot].go = 1

            self.next[spot].check_win()

    def make_move(self, pos):
        if self.state[pos]: return self

        if self.go == 1:
            self.state[pos] = 1

        if self.go == 2:
            self.state[pos] = 2

        if self.check_win(): return self

        self.children = 1
        self.next = [GameNode()]
        self.next[0].state = self.state.copy()
        self.next[0].number = self.number + 1

        if self.go == 1:
            self.next[0].go = 2

        if self.go == 2:
            self.next[0].go = 1

        return

    def make_move_pc(self):
        can_exit = False
        pos = 0
        random.seed()
        while not can_exit:
            pos = int(random.random() * 8)
            if (not self.state[pos]): can_exit = True

        if self.go == 1:
            self.state[pos] = 1

        if self.go == 2:
            self.state[pos] = 2

        if self.check_win(): return self

        self.children = 1
        self.next = [GameNode()]
        self.next[0].state = self.state.copy()
        self.next[0].number = self.number + 1

        if self.go == 1:
            self.next[0].go = 2

        if self.go == 2:
            self.next[0].go = 1

        return pos

    def start_game(self, side):
        game_tree = GameNode()

        game_tree.go = side
        game_tree.number = 0

        return game_tree

class GameTree:
    def __init__(self):
        self.tree = Tree()
        self.head = GameNode()
        self.current = self.head
        self.parent = 0
        self.counter = 1
        self.game_on = False

    def start_game(self, side):
        print("YOUR SIDE: ", 'X' if side == 1 else 'O', "\n")
        self.head = GameNode().start_game(side)
        self.current = self.head
        self.tree.create_node("START", self.parent)
        self.game_on = True

    def __new_node(self, pos, message = 'PICK'):
        for i in range(0, 9):
            x = int(i / 3) + 1
            y = int(i - int(i / 3) * 3) + 1
            letter = 'X' if self.current.go == 1 else 'O'
            node_text = ""
            if i == pos:
                node_text += '\033[1m'
            node_text += letter + " (" + str(x) + " " + str(y) + ")"
            if i == pos:
                node_text += " " + message + '\033[0m'
                temp = self.counter + i
            self.tree.create_node(node_text, self.counter + i, parent=self.parent)
            self.counter += 1
        self.parent = temp

    def make_move(self, pos):
        pos = pos - 1
        self.current.make_move(pos)
        
        if self.current.win == True:
            self.__new_node(pos, 'WIN')
            self.game_on = False
            self.current.print()
            print()
            print("YOU WON\n")
            return

        self.__new_node(pos)
        self.current = self.current.next[0]
        self.current.print()
        print()

        pc_move = self.current.make_move_pc()
        if self.current.win == True:
            self.game_on = False
            self.__new_node(pc_move, 'LOSE')
            self.current.print()
            print()

            print("YOU LOST\n")
            return

        self.__new_node(pc_move)
        self.current = self.current.next[0]
        self.current.print()
        print()

    def show_tree(self):
        self.tree.show()
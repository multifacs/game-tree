from gametree import GameTree

tree = GameTree()
side = int(input("CHOOSE SIDE 1 OR 2\n"))
if side != 1 and side != 2: raise ValueError('Wrong side')
tree.start_game(side)

while(tree.game_on):
    pos = int(input("ENTER POS 1 to 9\n"))
    tree.make_move(pos)

tree.show_tree()

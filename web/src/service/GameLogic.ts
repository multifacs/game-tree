interface Board {
    board: Array<number | string>;
    num: number;
    score: number;
    next: string;
    children: Board[];
    move: number;
    win: boolean;
}

const getAvailableMoves = (board: Board) : Array<number> => {
    const player = board.next == 'X' ? 'O' : 'X';
    if (isWin(board, player)) return [];
    return board.board.filter(s => s !== "O" && s !== "X") as Array<number>;
}

const isWin = (board: Board, player: string) => {
    if (
        (board.board[0] == player && board.board[1] == player && board.board[2] == player) ||
        (board.board[3] == player && board.board[4] == player && board.board[5] == player) ||
        (board.board[6] == player && board.board[7] == player && board.board[8] == player) ||
        (board.board[0] == player && board.board[3] == player && board.board[6] == player) ||
        (board.board[1] == player && board.board[4] == player && board.board[7] == player) ||
        (board.board[2] == player && board.board[5] == player && board.board[8] == player) ||
        (board.board[0] == player && board.board[4] == player && board.board[8] == player) ||
        (board.board[2] == player && board.board[4] == player && board.board[6] == player)
    ) {
        return true;
    } else {
        return false;
    }
}

const getChildren = (board: Board) => {
    const moves = getAvailableMoves(board)
    board.win = moves.length > 0 ? false : true
    if (isWin(board, "X") && !isWin(board, "O")) board.score += 10
    if (!isWin(board, "X") && isWin(board, "O")) board.score -= 10

    for (const move of moves) {
        const newState = {
            board: JSON.parse(JSON.stringify(board.board)),
            num: 1,
            score: board.score - 1,
            next: board.next == 'X' ? 'O' : 'X',
            children: [],
            move: -1,
            win: false
        }
        newState.board[move] = board.next
        newState.move = move
        console.log(move, newState.board)
        board.children.push(newState)
    }

    for (const [idx, child] of board.children.entries()) {
        if (idx > 3) continue;
        getChildren(child)
    }

    labelChildren(board)
}

const labelChildren = (board: Board) => {
    let count = board.num;

    function traverse(board: Board) {
        board.num = count;
        console.log("Current count:", count)
        count++;
        for (const child of board.children) {
            traverse(child);
        }
    }
    traverse(board);
}

const getAllPaths = (root: Board) => {
    const paths: Array<Array<number>> = [];
  
    function dfs(node: Board, currentPath: Array<number>) {
      currentPath.push(node.num);
  
      if (node.children.length === 0) {
        paths.push([...currentPath, node.score]); // Make a copy of the current path
      } else {
        for (const child of node.children) {
          dfs(child, currentPath);
        }
      }
  
      currentPath.pop();
    }
  
    dfs(root, []);
  
    return paths;
  }
  

export { getAvailableMoves, getChildren, getAllPaths }
import { useState } from 'react'
import './App.css'
import { Container, Stack } from '@mui/material';
import Board from './components/Board';
import { getAllPaths, getChildren } from './service/GameLogic';
import GameInput from './components/GameInput';
import PathTable from './components/PathTable';

interface BoardType {
  board: Array<number | string>;
  num: number;
  score: number;
  next: string;
  children: BoardType[];
  move: number;
  win: boolean;
}

function App() {
  const state = {
    board: ["O", 1, "X", "X", 4, "X", 6, "O", "O"],
    num: 1,
    score: 10,
    next: 'X',
    children: [],
    move: -1,
    win: false
  }
  getChildren(state)


  const [paths, setPaths] = useState(getAllPaths(state));
  paths.sort((a: Array<number>, b: Array<number>) => {
    if (a[a.length - 1] < b[b.length - 1]) {
      return 1;
    }
    if (a[a.length - 1] > b[b.length - 1]) {
      return -1;
    }
    // a must be equal to b
    return 0;
  })

  const getGameContent = (board: BoardType) => {

    const wrapper =
      <ul className="tree">
        <li>
          <span><Board
            board={state.board}
            num={state.num}
            score={state.score}
            move={state.move}
            win={state.win}
          />
          </span>
          {addChildren(state)}
        </li>
      </ul>

    function addChildren(node: BoardType) {
      const content = []
      if (node.children.length > 0) {
        const innerContent = []

        for (const [idx, child] of node.children.entries()) {
          innerContent.push(
            <li key={idx}>
              <span>
                <Board
                  board={child.board}
                  move={child.move}
                  score={child.score}
                  num={child.num}
                  win={child.win}
                >
                </Board>
              </span>
              {addChildren(child)}
            </li>
          )
        }
        content.push(<ul>{innerContent}</ul>)
      }
      return content
    }

    addChildren(board)
    return wrapper;
  }
  const [gameState, setGameState] = useState(getGameContent(state));

  const changeGameState = (newState) => {
    state.board = JSON.parse(JSON.stringify(newState))
    state.children = []
    getChildren(state)
    setGameState(getGameContent(state))
    setPaths(getAllPaths(state));
    paths.sort((a: Array<number>, b: Array<number>) => {
      if (a[a.length - 1] < b[b.length - 1]) {
        return 1;
      }
      if (a[a.length - 1] > b[b.length - 1]) {
        return -1;
      }
      // a must be equal to b
      return 0;
    })
  }

  return (
    <>
      <Container>
        <Stack direction={'row'} gap={'20px'}>
          <Stack alignItems={'center'} gap={'50px'}>
            <GameInput onChange={changeGameState} />
            <PathTable paths={paths} />
          </Stack>
          {gameState}
        </Stack>
      </Container>
    </>
  )
}

export default App

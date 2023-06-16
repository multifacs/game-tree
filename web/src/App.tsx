import { useState } from 'react'
import './App.css'
import { Container, Stack } from '@mui/material';
import Board from './components/Board';
import { getAllPaths, getChildren } from './service/GameLogic';
import GameInput from './components/GameInput';
import PathTable from './components/PathTable';
import DataMatrix from './components/DataMatrix';
// import { GridColDef } from '@mui/x-data-grid';

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

  const changeGameState = (newState: Array<number | string>) => {
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
        <Stack direction={'row'} gap={'20px'} justifyContent={'center'} alignItems={'center'}>
          <Stack alignItems={'center'} gap={'50px'}>
            <GameInput onChange={changeGameState} />
            <PathTable paths={paths} />
          </Stack>
          {gameState}
          <Stack justifyContent={'center'} alignItems={'center'} gap={'50px'}>
            <DataMatrix
              columns={[
                { field: 'xu', headerName: 'x/u', width: 50 },
                { field: 'u1', headerName: 'u1', width: 50 },
                { field: 'u2', headerName: 'u2', width: 50 },
              ]}
              rows={
                [
                  { id: 1, xu: "x1", u1: "-", u2: " " },
                  { id: 2, xu: "x2", u1: "+", u2: " " },
                  { id: 3, xu: "x3", u1: "-", u2: "+" },
                ]
              }
            />
            <DataMatrix
              columns={[
                { field: 'yv', headerName: 'y/v', width: 50 },
                { field: 'u1', headerName: 'u1', width: 50 },
              ]}
              rows={
                [
                  { id: 1, yv: "y1", u1: "+" },
                  { id: 2, yv: "y2", u1: "+" },
                  { id: 3, yv: "y3", u1: "-" },
                  { id: 4, yv: "y4", u1: "+" },
                ]
              }
            />
            <DataMatrix
              columns={[
                { field: 'xy', headerName: 'x/y', width: 50 },
                { field: 'y1', headerName: 'y1', width: 50 },
                { field: 'y2', headerName: 'y2', width: 50 },
                { field: 'y3', headerName: 'y3', width: 50 },
                { field: 'y4', headerName: 'y4', width: 50 },
              ]}
              rows={
                [
                  { id: 1, xy: "x1", y1: "1/3", y2: "1/6", y3: " ", y4: " ", },
                  { id: 2, xy: "x2", y1: " ", y2: " ", y3: " ", y4: " ", },
                  { id: 3, xy: "x3", y1: " ", y2: " ", y3: "1/6", y4: "1/6", },
                ]
              }
            />
          </Stack>
        </Stack>
      </Container>
    </>
  )
}

export default App

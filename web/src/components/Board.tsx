import { Box, Container } from '@mui/material';
import React from 'react'

const getWinningRow = (cells: Array<number | string>) => {
    if ((cells[0] == cells[1] && cells[1] == cells[2])) return [0, 1, 2];
    if ((cells[3] == cells[4] && cells[4] == cells[5])) return [3, 4, 5];
    if ((cells[6] == cells[7] && cells[7] == cells[8])) return [6, 7, 8];
    if ((cells[0] == cells[3] && cells[3] == cells[6])) return [0, 3, 6];
    if ((cells[1] == cells[4] && cells[4] == cells[7])) return [1, 4, 7];
    if ((cells[2] == cells[5] && cells[5] == cells[8])) return [2, 5, 8];
    if ((cells[0] == cells[4] && cells[4] == cells[8])) return [0, 4, 8];
    if ((cells[2] == cells[4] && cells[4] == cells[6])) return [2, 4, 6];
    return [];
}

const getCellsContent = (cells: Array<number | string>, move: number) => {
    const content = [];
    const winningRow = getWinningRow(cells);
    for (const [idx, item] of cells.entries()) {
        if (item == 'X' || item == 'O') {
            if (idx == move) {
                content.push(<div style={{ fontWeight: "bold", color: "red"}} key={idx}>{item}</div>);
            } else if (winningRow.includes(idx)) {
                content.push(<div style={{ fontWeight: "bold", color: "blue"}} key={idx}>{item}</div>);
            } else {
                content.push(<div key={idx}>{item}</div>);
            }
        } else {
            content.push(<div key={idx}>.</div>);
        }
    }
    return content;
};

function Board({ board, num = 1, score = 10, move = -1, win = false }) {
    let scoreColor = 'white'
    if (win) {
        if (score > 0) {
            scoreColor = 'green'
        } else {
            scoreColor = 'red'
        }
    }
    return (
        <Box sx={{
            position: 'relative',
            margin: '0 30px'
        }}>
            <div className='board'>{getCellsContent(board, move)}</div>
            <h1 className='board-num'>{num}</h1>
            <p className='board-score' style={{ color: scoreColor }}>Score: {score}</p>
        </Box>
    )
}

export default Board
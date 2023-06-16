import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'
// import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GameInput(props: any) {
    const [boardState, setBoardState] = useState([
        0, 1, 2, 3, 4, 5, 6, 7, 8
    ]);
    const changeBoardVal = (idx: number, val: string) => {
        const newState = JSON.parse(JSON.stringify(boardState))
        if (val == 'X' || val == "O") {
            newState[idx] = val
        } else {
            newState[idx] = idx
        }
        setBoardState(newState)
    }
    return (
        <Stack>
            <div className='game-input'>
                <TextField
                    onChange={e => changeBoardVal(0, e.target.value)}
                    hiddenLabel variant="filled" size="small" placeholder='O' sx={{ input: { color: 'red' } }} />
                <TextField
                    onChange={e => changeBoardVal(1, e.target.value)}
                    hiddenLabel variant="filled" size="small" placeholder='.' sx={{ input: { color: 'red' } }} />
                <TextField
                    onChange={e => changeBoardVal(2, e.target.value)}
                    hiddenLabel variant="filled" size="small" placeholder='X' sx={{ input: { color: 'red' } }} />
                <TextField
                    onChange={e => changeBoardVal(3, e.target.value)}
                    hiddenLabel variant="filled" size="small" placeholder='X' sx={{ input: { color: 'red' } }} />
                <TextField
                    onChange={e => changeBoardVal(4, e.target.value)}
                    hiddenLabel variant="filled" size="small" placeholder='.' sx={{ input: { color: 'red' } }} />
                <TextField
                    onChange={e => changeBoardVal(5, e.target.value)}
                    hiddenLabel variant="filled" size="small" placeholder='X' sx={{ input: { color: 'red' } }} />
                <TextField
                    onChange={e => changeBoardVal(6, e.target.value)}
                    hiddenLabel variant="filled" size="small" placeholder='.' sx={{ input: { color: 'red' } }} />
                <TextField
                    onChange={e => changeBoardVal(7, e.target.value)}
                    hiddenLabel variant="filled" size="small" placeholder='O' sx={{ input: { color: 'red' } }} />
                <TextField
                    onChange={e => changeBoardVal(8, e.target.value)}
                    hiddenLabel variant="filled" size="small" placeholder='O' sx={{ input: { color: 'red' } }} />
            </div>
            <Button onClick={() => props.onChange(boardState)}>Ввести</Button>
        </Stack>
    )
}

export default GameInput
import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import React from 'react'

function GameInput(props) {
    const [boardState, setBoardState] = useState([
        "O", 1, "X", "X", 4, "X", 6, "O", "O"
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
            <Button onClick={e => props.onChange(boardState)}>Ввести</Button>
        </Stack>
    )
}

export default GameInput
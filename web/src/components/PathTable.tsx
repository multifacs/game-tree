import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(scoreData: Array<Array<number>>) {
    const rows = [];
    for (const row of scoreData) {
        // const path = row.slice(0, -1)
        const score = row[row.length - 1]
        let pathString = ""
        for (const n of row.slice(0, row.length - 2)) {
            pathString += n
            pathString += "->"
        }
        pathString += row[row.length - 2]

        rows.push({ path: pathString, score })
    }
    return rows;
}

function PathTable({ paths }) {
    const rows = createData(paths)
    console.log(rows)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Путь</TableCell>
                        <TableCell align="right">Счёт</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        key={rows[0].path}
                        sx={{
                            '&:last-child td, &:last-child th': { border: 0 }
                        }}
                    >
                        <TableCell component="th" scope="row" sx={{
                            color: "red",
                            fontWeight: "bold"
                        }}>
                            {rows[0].path}
                        </TableCell>
                        <TableCell align="right" sx={{
                            color: "red",
                            fontWeight: "bold"
                        }}>{rows[0].score}</TableCell>
                    </TableRow>
                    {rows.slice(1).map((row) => (
                        <TableRow
                            key={row.path}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.path}
                            </TableCell>
                            <TableCell align="right">{row.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PathTable
'use client';

import {
    Table as MUITable,
    TableBody,
    TableCell,
    TableHead,
    TableRow, 
} from '@mui/material';
import styles from '../page.module.css';

export const Table = ({
    data,
    original,
}:{
    data: any[][];
    original?: any[][];
}) => {
    const columns = data[0];
    const rows = data.slice(1);
    const origRows = original?.slice(1);

    return (
        <MUITable>
            <TableHead>
                <TableRow>
                {columns.map((val) => (
                    <TableCell key={val}>{String(val)}</TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((colVal, i) => (
                    <TableRow key={i}>
                        {colVal.map((val, i2) => (
                            <TableCell
                                className={styles.cell}
                                key={`${val}_${i}`}
                                data-diff={
                                    val !== origRows?.[i]?.[i2] ? origRows?.[i]?.[i2]: undefined
                                }
                            >
                                {String(val)}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </MUITable>
    );
}
'use client';

import { Button, Card, CardActions, CardContent, CardHeader, MenuItem, Select, Stack } from "@mui/material";
import styles from '../page.module.css';
import { useRef } from "react";
import { Table } from "./table";

export const CSVBox = ({
   title,
   file,
   setFile, 
   primary,
   setPrimary,
   changing,
   setChanging,
   isMain = false,
   emptyHandler,
   setEmptyHandler,
}: {
    title: string;
    file: any;
    setFile: (val: any) => void;
    primary: string | null;
    setPrimary: (val: string | null) => void;
    isMain: boolean;
    changing: string | null;
    setChanging: (val: string | null) => void;
    emptyHandler?: string | null;
    setEmptyHandler?: (val: string | null) => void;
}) => {
    const readFile = (file: any): Promise<string> => (
        new Promise((res, rej) => {
            try {
                const fr = new FileReader();
                fr.onload = (evt) => res(evt.target?.result as string);
                fr.readAsText(file);
            } catch(err) {
                rej(err);
            }
        })
    );
    const ref = useRef<HTMLInputElement>(null);
    const fileSelected = async(evt: any) => {
        const [ file ] = evt.target.files;
        const content = await(readFile(file));
        const rows = content.replace(/\r/g, '').split(/\n/);
        const vals = rows.map(
            (val: string) => {
                const row = val.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
                return row
                    .map((colVal) => String(parseFloat(colVal)) === colVal ? parseFloat(colVal): colVal)
                    .map((colVal) => typeof(colVal) === 'string' ? colVal.replace(/\"$/, '').replace(/^\"/, ''): colVal);
            }
        ).filter((row, i, self) => (
            self.length -1 !== i || row.length > 1 || row[0] !== ''
        ));
        setFile(vals);
    }

    return (
        <Card className={`${styles.fullWidth} ${styles.fixedHeight}`}>
            <CardHeader
            title={title}
            titleTypographyProps={{ align: 'center' }}
            >
            </CardHeader>
            { file ? (
                <CardContent className={styles.table}>
                    <Table data={file}/>
                </CardContent>
            ) : (
                <CardActions className={styles.centered}>
                    <input 
                        style={{display: "none" }}
                        type="file"
                        accept=".csv"
                        ref={ref} 
                        onChange={fileSelected}
                    />
                    <Button
                        variant="contained"
                        onClick={() => ref?.current?.click()}
                    >Add File</Button>
                </CardActions>
            )}
            { file ? (
                <CardContent>
                    <Stack direction="row">
                        <label>
                            <span className={styles.questionSpan}>
                                Which is the primary column?
                            </span>
                            <Select
                                className={styles.questionAnswer}
                                size="small"
                                value={primary}
                                onChange={(evt) => {setPrimary(evt.target.value as string)}}
                            >
                                { file[0].map((col: string) => (
                                    <MenuItem key={col} value={col}>{col}</MenuItem>
                                ))}
                            </Select>
                        </label>
                    </Stack>
                </CardContent>
            ): null }
            { primary ? (
                <CardContent>
                    <Stack direction="row">
                        <label>
                            <span className={styles.questionSpan}>
                                { isMain? 'Which column is being overwritten?': 'Which column is being copied?' }
                            </span>
                            <Select
                                className={styles.questionAnswer}
                                size="small"
                                value={changing}
                                onChange={(evt) => {setChanging(evt.target.value as string)}}
                            >
                                { file[0].filter((col: string) => col !== primary).map((col: string) => (
                                    <MenuItem key={col} value={col}>{col}</MenuItem>
                                ))}
                            </Select>
                        </label>
                    </Stack>
                </CardContent>
            ): null }
            { changing && isMain ? (
                <CardContent>
                    <Stack direction="row">
                        <label>
                            <span className={styles.questionSpan}>
                                If the row doesn&apos;t exist in the &quot;New Info File&quot;
                            </span>
                            <Select
                                className={styles.questionAnswer}
                                size="small"
                                value={emptyHandler}
                                onChange={(evt) => {setEmptyHandler!(evt.target.value as string)}}
                            >
                                <MenuItem value="blank">Leave it blank</MenuItem>
                                <MenuItem value="original">Use the original value</MenuItem>
                            </Select>
                        </label>
                    </Stack>
                </CardContent>
            ): null }
        </Card>
    )
}
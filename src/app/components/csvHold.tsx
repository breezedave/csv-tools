'use client';

import { Button, Card, CardActions, CardContent, CardHeader, Stack } from "@mui/material";
import { useState } from "react"
import { CSVBox } from "./csvBox";
import { Table } from "./table";
import { tableCombo } from "../utils/tableCombo";

export const CSVHold = () => {
    const [mainFile, setMainFile] = useState(null);
    const [mainPrimary, setMainPrimary] = useState<string|null>(null);
    const [mainChanging, setMainChanging] = useState<string|null>(null);
    const [newInfoFile, setNewInfoFile] = useState(null);
    const [infoPrimary, setInfoPrimary] = useState<string|null>(null);
    const [infoChanging, setInfoChanging] = useState<string|null>(null);
    const [emptyHandler, setEmptyHandler] = useState<string|null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const result = mainFile &&
        mainPrimary &&
        mainChanging &&
        newInfoFile &&
        infoPrimary &&
        infoChanging &&
        emptyHandler ? 
    (
        tableCombo({
            main: mainFile,
            mainPrimary,
            mainChanging,
            info: newInfoFile,
            infoPrimary,
            infoChanging,
            emptyHandler,
        }
    )): null;
    
    const download = async() => {
        setIsProcessing(true);
        await dataToFile();
        setIsProcessing(false);
    };

    const dataToFile = async() => {
        const data = result?.map((row) => (
            row.reduce((prev, val) => (
                `${prev},${typeof val === 'string' ? `"${val}"`: val}`
            ), '').substring(1)
        )).join('\n');

        const file = new File([data!], "download.csv", {
            type:"text/csv",
        });
        
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(file);
        a.setAttribute('download', 'download.csv');
        a.click();
    };
    
    return (
        <Stack direction="column" spacing={5}>
            <Stack direction="row" spacing={5}> 
                <CSVBox 
                    title="Main File"
                    file={mainFile}
                    setFile={setMainFile}
                    primary={mainPrimary}
                    setPrimary={setMainPrimary}
                    changing={mainChanging}
                    setChanging={setMainChanging}
                    isMain={true}
                    emptyHandler={emptyHandler}
                    setEmptyHandler={setEmptyHandler}
                />
                <CSVBox 
                    title="New Info File"
                    file={newInfoFile}
                    setFile={setNewInfoFile}
                    primary={infoPrimary}
                    setPrimary={setInfoPrimary}
                    changing={infoChanging}
                    setChanging={setInfoChanging}
                    isMain={false}
                />
            </Stack>
            {
                mainFile &&
                mainPrimary &&
                mainChanging &&
                newInfoFile &&
                infoPrimary &&
                infoChanging &&
                emptyHandler ? 
            (
                <Card>
                    <CardHeader
                        title="Preview & Download"
                        titleTypographyProps={{ align: 'center' }}
                    />
                    <CardContent>
                        <span>Click to Download</span>
                        <span>{' '}</span>
                        <Button
                            variant="contained"
                            onClick={download}
                            disabled={isProcessing}
                        >Download</Button>
                    </CardContent>
                    <CardContent>
                        <Table 
                            data={result!}
                            original={mainFile}
                        />
                    </CardContent>
                </Card>
            ) : null }       
        </Stack>

    )
}
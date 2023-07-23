export const tableCombo = (
    {
        main,
        mainPrimary,
        mainChanging,
        info,
        infoPrimary,
        infoChanging,
        emptyHandler,
    }: {
        main: any[][];
        mainPrimary: string;
        mainChanging: string;
        info: any[][];
        infoPrimary: string;
        infoChanging: string;
        emptyHandler: string;
    }
) => {
    const [colHeaders, ...mainRows] = main;
    const [infoHeaders, ...infoRows] = info
    const mainPrimaryI = colHeaders.indexOf(mainPrimary);
    const mainChangeI = colHeaders.indexOf(mainChanging);
    const infoPrimaryI = infoHeaders.indexOf(infoPrimary);
    const infoChangI = infoHeaders.indexOf(infoChanging);


    return [
        colHeaders,   
        ...mainRows.map((row) => {
            const newVal = [...row];
            const newInfoRow = infoRows.find((infoRow) => infoRow[infoPrimaryI] === row[mainPrimaryI]);
            if (newInfoRow) {
                newVal[mainChangeI] = newInfoRow[infoChangI];
                return newVal;
            } 
            if (emptyHandler === 'blank') {
                newVal[mainChangeI] = ''; 
            }
            return newVal;
        }),
    ];
};
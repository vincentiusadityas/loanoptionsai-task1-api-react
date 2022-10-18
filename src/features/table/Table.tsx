import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { add, loadDataAsync, remove, RowData, selectTableData } from './tableSlice';
import styles from './Table.module.css';
import { Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

export function DataTable() {

    let tableRef: any;
    let lastRowRef: any;

    const tableData = useAppSelector(selectTableData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("tableData:", tableData)
    }, [tableData])

    useEffect(() => {
        if (!tableData.firstLoad && tableData.data.length && lastRowRef) lastRowRef.scrollIntoView();
    }, [tableData, lastRowRef])

    useEffect(() => {
        if (tableData.firstLoad && tableData.data.length && tableRef) {
            tableRef.scrollIntoView();
        };
    }, [tableData, tableRef])

    const scrollToLastRow = () => {
        if (lastRowRef) {
            console.log("lastRowRef:", lastRowRef)
            lastRowRef.scrollIntoView();
        } else {
            console.log("none")
        }
    }

    const getTableContent = (data: RowData[]) => {

        const setRef = (index: any, len: any, r: any) => {
            if (index === len-1) {
                lastRowRef = r
            }
        }

        const header = Object.keys(data[0])
        const iterateItem = () => {
            return data.map((item: RowData, j: any) => {
                return (
                    <TableRow key={j} ref={(r) => setRef(j, data.length, r)}>
                        <TableCell>{item.domains?.join(', ')}</TableCell>
                        <TableCell>{item.country}</TableCell>
                        <TableCell>{item['state-province']}</TableCell>
                        <TableCell>{item.web_pages?.join(', ')}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.alpha_two_code}</TableCell>
                    </TableRow>
                );
            })
        }

        return (
            <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={2}>
                <TableContainer sx={{ maxHeight: '100%' }}>
                    <Table stickyHeader aria-label="sticky table" ref={(r) => tableRef = r}>
                        <TableHead>
                            <TableRow>
                                {header.map((h, i) => (
                                    <TableCell key={i} className={styles.tableHeader}>
                                        {h}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {iterateItem()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        );

    };

    return (
        <div className={styles.root}>
            <div className={styles.buttonWrapper}>
                <Button
                    variant='contained'
                    className={styles.button}
                    onClick={() => dispatch(loadDataAsync())}
                >
                    LOAD
                </Button>
                <Button
                    variant='contained'
                    className={styles.button}
                    onClick={() => {
                        dispatch(add())
                        scrollToLastRow()
                    }}
                    disabled={tableData.data.length === 0}
                >
                    ADD
                </Button>
                <Button
                    variant='contained'
                    className={styles.button}
                    onClick={() => dispatch(remove())}
                    disabled={tableData.data.length === 0}
                >
                    DELETE
                </Button>
            </div>
            {tableData.data && tableData.data.length !== 0 ?
                <>
                    {getTableContent(tableData.data)}
                    <div className={styles.buttonWrapper}>
                        <Button
                            variant='contained'
                            className={styles.button}
                            onClick={() => dispatch(loadDataAsync())}
                        >
                            LOAD
                        </Button>
                        <Button
                            variant='contained'
                            className={styles.button}
                            onClick={() => {
                                dispatch(add())
                                scrollToLastRow()
                            }}
                        >
                            ADD
                        </Button>
                        <Button
                            variant='contained'
                            className={styles.button}
                            onClick={() => dispatch(remove())}
                        >
                            DELETE
                        </Button>
                    </div>
                </>
                :
                <></>
            }

        </div>
    )
}
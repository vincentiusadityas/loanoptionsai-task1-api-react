import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTableData } from './tableAPI';
import { add, loadDataAsync, remove, RowData, selectTableData, TableState } from './tableSlice';
import styles from './Table.module.css';

export function Table() {

    const tableData = useAppSelector(selectTableData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("STATUS:", tableData.status)
    }, [tableData])

    const getTableContent = (data: RowData[]) => {

        const header = Object.keys(data[0])
        const iterateItem = () => {
            return data.map((item: RowData, j: any) => {
                return (
                    <tr key={j}>
                        <td>{item.domains?.join(', ')}</td>
                        <td>{item.country}</td>
                        <td>{item['state-province']}</td>
                        <td>{item.web_pages?.join(', ')}</td>
                        <td>{item.name}</td>
                        <td>{item.alpha_two_code}</td>
                    </tr>
                );
            })
        }

        return (
            <table className={styles.table}>
                <thead>
                    <tr>
                        {header.map((h, i) => (
                            <th key={i}>
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {iterateItem()}
                </tbody>
            </table>
        );

    };

    return (
        <div>
            <div className={styles.buttonWrapper}>
                <button
                    className={styles.button}
                    onClick={() => dispatch(loadDataAsync())}
                >
                    LOAD
                </button>
                <button
                    className={styles.button}
                    onClick={() => dispatch(add())}
                >
                    ADD
                </button>
                <button
                    className={styles.button}
                    onClick={() => dispatch(remove())}
                >
                    DELETE
                </button>
            </div>
            {tableData.data && tableData.data.length !== 0 ?
                <>
                    {getTableContent(tableData.data)}
                    <div className={styles.buttonWrapper}>
                        <button
                            className={styles.button}
                            onClick={() => dispatch(loadDataAsync())}
                        >
                            LOAD
                        </button>
                        <button
                            className={styles.button}
                            onClick={() => dispatch(add())}
                        >
                            ADD
                        </button>
                        <button
                            className={styles.button}
                            onClick={() => dispatch(remove())}
                        >
                            DELETE
                        </button>
                    </div>
                </>
                :
                <></>
            }

        </div>
    )
}
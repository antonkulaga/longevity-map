'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
    ColDef,
    ColGroupDef,
    Grid,
    GridOptions,
    GridReadyEvent,
} from 'ag-grid-community';
import { IOlympicData } from './interfaces';

function dateComparator(date1: string, date2: string) {
    const date1Number = monthToComparableNumber(date1);
    const date2Number = monthToComparableNumber(date2);
    if (date1Number === null && date2Number === null) {
        return 0;
    }
    if (date1Number === null) {
        return -1;
    }
    if (date2Number === null) {
        return 1;
    }
    return date1Number - date2Number;
}

// eg 29/08/2004 gets converted to 20040829
function monthToComparableNumber(date: string) {
    if (date === undefined || date === null || date.length !== 10) {
        return null;
    }
    const yearNumber = Number.parseInt(date.substring(6, 10));
    const monthNumber = Number.parseInt(date.substring(3, 5));
    const dayNumber = Number.parseInt(date.substring(0, 2));
    return yearNumber * 10000 + monthNumber * 100 + dayNumber;
}

const  Database = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<IOlympicData[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'athlete', sort: 'desc' },
        { field: 'age', width: 90 },
        { field: 'country' },
        { field: 'year', width: 90, unSortIcon: true },
        { field: 'date', comparator: dateComparator },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            width: 170,
            sortable: true,
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data: IOlympicData[]) => setRowData(data));
    }, []);

    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact<IOlympicData>
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default Database
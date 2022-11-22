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
import { ILongevityRow } from './interfaces';

const  Database = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '85%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<ILongevityRow[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'id', sortable: true, width: 70,},
        { field: 'quickyear', sortable: true,filter: 'agNumberColumnFilter', width: 115},
        { field: 'population_id', filter: 'agTextColumnFilter', width: 140},
        { field: 'study_design', width: 310 },
        { field: 'conclusions', width: 390 },
        { field: 'association', width: 120 },
        { field: 'gender', filter: 'agTextColumnFilter', width: 120 },
        { field: 'gene_symbol', filter: 'agTextColumnFilter', width: 140 },
        { field: 'genotypes', width: 130 },
        { field: 'Genotype longevity weight', width: 160 },
        { field: 'quickpubmed' , width: 140 },
        { field: 'Gene prioritization', sortable: true, sort: 'desc', width: 150},
        { field: 'location', filter: 'agTextColumnFilter', width: 120},
        { field: 'quickref', },
        { field: 'gene_id', sortable: true,width: 100,},
        { field: 'identifier_alt', width: 120,},
    ]);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            resizable: true,
            autoHeight: true,
            wrapText: true,
            wrapHeaderText: true,
            autoHeaderHeight: true,
            filterParams: {
                debounceMs: 0,
                buttons: ['apply', 'reset'],
            }
        };
    }, []);

    const gridOptions = {
        defaultColDef: {
            resizeable: true,
            initialWidth: 200,
            wrapHeaderText: true,
            autoHeaderHeight: true,
        },
        columnDefs: columnDefs,
    };

    const rowHeight = 30;

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('/api/longevity')
            .then((resp) => resp.json())
            .then((data: ILongevityRow[]) => setRowData(data));
    }, []);

    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact <ILongevityRow>
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    colResizeDefault={'shift'}
                    rowHeight={rowHeight}
                ></AgGridReact>
            </div>
        </div>
    );
};


export default Database
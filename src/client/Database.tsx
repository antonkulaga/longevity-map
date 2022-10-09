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
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<ILongevityRow[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'id', sortable: true, width: 10},
        { field: 'quickyear', sortable: true,filter: 'agNumberColumnFilter', width: 10},
        { field: 'population_id', filter: 'agNumberColumnFilter'},
        { field: 'study_design', width: 300 },
        { field: 'conclusions', },
        { field: 'association' },
        { field: 'gender', filter: 'agTextColumnFilter',},
        { field: 'identifier_alt' },
        { field: 'gene_symbol', filter: 'agTextColumnFilter' },
        { field: 'genotypes',},
        { field: 'Genotype longevity weight' },
        { field: 'Skip' },
        { field: 'quickpubmed' },
        { field: 'Gene prioritization', sortable: true, sort: 'desc'},
        { field: 'location', filter: 'agTextColumnFilter'},
        { field: 'quickref' },
        { field: 'gene_id', sortable: true,},
    ]);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            wrapHeaderText: true,
            autoHeaderHeight: true,
            wrapText: true,
            resizable: true,
            autoHeight: true,
            flex: 1,
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

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('/api/longevity')
            .then((resp) => resp.json())
            .then((data: ILongevityRow[]) => setRowData(data));
    }, []);


    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact<ILongevityRow>
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
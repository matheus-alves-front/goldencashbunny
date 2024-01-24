import { SpaceTableType, TableColumnType, TableDataType } from "@/@types/globalTypes";

export type FormattedRowsColumns = {
  id: string,
  rowReference: number,
  columns: {
    columnId: string,
    columnReference: number,
    columnType: string,
    rowValue: string
  }[]
};


export function transformTableData(spaceTable: SpaceTableType): FormattedRowsColumns[] {
  if (!spaceTable.columns || spaceTable.columns.length === 0) {
    return [];
  }

  const numberOfRows = spaceTable.columns.reduce((max, column) => Math.max(max, column.rows.length), 0);
  let allRows: FormattedRowsColumns[] = Array.from({ length: numberOfRows }, () => ({ id: '', rowReference: 0, columns: [] }));

  spaceTable.columns.forEach(column => {
    for (let i = 0; i < numberOfRows; i++) {
      const row = column.rows.find(r => r.rowReference === i);
      allRows[i].columns[column.columnReference] = {
        columnId: column.id,
        columnType: column.columnType,
        columnReference: column.columnReference,
        rowValue: row ? row.rowValue : ''
      };
    }
  });

  allRows.forEach((row, index) => {
    row.id = `row-${index}`; // Assumindo que você deseja um ID único para cada linha
    row.rowReference = index;
  });

  return allRows;
}
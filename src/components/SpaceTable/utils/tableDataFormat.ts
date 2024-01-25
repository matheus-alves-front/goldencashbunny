import { SpaceTableType, TableColumnType, TableDataType } from "@/@types/globalTypes";

export type FormattedRowsColumns = {
  id: string,
  rowReference: number,
  columns: {
    columnId: string,
    columnReference: number,
    columnType: string,
    rowValue: string
    rowId: string
  }[]
};


export function transformTableData(spaceTable: SpaceTableType) {
  if (!spaceTable.columns || spaceTable.columns.length === 0) {
    return [];
  }

  // Inicializa o array de todas as linhas da tabela
  let allRows = [] as FormattedRowsColumns[];

  // Percorre cada coluna para acessar as linhas
  spaceTable.columns.forEach(column => {
    column.rows.forEach(row => {
      // Verifica se a linha já existe no array allRows
      let existingRow = allRows.find(r => r.rowReference === row.rowReference);

      if (existingRow) {
        // Se a linha já existe, adiciona o valor da coluna atual
        existingRow.columns.push({
          columnId: column.id,
          columnType: column.columnType,
          columnReference: column.columnReference,
          rowValue: row.rowValue,
          rowId: row.id
        });
      } else {
        // Se a linha não existe, cria uma nova linha
        allRows.push({
          id: String(row.rowReference),
          rowReference: row.rowReference,
          columns: [{
            columnId: column.id,
            columnType: column.columnType,
            columnReference: column.columnReference,
            rowValue: row.rowValue,
            rowId: row.id
          }]
        });
      }
    });
  });

  return allRows;
}

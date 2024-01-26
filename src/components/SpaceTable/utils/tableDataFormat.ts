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

export function transformTableRowColumns(spaceTable: SpaceTableType) {
  if (!spaceTable.columns || spaceTable.columns.length === 0) {
    return [];
  }

  // Inicializa o array de todas as linhas da tabela
  let allRows = [] as FormattedRowsColumns[];

  // Cria um conjunto para rastrear todas as referências de linha únicas
  let allRowReferences = new Set<number>();
  spaceTable.columns.forEach(column => {
    column.rows.forEach(row => {
      allRowReferences.add(row.rowReference);
    });
  });

  // Percorre todas as referências de linha
  allRowReferences.forEach(rowRef => {
    // Cria uma nova linha com referências e colunas vazias
    let newRow: FormattedRowsColumns = {
      id: String(rowRef),
      rowReference: rowRef,
      columns: []
    };

    // Percorre cada coluna para adicionar valores de linha ou vazio
    spaceTable.columns.forEach(column => {
      let row = column.rows.find(r => r.rowReference === rowRef);

      if (row) {
        newRow.columns.push({
          columnId: column.id,
          columnType: column.columnType,
          columnReference: column.columnReference,
          rowValue: row.rowValue,
          rowId: row.id
        });
      } else {
        newRow.columns.push({
          columnId: column.id,
          columnType: column.columnType,
          columnReference: column.columnReference,
          rowValue: '', // Valor vazio para linhas ausentes
          rowId: '' // ID vazio para linhas ausentes
        });
      }
    });

    allRows.push(newRow);
  });

  return allRows;
}


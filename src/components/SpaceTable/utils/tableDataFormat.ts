import { TableColumnType, TableDataType } from "@/@types/globalTypes";

export type FormattedTableData = {
  [key: string]: Omit<TableDataType, 'columnName'>;
};

interface TableRow {
  [key: string]: FormattedTableData;
}

export function formatTableData(data: TableDataType[]): FormattedTableData[] {
  return data.map(item => {
    const { columnName, ...restOfItem } = item;
    return { [columnName]: restOfItem };
  });
}
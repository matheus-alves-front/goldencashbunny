export const ColumnTypes = [
  'TEXT',
  'NUMBER',
  'CHECKBOX',
  'DATE',
  'FILE',
  'CLIENT',
  'CATALOG'
]

export const COLUMN_TYPES_LABELS = {
  TEXT: 'Texto',
  NUMBER: 'Numérico',
  CHECKBOX: 'Checkbox',
  DATE: 'Data',
  FILE: 'Arquivo',
  CLIENT: 'Cliente',
  CATALOG: 'Item Catálogo'
}

export const ColumnFormat = {
  NUMBER: {
    CURRENCY_REAL: {
      regex: 'afdsa',
    },
    CURRENCY_DOLLAR: {
      regex: 'fsdafas'
    },
    INT: {
      regex: ''
    },
    DECIMAL: {
      regex: ''
    },
  },
  FILE: [
    
  ],
  CLIENT: [

  ],
  CATALOG: [

  ]
}
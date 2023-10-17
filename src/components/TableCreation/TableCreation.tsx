"use client"
import styles from './tablecreation.module.scss'

export function TableCreation() {
  const TableColumns = [
    'nome',
    'quantidade',
    'data'
  ] as string[]

  const TableData = [
    {
      nome: 'aaaa',
      quantidade: 2,
      data: '30/03/2000'
    },
    {
      nome: 'vvvv',
      quantidade: 4,
      data: '30/03/2320'
    },
    {
      nome: 'eeee',
      quantidade: 4,
      data: '30/03/2320'
    }
  ] as any[]

  return (
    <section className={styles.Content}>
      <input
        className={styles.InputName} 
        placeholder="Nome da Tabela" 
        type="text" 
      />
      <table>
        <thead>
          <tr>
            {TableColumns.map(column => (
              <th key={column}>
                {column}
              </th>
            ))}

            {/* Fixed THeads */}
            <th  
              className={styles.creation}
            >
              <button 
                onClick={() => console.log('heuaheua')} 
              >
                + Adicionar Coluna
              </button>
              <dialog open>
                <h4>hiii</h4>
              </dialog>
            </th>
            {TableColumns.length < 1 && 
              <th className={styles.empty}></th>
            }
            <th>
              Açoes
            </th>
          </tr>
        </thead>
        <tbody>
          {TableData.map((item, index) => (
            <tr key={index}>
              {TableColumns.map(column => (
                <td key={column}>{item[column]}</td>
              ))}

              {/* Fixed Columns */}
              <td className={styles.creation}>
                <input 
                  type="text" 
                />
              </td>
              {TableColumns.length < 1 && 
                <td className={styles.empty}></td>
              }
              <td>
                <button>Detalhes</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
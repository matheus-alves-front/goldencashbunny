import styles from "./spacetable.module.scss"

export function SpaceTable() {
  return (
    <div className={styles.tableGroup}>
      <div className={styles.tableSummary}>
        <h2>Nome da Tabela</h2>
      </div>
      <table className={styles.table} border={0}>
        <thead>
            <tr>
              <th>Nome</th>
              <th>N Inteiro</th>
              <th>N Decimal</th>
              <th>Valor R$</th>
              <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
              <td>ContratoX</td>
              <td>1</td>
              <td>3.04</td>
              <td>R$500,00</td>
              <td>
                <button>
                  Ver Detalhes
                </button>
              </td>
            </tr>
            <tr>
              <td>ContratoX</td>
              <td>1</td>
              <td>3.04</td>
              <td>R$500,00</td>
              <td>
                <button>
                  Ver Detalhes
                </button>
              </td>
            </tr>
            <tr>
              <td>ContratoX</td>
              <td>1</td>
              <td>3.04</td>
              <td>R$500,00</td>
              <td>
                <button>
                  Ver Detalhes
                </button>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}
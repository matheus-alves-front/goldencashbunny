import { HiOutlinePlus } from "react-icons/hi";
import styles from "./page.module.scss"
import { SpaceTable } from "@/components/SpaceTable/SpaceTable";

export default function SpacePage({
  params
}: {
  params: { 
    space: string,
    workspacename: string  
  }
}) {
  const {
    space: spaceName
  } = params
  return (
    <>
      <h1 className={styles.pageTitle}>
        {spaceName} 
        <button className={styles.button}>
          <HiOutlinePlus />
        </button>
        <span className={styles.badge}><small>Criar Categoria</small></span>
      </h1>
      <section>
        <SpaceTable /> 
      </section>
    </>
  )
}
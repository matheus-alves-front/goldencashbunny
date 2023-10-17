import { HiOutlinePlus } from "react-icons/hi";
import styles from "./page.module.scss"
import { SpaceTable } from "@/components/SpaceTable/SpaceTable";
import Link from "next/link";

export default function SpacePage({
  params
}: {
  params: { 
    space: string,
    workspacename: string  
  }
}) {
  const {
    workspacename,
    space: spaceName
  } = params
  return (
    <>
      <h1 className={styles.pageTitle}>
        {spaceName} 
        <Link href={`/workspace/${workspacename}/space/${spaceName}/create-table`} className={styles.button}>
          <HiOutlinePlus />
        </Link>
        <span className={styles.badge}><small>Criar Categoria</small></span>
      </h1>
      <section>
        <SpaceTable /> 
      </section>
    </>
  )
}
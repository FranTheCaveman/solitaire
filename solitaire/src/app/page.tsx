import styles from "./page.module.css";
import Board from "solitaire/components/Board";


export default function Home() {
  return <main className={styles.main}>
    <Board/>
  </main>
}

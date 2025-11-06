import styles from "./page.module.css";
import Card from "solitaire/components/Card";
import Board from "solitaire/components/Board";


export default function Home() {
  return <main className={styles.main}>
    <Board/>
  </main>
}

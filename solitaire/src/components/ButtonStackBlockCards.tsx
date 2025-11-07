import React from "react";
import styles from "./ButtonStackBlockCards.module.css";

export interface StackBlockCardsButtonProps {
  suit: string;
}

export default function StackBlockCardsButton({ suit }: StackBlockCardsButtonProps) {
  return (
    <div className={styles.StackBlockCardsButton}>
      <span className={styles.suitIcon}>{suit}</span>
    </div>
  );
};
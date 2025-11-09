import React from "react";
import styles from "./ButtonStackBlockCards.module.css";
import { blocks } from "solitaire/data/cardDefinitions";
import { JSX } from "react";

export interface StackBlockCardsButtonProps {
  suit: string;
}

export function StackBlockCardsButton({ suit }: StackBlockCardsButtonProps) {
  return (
    <div className={styles.StackBlockCardsButton}>
      <span className={styles.suitIcon}>{suit}</span>
    </div>
  );
};

export function StackBlockCardsButtons() {
  return (
    <>
      {blocks.map((card, index) => (
        <StackBlockCardsButton key={"stackBlockButton-" + index} suit={card.suit} />
      ))}
    </>
  )
}

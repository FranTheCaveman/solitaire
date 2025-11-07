import React from "react";
import styles from "./Slot.module.css";
export type SlotVariant = "storage" | "done" | "flower";
import { flower } from "solitaire/data/cardDefinitions";

export interface SlotProps {
  variant?: SlotVariant;
  className?: string;
  children?: React.ReactNode;
};

const variantMap: Record<SlotVariant, string> = {
  storage: (styles as any).storageSlot || "",
  done: (styles as any).doneSlot || "",
  flower: (styles as any)?.flowerSlot || "",
};

function FlowerIcon() {
  return (<span className={styles.flowerIcon}>{flower.suit}</span>)
}

export default function Slot({ variant = "storage", className = "", children }: SlotProps) {
  const base = variantMap[variant] || "";
  return (
    <div className={`${base} ${className}`.trim()}>
      {variant === "flower" && <FlowerIcon />}
      {children}
    </div>
  );
};
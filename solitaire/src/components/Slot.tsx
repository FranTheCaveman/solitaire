import React from "react";
import styles from "./Slot.module.css";
export type SlotVariant = "freecell" | "foundation" | "flower";
import { flower } from "solitaire/data/cardDefinitions";
import { useDroppable } from "@dnd-kit/core";
export interface SlotProps {
  variant?: SlotVariant;
  children?: React.ReactNode;
  droppable?: boolean;
  slotID: string;
};

const variantMap: Record<SlotVariant, string> = {
  freecell: (styles as any).freecellSlot || "",
  foundation: (styles as any).foundationSlot || "",
  flower: (styles as any)?.flowerSlot || "",
};

function FlowerIcon() {
  return (<span className={styles.flowerIcon}>{flower.suit}</span>)
}

export default function Slot({ slotID, variant = "freecell", droppable=true, children }: SlotProps) {
  const base = variantMap[variant] || "";

  const {isOver, setNodeRef} = useDroppable({
    id: slotID,
  });

  return (
    <div ref={setNodeRef} className={`${base} ${isOver ? styles.isOver : ""}`.trim()}>
      {variant === "flower" && <FlowerIcon />}
      {children}
    </div>
  );
};
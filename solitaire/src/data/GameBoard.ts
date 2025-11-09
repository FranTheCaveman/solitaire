import { SlotProps } from "solitaire/components/Slot";
import { dealCardsIntoColumns } from "./generateCards";
import { CardProps } from "solitaire/components/Card";
import { flower } from "./cardDefinitions";

export const MAX_CARD_COLUMNS = 8;
export const MAX_FREECELL_SLOTS = 3;
export const MAX_FOUNDATION_SLOTS = 3;
export const MAX_FLOWER_SLOTS = 1;

export interface SlotObject {
    variant: SlotProps["variant"];
    slotID: string;
    cards: CardProps[];
}
export interface GameBoardProps {
    tableau: CardProps[][],
    freecells: SlotObject[];
    foundations: SlotObject[];
    flower: SlotObject[];
}

function setSlots(max: number, slotVariant: SlotProps["variant"]): SlotObject[] {
    const slots: SlotObject[] = [];
    for (let i = 0; i < max; i++) {
        slots.push({
            variant: slotVariant,
            slotID: `${slotVariant}Slot-${i}`,
            cards: [],
        });
    }
    return slots;
}

/***
 * Moves card to slot
 * Returns updated gameboard
 ***/
export function moveCardToSlot(
  gameBoard: GameBoardProps,
  cardID: string,
  destinationSlotID: string
): GameBoardProps {
  let cardToMove: CardProps | undefined;

  // remove from tableau (columns)
  const newTableau = gameBoard.tableau.map(column => {
    const index = column.findIndex(card => card.cardID === cardID);
    if (index > -1) {
      cardToMove = column[index];
      return column.filter(card => card.cardID !== cardID);
    }
    return column;
  });

  // helper to remove from slot arrays (freecells / foundations / flower)
  const removeFromSlots = (slots: SlotObject[]) => {
    return slots.map(slot => {
      const index = slot.cards.findIndex(card => card.cardID === cardID);
      if (index > -1) {
        cardToMove = slot.cards[index];
        return { ...slot, cards: slot.cards.filter(card => card.cardID !== cardID) };
      }
      return slot;
    });
  };

  const newFreecells = removeFromSlots(gameBoard.freecells);
  const newFoundations = removeFromSlots(gameBoard.foundations);
  const newFlower = removeFromSlots(gameBoard.flower);

  if (!cardToMove) {
    // not found, return original
    return gameBoard;
  }

  // helper to add to the destination slot array
  const addToSlots = (slots: SlotObject[]) =>
    slots.map(slot => slot.slotID === destinationSlotID ? { ...slot, cards: [...slot.cards, cardToMove!] } : slot);

  let finalFreecells = newFreecells;
  let finalFoundations = newFoundations;
  let finalFlower = newFlower;

  if (newFreecells.some(slot => slot.slotID === destinationSlotID)) {
    finalFreecells = addToSlots(newFreecells);
  } else if (newFoundations.some(slot => slot.slotID === destinationSlotID)) {
    finalFoundations = addToSlots(newFoundations);
  } else if (newFlower.some(slot => slot.slotID === destinationSlotID)) {
    finalFlower = addToSlots(newFlower);
  } else {
    // destination not a managed slot — return updated tableau and cleaned slots
    return { ...gameBoard, tableau: newTableau, freecells: newFreecells, foundations: newFoundations, flower: newFlower };
  }

  return {
    ...gameBoard,
    tableau: newTableau,
    freecells: finalFreecells,
    foundations: finalFoundations,
    flower: finalFlower,
  };
}

// get starting gameBoard
export function setStartingGameBoard(cardsArray: CardProps[]) {
    const gameBoard: GameBoardProps = {
            tableau: dealCardsIntoColumns(cardsArray),
            freecells: setSlots(MAX_FREECELL_SLOTS, "freecell"),
            foundations: setSlots(MAX_FREECELL_SLOTS, "foundation"),
            flower: setSlots(MAX_FLOWER_SLOTS, "flower"),
        }; 
    
    return gameBoard;
};
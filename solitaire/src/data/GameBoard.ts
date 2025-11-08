import { dealCardsIntoColumns } from "./generateCards";
import { CardProps } from "solitaire/components/Card";

export const MAX_CARD_COLUMNS = 8;
export const MAX_FREECELL_SLOTS = 3;
export const MAX_FOUNDATION_SLOTS = 3;

export interface GameBoardProps {
    tableau: CardProps[][], // AKA tableau
    freecells: (CardProps | null)[], 
    foundations: CardProps[][]
}

// get starting gameBoard
export function setStartingGameBoard(cardsArray: CardProps[]) {
    const gameBoard: GameBoardProps = {
            tableau: dealCardsIntoColumns(cardsArray),
            freecells: Array(MAX_FREECELL_SLOTS).fill(null),
            foundations: Array(MAX_FOUNDATION_SLOTS).fill([]),
        }; 
    
    return gameBoard;
};
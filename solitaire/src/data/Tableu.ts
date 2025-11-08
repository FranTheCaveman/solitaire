import { dealCardsIntoColumns, generateRandomPlayingCards } from "./generateCards";
import { CardProps } from "solitaire/components/Card";

export const MAX_CARD_COLUMNS = 8;
export const MAX_FREECELL_SLOTS = 3;

export interface TableuProps {
    columns: CardProps[][], 
    freecells: (CardProps | null)[], 
    foundations: CardProps[][]
}

// get starting tableu
export function getTableau() {
    const tableu: TableuProps = {
            columns: dealCardsIntoColumns(generateRandomPlayingCards()),
            freecells: Array(MAX_FREECELL_SLOTS).fill(null),
            foundations: [[], [], []],
        }; 
    
    return tableu;
};
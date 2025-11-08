export type SuitDef = { suit: string; colour: string; };
import type { CardProps } from "solitaire/components/Card";

// constants
export const SUIT_START: number = 1; // inclusive
export const SUIT_END: number = 9; // inclusive
export const MAX_BLOCK_CARDS: number = 4;

// Defining suits
export const suits: SuitDef[] = [
    {suit: '💚', colour: 'darkgreen'},
    {suit: '🖤', colour: 'black'},
    {suit: '❤️', colour: 'darkred'}
];
export const blocks: SuitDef[] = [
    {suit: '❎', colour: 'darkgreen'},
    {suit: '✖️', colour: 'black'},
    {suit: '❌', colour: 'darkred'}
];
export const flower: SuitDef = {suit: '🪷', colour: 'darkred'};
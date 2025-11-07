export type SuitDef = { suit: string; colour: string; };
import type { CardProps } from "solitaire/components/Card";

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

export const suitStart: number = 1; // inclusive
export const suitEnd: number = 9; // inclusive
export const maxBlock: number = 4;

// Generate base cards
export function generateBasePlayingCards() {
    const playingCards: CardProps[] = [];

    // simple counter for stable ids
    let idCounter = 1;

    // Add suits
    suits.forEach((card) => {
        for (let i = suitStart; i <= suitEnd; i++) {
            playingCards.push({
                key: `card-${idCounter++}`,
                value: i,
                suit: card.suit,
                colour: card.colour,
                isBlockCard: false,
                isFlower: false,
            });
        }
    });

    // Add blocking cards
    blocks.forEach((card) => {
        for (let i = 0; i < maxBlock; i++) {
            playingCards.push({
                key: `card-${idCounter++}`,
                value: 0,
                suit: card.suit,
                colour: card.colour,
                isBlockCard: true,
                isFlower: false,
            });
        }
    });

    // add flower card
    playingCards.push({
        key: `card-${idCounter++}`,
        value: 0,
        suit: flower.suit,
        colour: flower.colour,
        isBlockCard: false,
        isFlower: true,
    });

    return playingCards;
}
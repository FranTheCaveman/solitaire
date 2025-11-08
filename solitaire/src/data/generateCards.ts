"use client";
import type { CardProps } from "solitaire/components/Card";
import { suits, blocks, flower, SUIT_START, SUIT_END, MAX_BLOCK_CARDS } from "./cardDefinitions";

// Generate base cards
export function generateBasePlayingCards() {
    const playingCards: CardProps[] = [];

    // simple counter for stable ids
    let idCounter = 1;

    // Add suits
    suits.forEach((card) => {
        for (let i = SUIT_START; i <= SUIT_END; i++) {
            playingCards.push({
                key: `card-${idCounter++}`,
                value: i,
                suit: card.suit,
                colour: card.colour,
                isBlockCard: false,
                isFlower: false,
                draggable: false,
            });
        }
    });

    // Add blocking cards
    blocks.forEach((card) => {
        for (let i = 0; i < MAX_BLOCK_CARDS; i++) {
            playingCards.push({
                key: `card-${idCounter++}`,
                value: 0,
                suit: card.suit,
                colour: card.colour,
                isBlockCard: true,
                isFlower: false,
                draggable: false,
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
        draggable: false,
    });

    return playingCards;
}

// shuffle cards randomly 
export function generateRandomPlayingCards() {
    const playingCards: CardProps[] = generateBasePlayingCards();

    // Fisher-Yates shuffle (in-place, unbiased)
    for (let i = playingCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = playingCards[i];
        playingCards[i] = playingCards[j];
        playingCards[j] = tmp;
    }

    return playingCards;
}

export function dealCardsIntoColumns(cards: CardProps[], numColumns = 8) {
    const columns: CardProps[][] = Array.from({ length: numColumns }, () => []);

    // deal cards into 8 columns
    cards.forEach((card: CardProps, index: number) => {
        const columnIndex = index % numColumns; 
        columns[columnIndex].push({...card})
    })
    
    // mark bottom cards as draggable
    columns.forEach(column => {
        if (column.length > 0) {
            column[column.length - 1].draggable = true;
        }
    });

    return columns;
}
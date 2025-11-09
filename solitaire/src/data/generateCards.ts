"use client";
import type { CardProps } from "solitaire/components/Card";
import { suits, blocks, flower, SUIT_START, SUIT_END, MAX_BLOCK_CARDS } from "./cardDefinitions";

// Generate base cards
export function generateBasePlayingCards() {
    const playingCards: CardProps[] = [];

    // simple counter for stable ids
    let idCounter = 0;

    // Add suits
    suits.forEach((card) => {
        for (let i = SUIT_START; i <= SUIT_END; i++) {
            playingCards.push({
                cardID: `card-${idCounter++}`,
                value: i,
                suit: card.suit,
                colour: card.colour,
                isBlockCard: false,
                isFlower: false,
                draggable: false,
                dragging: false,
            });
        }
    });

    // Add blocking cards
    blocks.forEach((card) => {
        for (let i = 0; i < MAX_BLOCK_CARDS; i++) {
            playingCards.push({
                cardID: `card-${idCounter++}`,
                value: 0,
                suit: card.suit,
                colour: card.colour,
                isBlockCard: true,
                isFlower: false,
                draggable: false,
                dragging: false,
            });
        }
    });

    // add flower card
    playingCards.push({
        cardID: `card-${idCounter++}`,
        value: 0,
        suit: flower.suit,
        colour: flower.colour,
        isBlockCard: false,
        isFlower: true,
        draggable: false,
        dragging: false,
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
    const cardColumns: CardProps[][] = Array.from({ length: numColumns }, () => []);

    // deal cards into 8 cardColumns
    cards.forEach((card: CardProps, index: number) => {
        const columnIndex = index % numColumns; 
        cardColumns[columnIndex].push({...card})
    })
    
    // mark bottom cards as draggable
    cardColumns.forEach(cardColumn => {
        if (cardColumn.length > 0) {
            cardColumn[cardColumn.length - 1].draggable = true;
        }
    });

    return cardColumns;
}
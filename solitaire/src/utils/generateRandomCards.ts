"use client";
import type { CardProps } from "solitaire/components/Card";
import { generateBasePlayingCards } from "solitaire/data/cardDefinitions";

// Generate cards
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



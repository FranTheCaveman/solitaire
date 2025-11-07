"use client"
import styles from './Board.module.css'
import Card, { CardProps } from "./Card";
import { generateRandomPlayingCards } from "solitaire/utils/generateRandomCards";
import { JSX, useEffect, useState } from 'react';
import { blocks, generateBasePlayingCards, maxBlock } from 'solitaire/data/cardDefinitions';
import Slot from './Slot';
import StackBlockCardsButton, {StackBlockCardsButtonProps} from './ButtonStackBlockCards';

const MaxPlayingCardsHorizontal = 8;

interface BoardProps {
    
}

export default function Board() {
    // create stable placeholders from the deterministic base generator
    const placeholderCards = generateBasePlayingCards().map(card => ({
        ...card,
        // hide face: empty suit + zero value so Card renders visually blank but keeps size/layout
        suit: "loading",
        value: 0,
    }));

    const [cards, setCards] = useState<CardProps[]>(placeholderCards);

    useEffect(() => {
        setCards(generateRandomPlayingCards());
    }, [])

    const StackBlockCardsButtons: JSX.Element[] = [];
    let blockBtnKey = 1;
    blocks.forEach((card) => {
        StackBlockCardsButtons.push(<StackBlockCardsButton key={"stackBlockButton-"+blockBtnKey} suit={card.suit}/>);
        blockBtnKey++;
    });

    return <div className={styles.boardContainer}>
        <div className={styles.scoringContainer}>
            <div className={styles.storageContainer}>
                <Slot variant="storage" key="storageSlot-1"/>
                <Slot variant="storage" key="storageSlot-2"/>
                <Slot variant="storage" key="storageSlot-3"/>
            </div>
            <div className={styles.blockButtonContainer}>
                {StackBlockCardsButtons}
            </div>
            <div className={styles.flowerContainer}>
                <Slot variant="flower" key="flowerSlot-1"/>
            </div>
            <div className={styles.doneContainer}>
                <Slot variant="done" key="doneSlot-1"/>
                <Slot variant="done" key="doneSlot-2"/>
                <Slot variant="done" key="doneSlot-3"/>
            </div>
        </div>
        <div className={styles.cardContainer}>
            {
                cards.map((card) => (
                    <Card key={card.key}
                        value={card.value} 
                        colour={card.colour} 
                        suit={card.suit} 
                        isBlockCard={card.isBlockCard} 
                        isFlower={card.isFlower}
                    />
            ))}
        </div>
    </div>
}
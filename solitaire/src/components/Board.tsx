"use client"
import styles from './Board.module.css'
import Card, { CardProps } from "./Card";
import { JSX, useEffect, useState } from 'react';
import { blocks } from 'solitaire/data/cardDefinitions';
import { generateBasePlayingCards, dealCardsIntoColumns } from 'solitaire/data/generateCards';
import { getTableau, TableuProps } from 'solitaire/data/Tableu';
 
import Slot from './Slot';
import {StackBlockCardsButtons} from './ButtonStackBlockCards';

import { DndContext } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';

interface BoardProps {
    
}

export default function Board() {
    const placeholderTableu: TableuProps = {
        columns: dealCardsIntoColumns(
            generateBasePlayingCards().map(card => ({
                ...card,
                suit: "loading",
                value: 0, 
            }))),
        freecells: [null, null, null],
        foundations: [[], [], []]
    };

    const [tableu, setTableu] = useState<TableuProps>(placeholderTableu);

    useEffect(() => {
        setTableu(getTableau());
    }, [])

    return <>
        <DndContext>
            <div className={styles.boardContainer}>
                <div className={styles.scoringContainer}>
                    <div className={styles.freecellContainer}>
                        <Slot variant="freecell" key="freecellSlot-1"/>
                        <Slot variant="freecell" key="freecellSlot-2"/>
                        <Slot variant="freecell" key="freecellSlot-3"/>
                    </div>
                    <div className={styles.blockButtonContainer}>
                        <StackBlockCardsButtons/>
                    </div>
                    <div className={styles.flowerContainer}>
                        <Slot variant="flower" key="flowerSlot-1"/>
                    </div>
                    <div className={styles.foundationContainer}>
                        <Slot variant="foundation" key="foundationSlot-1"/>
                        <Slot variant="foundation" key="foundationSlot-2"/>
                        <Slot variant="foundation" key="foundationSlot-3"/>
                    </div>
                </div>
                <div className={styles.cardContainer}>
                { // cards
                    tableu.columns.map((column, colIndex) => (
                        <div className={styles.cardColumn} key={`column-${colIndex}`}>
                            {column.map((card) => (
                                <Card key={card.key}
                                    value={card.value} 
                                    colour={card.draggable ? "yellow" : card.colour} // debug
                                    suit={card.suit} 
                                    isBlockCard={card.isBlockCard} 
                                    isFlower={card.isFlower}
                                    draggable={card.draggable}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </DndContext>
    </>
}
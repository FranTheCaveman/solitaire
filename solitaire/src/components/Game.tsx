"use client"
import styles from './Game.module.css'
import Card from "./Card";
import { useEffect, useState } from 'react';
import { generateBasePlayingCards, generateRandomPlayingCards } from 'solitaire/data/generateCards';
import { setStartingGameBoard, GameBoardProps } from 'solitaire/data/GameBoard';
import Slot from './Slot';
import {StackBlockCardsButtons} from './ButtonStackBlockCards';

import { DndContext } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';

interface BoardProps {
    
}

export default function Board() {
    const placeholderGameBoard: GameBoardProps = setStartingGameBoard(generateBasePlayingCards());

    const [gameBoard, setGameBoard] = useState<GameBoardProps>(placeholderGameBoard);

    useEffect(() => {
        setGameBoard(setStartingGameBoard(generateRandomPlayingCards()));
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
                <div className={styles.tableauContainer}>
                { // cards
                    gameBoard.tableau.map((tableauColumn, colIndex) => (
                        <div className={styles.tableauColumn} key={`tableauColumn-${colIndex}`}>
                            {tableauColumn.map((card) => (
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
"use client"
import styles from './Game.module.css'
import Card, { CardProps } from "./Card";
import { useEffect, useState } from 'react';
import { generateBasePlayingCards, generateRandomPlayingCards } from 'solitaire/data/generateCards';
import { setStartingGameBoard, GameBoardProps, moveCardToSlot } from 'solitaire/data/GameBoard';
import Slot from './Slot';
import {StackBlockCardsButtons} from './ButtonStackBlockCards';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';

interface BoardProps {
    
}

export default function Board() {
    const placeholderGameBoard: GameBoardProps = setStartingGameBoard(
      generateBasePlayingCards().map(card => ({
        ...card,
        suit: "loading",
        value: 0,
        draggable: false,
        dragging: false,
      }))
    );
    const [gameBoard, setGameBoard] = useState<GameBoardProps>(placeholderGameBoard);
    const [activeId, setActiveId] = useState<null | string>(null);

    // initialise game board
    useEffect(() => {
        setGameBoard(setStartingGameBoard(generateRandomPlayingCards()));
    }, [])

    function handleDragStart(event: DragStartEvent) { 
        setActiveId(event.active.id.toString()); 
    }

    // handle drag end -- check if the card can be dropped in the slot
    function handleDragEnd(e: DragEndEvent) {
        const card: CardProps|undefined = e.active?.data?.current?.card;
        if (card && e.over?.id?.toString().includes("Slot")) {
            setGameBoard(prev => moveCardToSlot(prev, card.cardID, e.over!.id.toString()));
        }
        setActiveId(null);
    }

    return <>
        <div className={styles.boardContainer}>
            <DndContext modifiers={[restrictToWindowEdges]} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className={styles.scoringContainer}>
                    <div className={styles.freecellContainer}>
                    {
                        gameBoard.freecells.map(slot => {
                            const last = slot.cards[slot.cards.length - 1];
                            return (
                                <Slot key={slot.slotID} variant={slot.variant} slotID={slot.slotID}>
                                    {last && <Card key={last.cardID} {...last} dragging={activeId === last.cardID} className={styles.filledSlotCard}/>}
                                </Slot>
                            );
                        })
                    }
                    </div>

                    <div className={styles.blockButtonContainer}>
                        <StackBlockCardsButtons/>
                    </div>

                    <div className={styles.flowerContainer}>
                    {
                        gameBoard.flower.map(slot => {
                            const last = slot.cards[slot.cards.length - 1];
                            return (
                                <div key={slot.slotID} className={styles.filledSlot}>
                                <Slot variant={slot.variant} slotID={slot.slotID} />
                                {last && (
                                    <Card
                                    key={last.cardID}
                                    {...last}
                                    dragging={activeId === last.cardID}
                                    className={styles.filledSlotCard}
                                    />
                                )}
                                </div>
                            );
                        })
                    }
                    </div>

                    <div className={styles.foundationContainer}>
                    {
                        gameBoard.foundations.map(slot => {
                            const last = slot.cards[slot.cards.length - 1];
                            return (
                                <Slot key={slot.slotID} variant={slot.variant} slotID={slot.slotID}>
                                    {last && <Card key={last.cardID} {...last} dragging={activeId === last.cardID} className={styles.filledSlotCard}/>}
                                </Slot>
                            );
                        })
                    }
                    </div>
                </div>

                <div className={styles.tableauContainer}>
                { // cards
                    gameBoard.tableau.map((tableauColumn, colIndex) => (
                        <div className={styles.tableauColumn} key={`tableauColumn-${colIndex}`}>
                            {tableauColumn.map((card) => (
                                <Card {...card} key={card.cardID} colour={card.draggable ? "yellow" : card.colour}/>
                            ))}
                        </div>
                    ))}
                </div>
            </DndContext>
        </div>
    </>
}
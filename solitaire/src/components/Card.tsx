"use client"
import React from "react";
import styles from './Card.module.css'
import { UniqueIdentifier } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";

export interface CardProps {
    value?: number;
    suit: string;
    colour: string;
    isBlockCard: boolean;
    isFlower?: boolean;
    cardID: string;
    draggable: boolean;
    dragging: boolean;
    className?: string;
}

const Card: React.FC<CardProps> = ({
    cardID,
    value, 
    colour, 
    suit,
    isBlockCard = false,
    isFlower = false,
    draggable = false,
    dragging = false,
    className = "",
}) => {
    // loading functionality
    const hideValue = (isBlockCard || isFlower || suit == "loading");
    const isLoading = suit == "loading";
    const loader = <span className={styles.loader}></span>;
    const suitIcon = <span className={styles.suitIcon}>{suit}</span>

    const cardData: CardProps = {
        cardID,
        value,
        suit,
        colour,
        isBlockCard,
        isFlower,
        draggable,
        dragging,
    };

    // draggable functionality
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: cardID,
        data: { card: cardData },
        disabled: !draggable,
    });

    const cardBodyStyle: React.CSSProperties = {
        color: colour,
        ...(transform ? { 
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            zIndex: 9999,
            boxShadow: "0 5px 10px 2px rgba(14, 14, 14, 0.55)"
        } : {}),
    };

    return <div 
            className={`${styles.card} ${className}`} 
            ref={setNodeRef} 
            {...listeners} 
            {...attributes} 
            style={cardBodyStyle}>

        <div className={styles.numberDiv1}>{hideValue ? "" : value}{isLoading ? "" : suitIcon}</div>
        <div className={styles.suitDiv}>{isLoading ? loader : suitIcon}</div>
        <div className={styles.numberDiv2}>{isLoading ? "" : suitIcon}{hideValue ? "" : value}</div>
    </div>
}

export default Card;
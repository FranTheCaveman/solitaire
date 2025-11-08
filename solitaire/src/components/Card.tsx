"use client"
import React from "react";
import styles from './Card.module.css'

export interface CardProps {
    value?: number;
    suit: string;
    colour: string;
    isBlockCard: boolean;
    isFlower?: boolean;
    key?: string;
    draggable: boolean;
}

const Card: React.FC<CardProps> = ({
    value, 
    colour, 
    suit,
    isBlockCard = false,
    isFlower = false,
    draggable = false
}) => {
    const hideValue = (isBlockCard || isFlower || suit == "loading");
    const isLoading = suit == "loading";
    const loader = <span className={styles.loader}></span>;
    const suitIcon = <span className={styles.suitIcon}>{suit}</span>

    return <div className={styles.card} style={{color: colour}}>
        <div className={styles.numberDiv1}>{hideValue ? "" : value}{isLoading ? "" : suitIcon}</div>
        <div className={styles.suitDiv}>{isLoading ? loader : suitIcon}</div>
        <div className={styles.numberDiv2}>{isLoading ? "" : suitIcon}{hideValue ? "" : value}</div>
    </div>
}

export default Card;
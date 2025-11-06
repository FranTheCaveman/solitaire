"use client"
import React from "react";
import styles from './Card.module.css'

interface CardProps {
    value: number;
    suit?: string;
    colour: string;
}

export default function Card({value, colour, suit}: CardProps) {
    return <div className={styles.card} style={{color: colour}} draggable="true">
        <div className={styles.numberDiv1}>{value}</div>
        <div className={styles.suitDiv}>{suit}</div>
        <div className={styles.numberDiv2}>{value}</div>
    </div>
}
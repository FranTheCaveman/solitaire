"use client"
import React from "react";
import styles from './Board.module.css'
import Card from "./Card";

const MaxPlayingCardsHorizontal = 8;

interface BoardProps {
    
}

export default function Board() {
    return <div className={styles.cardContainer}>
        <Card value={1} colour="darkred" suit="❤️"/>
    </div>
}
import {Dispatch, SetStateAction} from "react";

export type eventTypes = "TODO" | "DOING" | "DONE";
export interface EventInterface {
    id: number, //unique id
    type: eventTypes,
    title: string;
    description: string;
    comment?: string;
}
export interface CardInterface {
    id: number;
    title: string;
    type: eventTypes,
    visible: boolean;
    listElement: EventInterface[];
}
export interface SingleEventInterface {
    eCard: EventInterface;
    moveCard?: (item: EventInterface, destinationCard: CardInterface) => void;
    orderCardList?: any
}
export interface CardListInterface {
    card: CardInterface,
    cardList: CardInterface[],
    setCardList: Dispatch<SetStateAction<CardInterface[]>>
}

export interface ReorderCardListInterface {
    valueHover: EventInterface,
    card: CardInterface
}
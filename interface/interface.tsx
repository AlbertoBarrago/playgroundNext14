export type type = "TODO" | "DOING" | "DONE";
export interface EventInterface {
    id: number, //unique id
    type: type,
    title: string;
    description: string;
    comment?: string;
}
export interface CardInterface {
    id: number;
    title: string;
    type: type,
    visible: boolean;
    listElement: EventInterface[];
}
export interface SingleEventInterface {
    eCard: EventInterface;
    moveCard: (item: EventInterface, destinationCard: CardInterface) => void;
}
export interface CardListInterface {
    card: CardInterface,
    moveCard: (item: EventInterface, destinationCard: CardInterface) => void,
    cardList: CardInterface[]
}
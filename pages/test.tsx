import {Button} from "../@/components/ui/button"
import {CardTitle, CardHeader, CardContent, CardFooter, Card} from "../@/components/ui/card"
import React, {useState} from "react";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider, useDrag, useDrop} from 'react-dnd'

export type status = "todo" | "doing" | "done";
export type type = "TODO" | "DOING" | "DONE";
export interface EventInterface {
    id: number, //unique id
    type: type,
    title: string;
    description: string;
    comment?: string;
    state: status;
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


const CardItem: React.FC<CardListInterface> = ({card, moveCard, cardList}) => {

    const [collectedProps, drop] = useDrop(() => ({
        accept: "CARD_COMPONENT",
        item: card,
        drop: (valueHover: { eCard: EventInterface }) => {
            const destinationCard = card;
            moveCard(valueHover.eCard, destinationCard)
        }
    }))

    return (
        <Card ref={drop}>
            <CardHeader>
                <CardTitle className="text-black">{card.title}</CardTitle>
                <input title={"insert Event"}/>
            </CardHeader>
            <CardContent className="space-y-2">
                {card.listElement.map((eCard) => (
                    <DraggableCardComponent
                        key={eCard.id}
                        eCard={eCard}
                        moveCard={moveCard}
                    />
                ))}
            </CardContent>
            {/*<CardFooter>*/}
            {/*    <Button className="text-black" variant="secondary" size="sm">*/}
            {/*        Add Event*/}
            {/*    </Button>*/}
            {/*</CardFooter>*/}
        </Card>
    );
};

const DraggableCardComponent: React.FC<SingleEventInterface> =
    ({eCard, moveCard}) => {
        const [{isDragging}, drag] = useDrag({
            type: 'CARD_COMPONENT',
            item: {eCard},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });

        return (
            <div ref={drag} style={{opacity: isDragging ? 0.5 : 1, scale: 0.3 }} className="p-4 border rounded-md bg-white dark:bg-gray-900">
                <h3 className="font-medium text-gray-700 dark:text-gray-200">{eCard.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{eCard.description}</p>
            </div>
        );
    };

export default function Component() {
    const [cardList, setCardList] = useState<CardInterface[]>([
        {
            id: 1,
            title: "TODO",
            type: "TODO",
            visible: true,
            listElement: [
                {
                    id: 1.1,
                    type: "TODO",
                    title: "titolo prova",
                    description: "",
                    state: "todo"
                },
            ]
        },
        {
            id: 2,
            title: "DOING",
            type: "DOING",
            visible: true,
            listElement: [
                {
                    id: 1.2,
                    type: "DOING",
                    title: "titolo prova doing",
                    description: "",
                    state: "doing"
                },
            ]
        },
        {
            id: 3,
            title: "DONE",
            type: "DONE",
            visible: true,
            listElement: [
                {
                    id: 1.3,
                    type: "DONE",
                    title: "titolo prova done",
                    description: "",
                    state: "done"
                }
            ]
        }
    ])

    /**
     * Moves an item to a destination card in a card list.
     *
     * @param {EventInterface} item - The item to be moved.
     * @param {CardInterface} destinationCard - The destination card where the item will be moved to.
     *
     * @returns {void}
     */
    const moveCard = (item: EventInterface, destinationCard: CardInterface): void => {
        console.log(item,destinationCard)
        //FIXME please!
        const newCardList = [...cardList];

        // Determine the sourceCardIndex based on the type of the destination card
        const sourceCardIndex = newCardList.findIndex(card => card.type === item.type);
        const cardIndex = newCardList.findIndex(card => card === destinationCard);

        if (cardIndex !== -1 && sourceCardIndex !== -1) {
            // Change the type of the item to the type of the destination card
            const updatedItem = { ...item, type: newCardList[sourceCardIndex].type };

            // Push the updated item to the destinationCard array
            newCardList[cardIndex].listElement.push(updatedItem);

            // Remove old items from the origin-array
            const index = newCardList[sourceCardIndex].listElement.findIndex(event => event.id === item.id);
            if (index !== -1) {
                newCardList[sourceCardIndex].listElement.splice(index, 1);
            }
            // Update the state
            setCardList(newCardList);
        } else if (cardIndex === -1) {
            console.error('Destination card not found');
        } else {
            console.error('Invalid move: Source and destination cards are the same.');
        }
    };


    return (
        <DndProvider backend={HTML5Backend}>
            <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md dark:bg-gray-900">
                <div className="flex items-center space-x-2">
                    <svg
                        className=" w-6 h-6 text-gray-500 dark:text-gray-400"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line x1="4" x2="20" y1="12" y2="12"/>
                        <line x1="4" x2="20" y1="6" y2="6"/>
                        <line x1="4" x2="20" y1="18" y2="18"/>
                    </svg>
                    <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Trello</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <Button className="text-black" variant="ghost">Sign In</Button>
                    <Button className="text-black">Sign Up</Button>
                </div>
            </header>
            <section className="h-screen w-full bg-gray-100 dark:bg-gray-800">
                <main className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cardList && cardList.map((card) => (
                        <CardItem key={card.id}
                                  card={card}
                                  moveCard={moveCard}
                                  cardList={cardList}/>
                    ))}
                </main>
            </section>
        </DndProvider>
    );
}

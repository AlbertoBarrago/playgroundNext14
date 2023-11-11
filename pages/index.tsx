import {Button} from "../@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "../@/components/ui/card"
import React, {useState} from "react";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider, useDrag, useDrop} from 'react-dnd'
import { Moon, Sun } from "lucide-react"
import {Input} from "../@/components/ui/input"
import {
    CardInterface,
    CardListInterface,
    EventInterface,
    SingleEventInterface
} from "../interface/interface";
import {useAppState} from "../context/Context";
import {useTheme} from "next-themes";

/**
 * Card Item
 * @param card
 * @param moveCard
 * @param cardList
 * @constructor
 */
const CardItem: React.FC<CardListInterface> = ({card, moveCard, cardList, orderCardList}) => {

    const [collectedProps, drop] = useDrop(() => ({
        accept: "CARD_COMPONENT",
        item: card,
        drop: (valueHover: { eCard: EventInterface }) => {
            if (valueHover.eCard.type !== card.type) moveCard(valueHover.eCard, card)
            if (valueHover.eCard.type === card.type) {
                orderCardList(card, valueHover.eCard);
            }
        }
    }))

    function addEvent(e: React.KeyboardEvent<HTMLInputElement>) {
        console.log(e.currentTarget.value)
    }

    return (
        <Card ref={drop}>
            <CardHeader>
                <CardTitle className="text-black">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Input className={"h-14 p-2"} placeholder={" Add Event"} onKeyDown={(e) => addEvent(e)}></Input>
                {card.listElement.map((eCard) => (
                    <EventItem
                        key={eCard.id}
                        eCard={eCard}
                        moveCard={moveCard}
                    />
                ))}
            </CardContent>
        </Card>
    );
};


/**
 * Event Item
 * @param eCard
 * @param moveCard
 * @constructor
 */
const EventItem: React.FC<SingleEventInterface> = ({eCard}) => {
    const [{isDragging}, drag] = useDrag({
        type: 'CARD_COMPONENT',
        item: {eCard},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag}
             style={{opacity: isDragging ? 0.5 : 1, scale: 0.3}}
             className="p-4 border rounded-md bg-white dark:bg-gray-900">
            <h3 className="font-medium text-gray-700 dark:text-gray-200">{eCard.title} {eCard.type}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{eCard.description}</p>
        </div>
    );
};

export default function Home() {
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
                }
            ]
        }
    ])
    const { setTheme, theme } = useTheme()


    /**
     * Moves an item to a destination card in a card list.
     *
     * @param {EventInterface} item - The item to be moved.
     * @param {CardInterface} destinationCard - The destination card where the item will be moved to.
     *
     * @returns {void}
     */
    const moveCard = (item: EventInterface, destinationCard: CardInterface): void => {
        const newCardList = [...cardList];

        // Determine the sourceCardIndex based on the type of the destination card
        const sourceCardIndex = newCardList.findIndex(card => card.type === item.type);
        const cardIndex = newCardList.findIndex(card => card === destinationCard);

        if (cardIndex !== -1 && sourceCardIndex !== -1) {
            // Remove old items from the origin-array
            const index = newCardList[sourceCardIndex].listElement.findIndex(event => event.id === item.id);
            if (index !== -1) {
                newCardList[sourceCardIndex].listElement.splice(index, 1);
            }
            // Push the updated item to the destinationCard array and update the type
            let updatedElement: EventInterface = {
                id: item.id,
                title: item.title,
                type: destinationCard.type,
                description: item.description
            }
            newCardList[cardIndex].listElement.push(updatedElement);

            // Update the state
            setCardList(newCardList);
        } else if (cardIndex === -1) {
            console.error('Destination card not found');
        } else {
            console.error('Invalid move: Source and destination cards are the same.');
        }
    };
    /**
     * Update the order of the events
     * FIXME: to improve
     * @param card
     * @param element
     */
    const orderCardList = (card: CardInterface, element: EventInterface): void => {
        const sourceCardIndex = cardList.findIndex((c) => c.type === card.type);

        if (sourceCardIndex !== -1) {
            const sourceCard = cardList[sourceCardIndex];

            const sourceIndex = sourceCard.listElement.findIndex((e) => e.id === element.id);
            const destinationIndex = sourceCard.listElement.findIndex((e) => e.id === card.id);

            if (sourceIndex < 0 || sourceIndex >= sourceCard.listElement.length) {
                // Handle error
                return;
            }

            if (sourceIndex !== destinationIndex) {
                const updatedList = [...cardList];
                const [movedItem] = updatedList[sourceCardIndex].listElement.splice(sourceIndex, 1);

                updatedList[sourceCardIndex].listElement.splice(destinationIndex, 0, movedItem);

                setCardList(updatedList);
            }
        }
    }


    return (
        <DndProvider backend={HTML5Backend}>
            <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md dark:bg-gray-900">
                <div className="flex items-center space-x-2">
                    {/*<svg*/}
                    {/*    className=" w-6 h-6 text-gray-500 dark:text-gray-400"*/}
                    {/*    fill="none"*/}
                    {/*    height="24"*/}
                    {/*    stroke="currentColor"*/}
                    {/*    strokeLinecap="round"*/}
                    {/*    strokeLinejoin="round"*/}
                    {/*    strokeWidth="2"*/}
                    {/*    viewBox="0 0 24 24"*/}
                    {/*    width="24"*/}
                    {/*    xmlns="http://www.w3.org/2000/svg"*/}
                    {/*>*/}
                    {/*    <line x1="4" x2="20" y1="12" y2="12"/>*/}
                    {/*    <line x1="4" x2="20" y1="6" y2="6"/>*/}
                    {/*    <line x1="4" x2="20" y1="18" y2="18"/>*/}
                    {/*</svg>*/}
                    <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-200">trelloZ</h1>
                    <Button onClick={()=>{
                        setTheme(theme === "system" || theme === "light" ? "dark" : "light");
                    }}> {theme === "light" ? <Sun/> : <Moon/>} </Button>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="ghost">Sign In</Button>
                    <Button>Sign Up</Button>
                </div>
            </header>
            <section className="h-screen w-full bg-gray-100 dark:bg-gray-800">
                <main className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cardList && cardList.map((card) => (
                        <CardItem key={card.id}
                                  card={card}
                                  moveCard={moveCard}
                                  orderCardList={orderCardList}
                                  cardList={cardList}/>
                    ))}
                </main>
            </section>
        </DndProvider>
    );
}

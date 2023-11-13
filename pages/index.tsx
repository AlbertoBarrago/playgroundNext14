import {Card, CardContent, CardHeader, CardTitle} from "../@/components/ui/card"
import React, {useEffect, useState} from "react";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider, useDrag, useDrop} from 'react-dnd'
import {Input} from "../@/components/ui/input"
import {
    CardInterface,
    CardListInterface,
    EventInterface,
    SingleEventInterface
} from "../interface/interface";
import {initEvent} from "../mock/mock";
import {moveEvent, orderEventList} from "../service/utils";
import Header from "../components/header";

/**
 * Card Item
 * @param card
 * @param moveCard
 * @param cardList
 * @param orderCardList
 * @constructor
 */
const CardItem: React.FC<CardListInterface> = ({card, setCardList, cardList}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [, drop] = useDrop(() => ({
        accept: "CARD_COMPONENT",
        item: card,
        drop: (valueHover: { eCard: EventInterface }) => {
            if (valueHover.eCard.type !== card.type) {
                moveEvent(valueHover.eCard, card, cardList, setCardList)
            }
            if (valueHover.eCard.type === card.type) {
                orderEventList(card, valueHover.eCard, cardList, setCardList);
            }
        }
    }))
    const addEvent = (e: React.KeyboardEvent<HTMLInputElement>, card: CardInterface) => {
        console.log(e.currentTarget.value)
        const updatedCardList = [...cardList];
        let cardToPopulate: CardInterface[] = cardList.filter(e => e.type === card.type)
        switch (card.type) {
            case "TODO":
                let newEvent: EventInterface = {
                    id: (Math.random() * 100),
                    type: "TODO",
                    title: e.currentTarget.value,
                    description: ""
                }
                cardToPopulate[0].listElement.push(newEvent);
                setInputValue("")
                break;
            case "DOING":
                break;
            case "DONE":
                break;
        }

        // Find the index of the modified card in the cardList
        const cardIndex = updatedCardList.findIndex((c) => c.type === card.type);

        // Update the modified card in the cardList
        updatedCardList[cardIndex] = cardToPopulate[0];

        // Update the state with the modified cardList
        setCardList(updatedCardList);
    }

    return (
        <Card ref={drop} className={"bg-gray-300"}>
            <CardHeader>
                <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Input className={"h-14 p-2"}
                       value={inputValue}
                       onChange={(e) => setInputValue(e.target.value)}
                       placeholder={"Add Event"}
                       onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                               addEvent(e, card);
                           }
                       }}></Input>
                {card.listElement.map((eCard) => (
                    <EventItem
                        key={eCard.id}
                        eCard={eCard}
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
            <h3 className="font-medium text-gray-700 dark:text-gray-200">{eCard.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{eCard.description}</p>
        </div>
    );
};

export default function Home() {
    const [cardList, setCardList] = useState<CardInterface[]>(initEvent)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])


    return (
        <DndProvider backend={HTML5Backend}>
            {isClient ? (
                <><Header/>
                    <section className="h-screen w-full bg-gray-100 dark:bg-gray-800">
                        <main className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {cardList && cardList.map((card) => (
                                <CardItem key={card.id}
                                          card={card}
                                          setCardList={setCardList}
                                          cardList={cardList}/>
                            ))}
                        </main>
                    </section>
                </>
            ) : (
                <div className="flex items-center justify-center h-full">
                    {/* You can replace this with your own loading spinner component */}
                    <div className="loader"></div>
                </div>
            )}
        </DndProvider>
    );
}

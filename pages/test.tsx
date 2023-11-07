import {Button} from "../@/components/ui/button"
import {CardTitle, CardHeader, CardContent, CardFooter, Card} from "../@/components/ui/card"
import {useEffect, useState} from "react";

type status = "todo" | "doing" | "done";
type type = "TODO" | "DOING" | "DONE";

interface CardInterface {
    id: number;
    title: string;
    visible: boolean;
    listElement: EventInterface[];
}

interface EventInterface {
    id: number, //unique id
    type: type,
    title: string;
    description: string;
    comment?: string;
    state: status;
}

export default function Component() {
    const [cardList, setCardList] = useState<CardInterface[]>([
        {
            id: 1,
            title: "TODO",
            visible: true,
            listElement: []
        },
        {
            id: 2,
            title: "DOING",
            visible: true,
            listElement: []
        },
        {
            id: 3,
            title: "DONE",
            visible: true,
            listElement: []
        }

    ])
    const [eventList, setEventList] = useState<EventInterface[]>([
        {
            id: 1.1,
            type: "TODO",
            title: "titolo prova",
            description: "",
            state: "todo"
        },
        {
            id: 1.2,
            type: "DOING",
            title: "titolo prova doing",
            description: "",
            state: "doing"
        },
        {
            id: 1.3,
            type: "DONE",
            title: "titolo prova done",
            description: "",
            state: "done"
        }
    ])

    useEffect(() => {
        const updatedCardList = [...cardList];

        eventList.forEach((event) => {
            const cardItem = updatedCardList.find((card) => card.title === event.type);

            if (cardItem) {
                cardItem.listElement.push(event);
            }
        });

        setCardList(updatedCardList);
    }, [eventList]);

    return (
        <section className="h-screen w-full bg-gray-100 dark:bg-gray-800">
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
            <main className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" draggable="true">
                {cardList.map((card, cardIndex) => {
                    return (
                        <>
                            <Card key={card.id}>
                                <CardHeader>
                                    <CardTitle className="text-black">{card.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {card.listElement.map((eCard) => {
                                        return (
                                            <>
                                                <div key={eCard.id}
                                                     className="p-4 border rounded-md bg-white dark:bg-gray-900"
                                                     draggable="true">
                                                    <h3 className="font-medium text-gray-700 dark:text-gray-200">{eCard.title}</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{eCard.description}</p>
                                                </div>
                                            </>
                                        )
                                    })}
                                </CardContent>
                                <CardFooter>
                                    <Button className="text-black" variant="secondary" size="sm">Add Card</Button>
                                </CardFooter>
                            </Card>
                        </>
                    )
                })}
            </main>
        </section>
    )
}

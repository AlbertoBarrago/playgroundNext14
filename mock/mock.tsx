import {CardInterface} from "../interface/interface";

const initEvent: CardInterface[] = [
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
]

export {
    initEvent
}
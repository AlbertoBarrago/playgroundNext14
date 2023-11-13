import {CardInterface, EventInterface} from "../interface/interface";
import {Dispatch, SetStateAction} from "react";

/**
 * Moves an item to a destination card in a card list.
 *
 * @param {EventInterface} item - The item to be moved.
 * @param {CardInterface} destinationCard - The destination card where the item will be moved to.
 *
 * @param cardList
 * @param setCardList
 * @returns {void}
 */
const moveEvent = (item: EventInterface, destinationCard: CardInterface, cardList: CardInterface[], setCardList: Dispatch<SetStateAction<CardInterface[]>>): void => {
    const newCardList = [...cardList];

    // Determine the sourceCardIndex based on the type of the destination card
    const sourceCardIndex = newCardList.findIndex(card => card.type === item.type);
    const cardIndex = newCardList.findIndex(card => card === destinationCard);

    if (cardIndex !== -1 && sourceCardIndex !== -1) {
        // Remove old items from the origin-array
        const index = newCardList[sourceCardIndex].listElement.findIndex((event: {
            id: number;
        }) => event.id === item.id);
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
 * @param cardList
 * @param setCardList
 */
const orderEventList = (card: CardInterface, element: EventInterface, cardList: CardInterface[], setCardList: Dispatch<SetStateAction<CardInterface[]>>): void => {
    const sourceCardIndex = cardList.findIndex((c: { type: string; }) => c.type === card.type);

    if (sourceCardIndex !== -1) {
        const { listElement } = cardList[sourceCardIndex];
        const sourceIndex = listElement.findIndex((e: { id: number; }) => e.id === element.id);

        if (sourceIndex !== -1) {
            const updatedList = [...cardList];
            const [movedItem] = listElement.splice(sourceIndex, 1);

            const destinationIndex = sourceIndex === 1 ? 0 : listElement.length;
            listElement.splice(destinationIndex, 0, movedItem);

            setCardList(updatedList);
        }
    }

}

export {
    moveEvent,
    orderEventList
}
import {CardInterface, EventInterface} from "../interface/interface";

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
const moveCard = (item: EventInterface, destinationCard: CardInterface, cardList: any, setCardList: any): void => {
    const newCardList = [...cardList];

    // Determine the sourceCardIndex based on the type of the destination card
    const sourceCardIndex = newCardList.findIndex(card => card.type === item.type);
    const cardIndex = newCardList.findIndex(card => card === destinationCard);

    if (cardIndex !== -1 && sourceCardIndex !== -1) {
        // Remove old items from the origin-array
        const index = newCardList[sourceCardIndex].listElement.findIndex((event: { id: number; }) => event.id === item.id);
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
const orderCardList = (card: CardInterface, element: EventInterface, cardList: any, setCardList: any): void => {
    const sourceCardIndex = cardList.findIndex((c: { type: string; }) => c.type === card.type);

    if (sourceCardIndex !== -1) {
        const sourceCard = cardList[sourceCardIndex];

        const sourceIndex = sourceCard.listElement.findIndex((e: { id: number; }) => e.id === element.id);
        const destinationIndex = sourceCard.listElement.findIndex((e: { id: number; }) => e.id === card.id);

        if (sourceIndex < 0 || sourceIndex >= sourceCard.listElement.length) {
            throw new Error('Invalid operation');
        }

        if (sourceIndex !== destinationIndex) {
            const updatedList = [...cardList];
            const [movedItem] = updatedList[sourceCardIndex].listElement.splice(sourceIndex, 1);

            updatedList[sourceCardIndex].listElement.splice(destinationIndex, 0, movedItem);

            setCardList(updatedList);
        }
    }
}

export {
    moveCard,
    orderCardList
}
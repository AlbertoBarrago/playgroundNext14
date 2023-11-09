import {EventInterface} from "../pages/test";

export default function CardComponent(cardElement: EventInterface) {
    return (
        <div className="p-4 border rounded-md bg-white dark:bg-gray-900"
             draggable="true">
            <h3 className="font-medium text-gray-700 dark:text-gray-200">{cardElement.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{cardElement.description}</p>
        </div>
    )
}
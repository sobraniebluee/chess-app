import Board from "./Board";

export type BoardEvents = "move";

export interface ICallbacks {
    move: (board: Board) => void,
}

// type IEvent = { [key in BoardEvents]: ICallbacks[BoardEvents] }
type IEvent = {event: BoardEvents, callback: ICallbacks[BoardEvents]}

const initEvents = {
    'move': () => {}
}

export class BoardEmitter {
    events: IEvent[] = [];

    on(event: BoardEvents, callback: ICallbacks[BoardEvents]) {
        this.events.push({event, callback});
    }

    remove(event: BoardEvents, callback: ICallbacks[BoardEvents]) {
        this.events.filter((evt) => evt.callback.toString() == callback.toString());
    }

    emit(event: BoardEvents, ...args: any[]) {
        this.events
            .filter((evt) => evt.event == event)
            .forEach(({callback}) => {
                callback.call(null, ...args)
            })
    }

}


// on(event: BoardEvents, callback: ICallbacks[BoardEvents]) {
//     this.events[event] = callback;
// }
//
// remove(event: BoardEvents) {
//     this.events[event] = null;
// }
//
// emit(event: BoardEvents, ...args: any[]) {
//     const callback = this.events[event];
//     if (!callback)
//         return;
//
//     callback.call(null, ...args);
//
// }


import {IHistory} from "./types";
import Cell from "./Cell";

export default class HistoryBoard {
    protected history: IHistory[] = [];

    last(id?: string): IHistory | null {
        if (id) {
            return this.history.find(item => item.from.id == id && item.isCastle)
                ?? this.last();
        }
        return this.history[this.history.length - 1] ?? null
    }
    isEmpty() {
        return this.history.length == 0;
    }
    public addHistoryMove(from: Cell, to: Cell, isCastle = false) {
        this.history.push({from, to, figure: from.figure, isCastle: isCastle});
    }
}
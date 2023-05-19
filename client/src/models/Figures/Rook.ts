import Figure from "./Figure";
import {BoardColors, FigureNames} from "../types";
import Cell from "../Cell";

export default class Rook extends Figure {
    isFirstStep = true;

    constructor(color: BoardColors, cell: Cell) {
        super(color, cell, FigureNames.ROOK);
    }
    move(target: Cell) {
        super.move(target);
        this.isFirstStep = false;
    }

    getAvailableMoves(): Cell[] {
        return this.getVerticalsAndHorizontal();
    }
}
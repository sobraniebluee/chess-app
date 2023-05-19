import Figure from "./Figure";
import {BoardColors, FigureNames} from "../types";
import Cell from "../Cell";

export default class Bishop extends Figure {

    constructor(color: BoardColors, cell: Cell) {
        super(color, cell, FigureNames.BISHOP);
    }

    getAvailableMoves(): Cell[] {
        return this.getDiagonals();
    }
}
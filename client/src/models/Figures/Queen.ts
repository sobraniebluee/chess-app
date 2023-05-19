import {BoardColors, FigureNames} from "../types";
import Figure from "./Figure";
import Cell from "../Cell";

export default class Queen extends Figure {

    constructor(color: BoardColors, cell: Cell) {
        super(color, cell, FigureNames.QUEEN);
    }

    getAvailableMoves(): Cell[] {
        return [...this.getDiagonals(), ...this.getVerticalsAndHorizontal()];
    }
}


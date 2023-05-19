import {BoardColors, FigureNames} from "../types";
import Figure from "./Figure";
import Cell from "../Cell";

export default class Knight extends Figure {

    constructor(color: BoardColors, cell: Cell) {
        super(color, cell, FigureNames.KNIGHT);
    }

    getAvailableMoves(): Cell[] {
        const x = this.cell.x,
              y = this.cell.y;

        let points = [
            this.board.getCell(x - 1, y - 2, false),
            this.board.getCell(x - 2, y - 1, false),
            this.board.getCell(x + 2, y + 1, false),
            this.board.getCell(x + 1, y + 2, false),
            this.board.getCell(x + 1, y - 2, false),
            this.board.getCell(x + 2, y - 1, false),
            this.board.getCell(x - 1, y + 2, false),
            this.board.getCell(x - 2, y + 1, false)
        ];

        return points.filter(point => point && (this.cell.isEnemy(point) || point.isEmpty()));
    }
}



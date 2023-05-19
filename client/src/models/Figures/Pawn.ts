import {BoardColors, FigureNames} from "../types";
import Figure from "./Figure";
import Cell from "../Cell";

export default class Pawn extends Figure {
    isFirstStep = true;

    constructor(color: BoardColors, cell: Cell, firstStep = true) {
        super(color, cell, FigureNames.PAWN);
        this.isFirstStep = firstStep;
    }

    public move(target: Cell) {
        super.move(target);
        this.isFirstStep = false;
    }
    public isCanSwap(target: Cell): boolean {
        let lastRowBlack = 7,
            lastRowWhite = 0;

        if (this.cell.board.config.flipped) {
            lastRowBlack = 0;
            lastRowWhite = 7;
        }

        if ((this.color == BoardColors.WHITE && target.y == lastRowWhite) ||
            (this.color == BoardColors.BLACK && target.y == lastRowBlack)
        ) {
            return true;
        }

        return false;
    }
    public getAvailableMoves(): Cell[] {
        const moves: Cell[] = [];
        const cells = this.cell.board.cells,
            isFlipped = this.cell.board.config.flipped,
            x = this.cell.x,
            y = this.cell.y,
            steps = this.isFirstStep ? 2 : 1,
            cellX = cells[x];

        let direction = this.cell.figure.color == BoardColors.WHITE ? -1 : 1;
        direction = isFlipped ? direction * -1 : direction;

        for (let i = 1;i <= steps;i++) {
            let cellY = y + (i * direction);
            // console.log(cellY, y)
            if (cellX[cellY].isEmpty()) {
                moves.push(cellX[cellY]);
            } else {
                break
            }
        }

        let rightEnemy, leftEnemy;

        if (cells[x + 1]) {
            rightEnemy = cells[x + 1][y + direction];
        }
        if (cells[x - 1]) {
            leftEnemy = cells[x - 1][y + direction];
        }

        if (rightEnemy && !rightEnemy.isEmpty() && this.cell.isEnemy(rightEnemy)) {
            moves.push(rightEnemy);
        }
        if (leftEnemy && !leftEnemy.isEmpty() && this.cell.isEnemy(leftEnemy)) {
            moves.push(leftEnemy);
        }
        // console.log(direction, "x, y", x, y)
        return moves;
    }
}



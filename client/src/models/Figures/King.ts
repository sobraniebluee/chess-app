import {BoardColors, FigureNames} from "../types";
import Figure from "./Figure";
import Cell from "../Cell";
import Rook from "./Rook";

export default class King extends Figure {
    isFirstStep = true;

    constructor(color: BoardColors, cell: Cell) {
        super(color, cell, FigureNames.KING);
    }

    public move(target: Cell) {
        super.move(target);
        this.isFirstStep = false;
    }

    public getAvailableMoves(): Cell[] {
        const x = this.cell.x,
            y = this.cell.y;

        const points = [
            this.board.getCell(x + 1,y + 1, false),
            this.board.getCell(x - 1,y - 1, false),
            this.board.getCell(x - 1,y + 1, false),
            this.board.getCell(x + 1,y - 1, false),
            this.board.getCell(x,y + 1, false),
            this.board.getCell(x,y - 1, false),
            this.board.getCell(x + 1, y, false),
            this.board.getCell(x - 1, y, false),
        ];

        const moves = points.filter(point => point && (point.isEmpty() || point.isEnemy(this.cell)));
        const leftCastlingCell = this.canCastling(true);
        const rightCastlingCell = this.canCastling();

        if (leftCastlingCell) {
            moves.push(leftCastlingCell)
        }

        if (rightCastlingCell) {
            moves.push(rightCastlingCell)
        }
        return moves;
    }

    public canCastling(isLeft = false): Cell | null {
        if (!this.isFirstStep) {
            return null;
        }

        if (isLeft) {
            let lastEmptyLeftCell = this.getLastEmptyCellOfHorizontal('left');
            if (!lastEmptyLeftCell) {
                return null;
            }
            if (lastEmptyLeftCell.x != 1) {
                return null;
            }
        } else {
            let lastEmptyRightCell = this.getLastEmptyCellOfHorizontal('right');
            if (!lastEmptyRightCell) {
                return null;
            }
            if (lastEmptyRightCell.x != 6) {
                return null;
            }
        }

        const coordsWhiteRook = isLeft ? [0, 7] : [7, 7],
            coordsBlackRook = isLeft ?  [0, 0] : [7, 0];

        const rookPos = this.color == BoardColors.WHITE ? coordsWhiteRook : coordsBlackRook;
        const rook = this.board.getCell(rookPos[0], rookPos[1]).figure as Rook;
        if (!rook ||
            rook.name != FigureNames.ROOK ||
            rook.color != this.color)
        {
            return null;
        }

        return this.isFirstStep ? rook.cell : null;
    }

}


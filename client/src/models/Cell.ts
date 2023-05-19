import {BoardColors, FigureNames} from "./types";
import Figure from "./Figures/Figure";
import Player from "./Player";
import Board from "./Board";
import {createId} from "../utils/func";
import {Bishop, Knight, Queen, Rook} from "./Figures";

export default class Cell {
    id: string;
    x: number;
    y: number;
    color: BoardColors;
    figure: Figure | null;
    board: Board;

    constructor(x: number, y: number, color: BoardColors, board: Board) {
        this.id = createId();
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = null;
        this.board = board;
    }

    public moveFigure(target: Cell): boolean {
        if (this.isEmpty())
            return false;
        if (this.id === target.id)
            return false;
        if (!this.figure.canMove(target))
            return false;
        if (this.figure.name == FigureNames.KING &&
            target.figure &&
            target.figure.name == FigureNames.ROOK &&
            target.figure.color == this.figure.color
        ) {
            this.castling(target);
            return true;
        }
        if (!this.isEnemy(target))
            return false;

        if (!target.isEmpty())
            this.board.addLostFigure(target.figure);

        this.figure.move(target);
        this.board.history.addHistoryMove(this, target);
        this.removeFigure();
        // this.board.emit("move");
        return true;

    }

    public castling(target: Cell) {
        const trgX = target.x,
            trgY = target.y,
            isFlipped = this.board.config.flipped;

        // console.log(trgX, trgY)
        let kingCords: [number, number],
            rookCords: [number, number];

        if (trgX == 0 && trgY == 7) {
            kingCords = isFlipped ? [1, 7] :  [2, 7];
            rookCords = isFlipped ? [2, 7] : [3, 7];
        }
        else if (trgX == 7 && trgY == 7) {
            kingCords = isFlipped ? [5, 7] :  [6, 7];
            rookCords = isFlipped ? [4, 7] : [5, 7];
        }
        else if (trgX == 0 && trgY == 0) {
            kingCords = isFlipped ? [1, 0] : [2, 0];
            rookCords = isFlipped ? [2, 0] : [3, 0];
        }
        else if (trgX == 7 && trgY == 0) {
            kingCords = isFlipped ? [5, 0] : [6, 0];
            rookCords = isFlipped ? [4, 0] : [5, 0];
        }

        const kingCell = this.board.getCell(...kingCords, false),
            rookCell = this.board.getCell(...rookCords, false);

        target.figure.move(rookCell);
        target.removeFigure();
        target.board.history.addHistoryMove(target, rookCell, true);

        this.figure.move(kingCell);
        this.removeFigure();
        this.board.history.addHistoryMove(this, kingCell, true);

    }

    public setFigure(figure: Figure) {
        this.figure = figure;
    }

    public removeFigure() {
        this.figure = null;
    }

    public isEmpty() {
        return this.figure === null;
    }

    public isEnemy(target: Cell) {
        return target.figure?.color != this.figure?.color;
    }

    public isOpponent(player: Player) {
        return this.figure?.color != player.color;
    }

    public swapFigure(value) {
        switch (value) {
            case FigureNames.BISHOP:
                new Bishop(this.figure?.color, this);
                break;
            case FigureNames.QUEEN:
                new Queen(this.figure?.color, this);
                break;
            case FigureNames.KNIGHT:
                new Knight(this.figure?.color, this);
                break;
            case FigureNames.ROOK:
                new Rook(this.figure?.color, this);
                break;
        }
    }
}
import {BoardColors, FigureNames, figuresWeights} from "../types";
import Cell from "../Cell";
import Board from "../Board";
import {NotImplemented} from "../Errors";

type HorizontalDirections = 'left' | 'right';
type VerticalDirections = 'up' | 'down';

export default abstract class Figure {
    preview: string
    name: FigureNames;
    color: BoardColors;
    cell: Cell;
    weight: number;
    board: Board;

    protected constructor(color: BoardColors,
                          cell: Cell,
                          name: FigureNames,
    ) {
        this.color = color;
        this.cell = cell;
        this.name = name;
        this.preview = this.color + this.name;
        this.weight = figuresWeights[this.name];
        this.board = this.cell.board;
        this.cell.setFigure(this);
    }

    public canMove(target: Cell) {
        return !!this.getAvailableMoves().find(cell => cell.id == target.id);
    };

    public move(target: Cell): void {
        this.cell = target;
        this.cell.setFigure(this);
    };

    public getDiagonals(): Cell[] {
        const x = this.cell.x,
            y = this.cell.y,
            moves: Cell[] = [];
        // Checking move to forward
        for (let i = 1;i < 8;i++) {
            let cell = this.board.getCell(x - i, y - i, false);
            if (cell && (cell.isEmpty() || cell.isEnemy(this.cell))) {
                moves.push(cell);
                if (!cell.isEmpty() && cell.isEnemy(this.cell)) {
                    break;
                }
                continue;
            }
            break;
        }
        // Checking move to back
        for (let i = 1;i < 8;i++) {
            let cell = this.board.getCell(x + i, y + i, false);
            if (cell && (cell.isEmpty() || cell.isEnemy(this.cell))) {
                moves.push(cell);
                if (!cell.isEmpty() && cell.isEnemy(this.cell)) {
                    break;
                }
                continue;
            }
            break;
        }
        // Checking move to right
        for (let i = 1;i < 8;i++) {
            let cell = this.board.getCell(x + i, y - i, false);
            if (cell && (cell.isEmpty() || cell.isEnemy(this.cell))) {
                moves.push(cell);
                if (!cell.isEmpty() && cell.isEnemy(this.cell)) {
                    break;
                }
                continue;
            }
            break;
        }
        // Checking move to left
        for (let i = 1;i < 8;i++) {
            let cell = this.board.getCell(x - i, y + i, false);
            if (cell && (cell.isEmpty() || cell.isEnemy(this.cell))) {
                moves.push(cell);
                if (!cell.isEmpty() && cell.isEnemy(this.cell)) {
                    break;
                }
                continue;
            }
            break;
        }

        return moves;
    }

    public getVerticalsAndHorizontal(): Cell[] {
        const x = this.cell.x,
            y = this.cell.y,
            moves: Cell[] = [];

        // Vertical Down
        for (let i = 1;i < 8;i++) {
            const cell = this.board.getCell(x, y + i, false);
            if (cell && (cell.isEmpty() || cell.isEnemy(this.cell))) {
                moves.push(cell);
                if (!cell.isEmpty() && cell.isEnemy(this.cell)) {
                    break;
                }
                continue;
            }
            break;
        }

        // Vertical Up
        for (let i = 1;i < 8;i++) {
            const cell = this.board.getCell(x, y - i, false);
            if (cell && (cell.isEmpty() || cell.isEnemy(this.cell))) {
                moves.push(cell);
                if (!cell.isEmpty() && cell.isEnemy(this.cell)) {
                    break;
                }
                continue;
            }
            break;
        }

        // Horizontal Right
        for (let i = 1;i < 8;i++) {
            const cell = this.board.getCell(x + i, y, false);
            if (cell && (cell.isEmpty() || cell.isEnemy(this.cell))) {
                moves.push(cell);
                if (!cell.isEmpty() && cell.isEnemy(this.cell)) {
                    break;
                }
                continue;
            }
            break;
        }

        // Horizontal Left
        for (let i = 1;i < 8;i++) {
            const cell = this.board.getCell(x - i, y, false);
            if (cell && (cell.isEmpty() || cell.isEnemy(this.cell))) {
                moves.push(cell);
                if (!cell.isEmpty() && cell.isEnemy(this.cell)) {
                    break;
                }
                continue;
            }
            break;
        }

        return moves;
    }

    public isEmptyDiagonal(): boolean {
        throw NotImplemented;
    }

    public isEmptyVertical(): boolean {
        throw NotImplemented;
    }

    public getLastEmptyCellOfHorizontal(direction: HorizontalDirections): Cell | null {
        const x = this.cell.x, y = this.cell.y;
        if (direction == 'right') {
            for (let i = 1; i <= x; i++) {
                const cell = this.board.getCell(x + i, y);
                if (cell && !cell.isEmpty()) {
                    const r = this.board.getCell(x + i - 1, y);
                    return r.isEmpty() ? r : null;
                }
            }
        }
        if (direction == 'left') {
            for (let i = 1; i <= x; i++) {
                const cell = this.board.getCell(x - i, y);
                if (cell && !cell.isEmpty()) {
                    const r = this.board.getCell(x - i + 1, y);
                    return r.isEmpty() ? r : null;
                }
            }
        }
        return null;
    }

    public abstract getAvailableMoves(): Cell[];

}

import Cell from "./Cell";
import {BoardColors, ConfigBoard, FigureNames, initConfigBoard, OptionalConfigBoard} from "./types";
import {Bishop, King, Knight, Pawn, Queen, Rook} from "./Figures";
import Figure from "./Figures/Figure";
import HistoryBoard from "./HistoryBoard";
import {BoardEmitter, BoardEvents, ICallbacks} from "./BoardEmitter";


export default class Board {
    config: ConfigBoard;
    cells: Cell[][];
    lostBlackFigures = [];
    lostWhiteFigures = [];
    history: HistoryBoard;
    emr: BoardEmitter;

    constructor(config: OptionalConfigBoard = {}) {
        this.cells = [];
        this.history = new HistoryBoard();
        this.emr = new BoardEmitter();
        this.setConfig(config);
        this.initBoard();

        this.initFigures();
        // this.testFigures();

    }
    public getCell(x: number, y: number, behaviorFlipped?: boolean): Cell | null {
        if (x > 7 || y > 7 || x < 0 || y < 0) {
            // console.warn("Error getCell: ", x, y)
            return null
        }
        if (behaviorFlipped == undefined) {
            behaviorFlipped = this.config.flipped
        }
        if (this.config.flipped && behaviorFlipped) {
            x = 7 - x;
            y = 7 - y;
        }
        return this.cells[x][y];
    }

    public getCellById(id: string): Cell | null {
        if (!id) return null;
        return this.cells.flat(1).find(cell => cell.id === id) ?? null;
    }

    public addLostFigure(figure: Figure) {
        if (figure.color == BoardColors.WHITE) {
            this.lostWhiteFigures.push(figure);
        } else {
            this.lostBlackFigures.push(figure);
        }
    }

    public findLostFigure(id: string) {
        return this.lostBlackFigures.find(item => item.id == id)
            ?? this.lostWhiteFigures.find(item => item.id == id)
            ?? null
    }

    public findFigure(name: FigureNames, color: BoardColors): Figure | null {
        const cell = this.cells
            .flat(1)
            .find(cell => {
                const figure = cell.figure;
                if (!figure) {
                    return null;
                }
                return (figure.name == name && figure.color == color);
            });
        return cell.figure ?? null;
    }

    private initBoard() {
        for (let i = 0;i < 8;i++) {
            let row: Cell[] = [];
            for (let k = 0;k < 8;k++) {
                if ((i + k) % 2 == 0) {
                    row.push(new Cell(i, k, BoardColors.WHITE, this))
                } else {
                    row.push(new Cell(i, k, BoardColors.BLACK, this))
                }

            }
            this.cells.push(row)
        }
    }

    private initPawns() {
        for (let i = 0;i < 8;i++) {
            new Pawn(BoardColors.WHITE, this.getCell(i, 6))
        }
        for (let i = 0;i < 8;i++) {
            new Pawn(BoardColors.BLACK, this.getCell(i, 1))
        }
    }

    private initKnights() {
        new Knight(BoardColors.BLACK, this.getCell(1,0))
        new Knight(BoardColors.BLACK, this.getCell(6,0))
        new Knight(BoardColors.WHITE, this.getCell(1,7))
        new Knight(BoardColors.WHITE, this.getCell(6,7))
    }

    private initBishops() {
        new Bishop(BoardColors.BLACK, this.getCell(2,0))
        new Bishop(BoardColors.BLACK, this.getCell(5,0))
        new Bishop(BoardColors.WHITE, this.getCell(2,7))
        new Bishop(BoardColors.WHITE, this.getCell(5,7))
    }

    private initRooks() {
        new Rook(BoardColors.BLACK, this.getCell(0,0))
        new Rook(BoardColors.BLACK, this.getCell(7,0))
        new Rook(BoardColors.WHITE, this.getCell(0,7))
        new Rook(BoardColors.WHITE, this.getCell(7,7))
    }

    private initQueens() {
        new Queen(BoardColors.BLACK, this.getCell(3,0))
        new Queen(BoardColors.WHITE, this.getCell(3,7))
    }

    private initKings() {
        new King(BoardColors.BLACK, this.getCell(4,0))
        new King(BoardColors.WHITE, this.getCell(4,7))
    }

    private initFigures() {
        this.initPawns();
        this.initKnights();
        this.initBishops();
        this.initRooks();
        this.initQueens();
        this.initKings();
    }

    private testFigures() {
        this.initPawns();
        // this.initKnights();
        // this.initBishops();
        this.initRooks();
        // this.initQueens();
        this.initKings();
        // new Rook(BoardColors.WHITE, this.getCell(0, 0));
        // new Rook(BoardColors.BLACK, this.getCell(7, 0));

        // new King(BoardColors.WHITE, this.getCell(1, 2));
        // new King(BoardColors.BLACK, this.getCell(7, 2));

        // for (let i = 0;i < 8;i++) {
        //     new Pawn(BoardColors.WHITE, this.getCell(i, 6))
        // }
        // for (let i = 0;i < 8;i++) {
        //     new Pawn(BoardColors.BLACK, this.getCell(i, 1))
        // }
        // new Pawn(BoardColors.WHITE, this.getCell(3, 7));
        // new Queen(BoardColors.WHITE, this.getCell(0, 7));
    }

    private setConfig(config: OptionalConfigBoard) {
        this.config = {...initConfigBoard, ...config} ?? initConfigBoard
    }
}


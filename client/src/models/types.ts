import Cell from "./Cell";
import Figure from "./Figures/Figure";

export enum FigureNames {
    PAWN = 'p',
    BISHOP = 'b',
    KNIGHT = 'n',
    ROOK = 'r',
    QUEEN = 'q',
    KING = 'k',
    EMPTY = 'empty-pool'
}

export enum BoardColors {
    BLACK = "b",
    WHITE = "w",
}

type FiguresWeights = {[key in FigureNames]: number}

export const figuresWeights: FiguresWeights = {
    [FigureNames.PAWN]: 1,
    [FigureNames.BISHOP]: 3,
    [FigureNames.KNIGHT]: 3,
    [FigureNames.ROOK]: 5,
    [FigureNames.QUEEN]: 8,
    [FigureNames.KING]: Number.MAX_VALUE,
    [FigureNames.EMPTY]: Number.MAX_VALUE
}

export interface ConfigBoard {
    withFigures: boolean,
    flipped: boolean,
}

export type OptionalConfigBoard = {
    [key in keyof ConfigBoard]?: ConfigBoard[keyof ConfigBoard]
}

export const initConfigBoard = {
    withFigures: true,
    flipped: false,
}

export interface IHistory {
    from: Cell,
    to: Cell,
    figure: Figure,
    isCastle: boolean
}


import Cell from "../models/Cell";
import {FigureNames} from "../models/types";

export interface DraggingState {
    isDragging: boolean
    startX: number,
    startY: number,
    offsetX: number,
    offsetY: number
}

export enum BoardClasses {
    DRAGGING = 'dragging',
    CELL = 'cell',
    FIGURES = 'figures',
    WITHOUT_ANIMATION = 'without-animation',
}

export interface CellState {
    node: HTMLDivElement | null,
    cell: Cell | null,
    clickedCounts: number,
    hints: Cell[]
}

export interface SelectListState {
    target: Cell,
    value: FigureNames | null,
    isShow: boolean,
    cell: Cell
}
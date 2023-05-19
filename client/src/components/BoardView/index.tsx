import React from 'react';
import CellView from "./CellView";
import Board from "../../models/Board";
import Cell from "../../models/Cell";
import Player from "../../models/Player";
import Highlight from "./Highlight";
import {BoardClasses, CellState, DraggingState, SelectListState} from "../../interfaces/board-view.interfaces";
import {getTranslateByCords} from "../../utils/func";
import {MAX_CLICKED_COUNTS, RESET_CLICKED_COUNTS} from "../../utils/const";
import {BoardColors, FigureNames} from "../../models/types";
import {Pawn} from "../../models/Figures";
import SwapList from "./SwapList";

interface BoardUIProps {
    currentPlayer: Player,
    swapPlayers: () => void;
    board: Board,
    cells?: Cell[]
}

const initDraggingState: DraggingState = {
    isDragging: false,
    startX: Number.MAX_VALUE,
    startY: Number.MAX_VALUE,
    offsetX: Number.MAX_VALUE,
    offsetY: Number.MAX_VALUE
}

// Clicked counts used for toggle effect
const initCellState: CellState = {
    node: null,
    cell: null,
    clickedCounts: 0,
    hints: []
}

const selectListInit: SelectListState = {
    value: null,
    isShow: false,
    target: null,
    cell: null,
}

const BoardView: React.FC<BoardUIProps> = ({board, currentPlayer, swapPlayers}) => {
    const boardRef = React.useRef<HTMLDivElement>(null);
    const [cellState, setCellState] = React.useState<CellState>(initCellState);
    const [draggingState, setDraggingState] = React.useState<DraggingState>(initDraggingState);
    const [hoverCell, setHoverCell] = React.useState<Cell | null>(null);
    const [selectListState, setSelectListState] = React.useState(selectListInit);

    const isCanMove = (target: Cell) => {
        return !!cellState.hints.find(cell => cell.id == target.id);
    }

    const moveFigure = (target: Cell) => {
        if (!cellState.cell)
            return false;
        if (!isCanMove(target))
            return false;
        // Check if this pawn for swap
        if (cellState.cell.figure.name == FigureNames.PAWN) {
            const pawn = cellState.cell.figure as Pawn;
            if (pawn.isCanSwap(target)) {
                setSelectListState(prevState => ({...prevState, cell: cellState.cell, target: target, isShow: true}));
                return false;
            }
        }
        if (!cellState.cell.moveFigure(target))
            return false;

        swapPlayers();
        return true;
    }

    // Handler for swap pawn
    React.useEffect(() => {
        const {cell, value, target} = selectListState;
        if (!value || !cell || !value) {
            return;
        }
        cell.moveFigure(target);
        target.swapFigure(value);
        setSelectListState(selectListInit);
        swapPlayers();
    }, [selectListState.value])

    const onStartDragFigure = (e: React.MouseEvent, cell: Cell) => {
        // console.log(cell)
        if (draggingState.isDragging)
            return setCellState(initCellState);

        const cellTarget = e.target as HTMLDivElement;

        if (!cellTarget)
            return setCellState(initCellState);

        // Check is possibly beat figure
        if (cellState.cell) {
            if (moveFigure(cell)) {
                return setCellState(initCellState);
            }
        }

        if (cellState.cell && (cellState.cell.id != cell.id)) {
            setCellState(s => ({...s, clickedCounts: RESET_CLICKED_COUNTS}));
        }

        const cellHeight = cellTarget.clientHeight,
            cellWidth = cellTarget.clientWidth,
            boardRects = boardRef.current.getBoundingClientRect(),
            cellRects = cellTarget.getBoundingClientRect();

        // Offset for click, counted by OX, OY where O(0,0) is center of cell node
        const offsetDragX = ((e.clientX - cellRects.x) - (cellWidth / 2));
        const offsetDragY = (((cellRects.y - e.clientY)) + (cellHeight / 1.7));

        // Init X,Y
        const startX = (cellRects.x - boardRects.x),
            startY = (cellRects.y - boardRects.y);

        // Add styles and classes
        cellTarget.style.transform = `translate(${startX + offsetDragX}px, ${startY - offsetDragY}px`;
        cellTarget.classList.add(BoardClasses.DRAGGING);
        cellTarget.classList.remove("drag");

        // Hints and check which player move
        const hints = !cell.isOpponent(currentPlayer) ? (cell.figure?.getAvailableMoves() ?? []) : [];

        setCellState(s => ({
            node: cellTarget,
            cell: cell,
            clickedCounts: s.clickedCounts + 1,
            hints: hints
        }))

        setDraggingState({
            isDragging: true,
            startX,
            startY,
            offsetX: cellRects.x + (cellWidth / 2),
            offsetY: cellRects.y + (cellHeight / 2)
        })
        setHoverCell(cell);
    }

    const onDraggingFigure = (e: MouseEvent) => {
        if (!draggingState.isDragging) return;
        // Shift figure
        const {startX, startY, offsetX, offsetY} = draggingState;
        const diffX = startX + e.clientX - offsetX;
        const diffY = startY + e.clientY - offsetY;

        cellState.node.style.transform = `translate(${diffX}px, ${diffY}px)`

        // Capture element
        const targetCell = e.target as HTMLElement,
            rectsCell = targetCell.getBoundingClientRect(),
            rectsBoard = boardRef.current.getBoundingClientRect(),
            cellHeight = targetCell.clientHeight,
            cellWidth = targetCell.clientWidth;

        // Get X Y cords of Board of Cell
        let x = Math.floor((rectsCell.x - (rectsBoard.x - cellWidth / 2)) / cellWidth);
        let y = Math.floor((rectsCell.y - (rectsBoard.y - cellHeight / 2.2)) / cellHeight);

        if (board.config.flipped) {
            y = 7 - y;
            x = 7 - x;
        }
        const captureCell = board.getCell(x, y);
        if (captureCell) {
            setHoverCell(captureCell);
        }
    }

    const onStopDragFigure = () => {
        setDraggingState(initDraggingState);
    }
    // Listen onStopDrag. Reset cellState or Move Figure
    React.useEffect(() => {
        if (!cellState.cell)
            return;
        if (draggingState.isDragging)
            return;

        setHoverCell(null);

        const {cell, node, clickedCounts} = cellState;
        const boardNode = boardRef.current as HTMLDivElement;
        if (hoverCell) {
            if (moveFigure(hoverCell)) {
                setCellState(initCellState);
                boardNode.classList.add("without-animation")
                node.style.visibility = "hidden";
            }
        }
        node.style.transform = getTranslateByCords(cell.x, cell.y);
        node.classList.remove(BoardClasses.DRAGGING);
        if (clickedCounts == MAX_CLICKED_COUNTS) {
            setCellState(initCellState);
        }

    }, [draggingState.isDragging]);

    const onResetCellState = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains(BoardClasses.FIGURES)) {
            setCellState(initCellState);
        }
    }

    React.useEffect(() => {
        if (!draggingState.isDragging) {
            return;
        }
        window.addEventListener('mousemove', onDraggingFigure)
        window.addEventListener('mouseup', onStopDragFigure);
        return () => {
            window.removeEventListener('mousemove', onDraggingFigure)
            window.removeEventListener('mouseup', onStopDragFigure);
        }
    }, [draggingState.isDragging]);

    React.useEffect(() => {
        window.addEventListener('click', onResetCellState);
        return () => {
            window.removeEventListener('click', onResetCellState);
        }
    }, []);

    return (
        <div className="board">
            <div className="boardSize">
                <div className="boardContainer"
                     ref={boardRef}
                >
                    {/*Selectable list for swap pawn */}
                    { selectListState.isShow &&
                        <SwapList color={currentPlayer.color}
                                  startX={selectListState.target?.x}
                                  isBottom={!board.config.flipped ? selectListState.cell.figure.color == BoardColors.BLACK : selectListState.cell.figure.color == BoardColors.WHITE}
                                  onSelect={setSelectListState}
                        />
                    }
                    {/* Highlight for hover cell */}
                    {
                        hoverCell &&
                        <Highlight type="hover" cell={hoverCell}/>
                    }
                    {
                        !board.history.isEmpty() &&
                        <>
                            <Highlight type="active" cell={board.history.last().from}/>
                            <Highlight type="active" cell={board.history.last().to}/>
                        </>
                    }
                    {/* Highlight hints cell */}
                    {
                        cellState.hints.length > 0 &&
                        cellState.hints.map(cell =>
                            <Highlight key={cell.id}
                                       cell={cell}
                                       type="hint"
                                       onDragStart={onStartDragFigure}
                        />)
                    }
                    {/* Highlight active cell */}
                    {
                        cellState.cell &&
                        <Highlight type="active" cell={cellState.cell}/>
                    }
                    {
                        board.cells.flat(1).map(cell =>
                            (cell.figure || board.findLostFigure(cell.id)) &&
                            <CellView key={cell.id}
                                      cell={cell}
                                      onDragStart={onStartDragFigure}
                                      board={board}
                                />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default BoardView;
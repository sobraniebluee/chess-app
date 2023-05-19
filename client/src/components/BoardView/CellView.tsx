import React from 'react';
import {clsx, getTranslateByCords} from "../../utils/func";
import Cell from "../../models/Cell";
import Board from "../../models/Board";
import {BoardClasses} from "../../interfaces/board-view.interfaces";
import {ANIMATION_CELL_DELAY} from "../../utils/const";


interface CellProps {
    cell: Cell,
    board?: Board
    onDragStart: (e: React.MouseEvent, cell: Cell) => void,
}

const getCellStyles = (cell: Cell): React.CSSProperties => ({
    transform: `translate(${100 * cell.x}%,  ${100 * cell.y}%)`,
    cursor: !!cell.figure ? "grab" : "auto",
    transition: "none"
})


const CellView: React.FC<CellProps> = ({cell, board, onDragStart}) => {
    const {id, x, y, color, figure} = cell;
    const history = board.history;
    const cellRef = React.useRef<HTMLDivElement>(null);

    const handlerDragStart = (event: React.MouseEvent) => {
        onDragStart(event, cell);
    }

    // Animation cell
    const handlerAnimationMoveUnmounted = () => {
        if (history.isEmpty()) {
            return;
        }
        const destCell = history.last(id).to;

        // HTML nodes gets by querySelector because I can't get access by refs  when unmounted event invoke
        const cellNode = document.querySelector(`[data-id="${destCell.id}"]`) as HTMLDivElement;
        const boardNode = document.querySelector(".boardContainer") as HTMLDivElement;

        // When user used drag event instead of click animation not needed
        if (boardNode.classList.contains(BoardClasses.WITHOUT_ANIMATION)) {
            boardNode.classList.remove(BoardClasses.WITHOUT_ANIMATION)
            return;
        }
        cellNode.style.transform = getTranslateByCords(x, y);
        const timer = setTimeout(() => {
            cellNode.style.transition = `${ANIMATION_CELL_DELAY}ms`
            cellNode.style.transform = getTranslateByCords(destCell.x, destCell.y);
            setTimeout(() => {
                cellNode.style.transition = "none";
                clearTimeout(timer);
            }, ANIMATION_CELL_DELAY)
        }, 0);
    }

    React.useEffect(() => {
        return handlerAnimationMoveUnmounted
    }, [cell]);

    return (
        <div className={clsx(
                BoardClasses.CELL,
                figure ? `${BoardClasses.FIGURES} ${figure.preview}` : "",)}
             ref={cellRef}
             onMouseDown={handlerDragStart}
             data-color={color}
             draggable={false}
             style={getCellStyles(cell)}
             id={id}
             data-id={id}
             data-cords={`(${x},${y})`}
        >
        </div>
    );
};

export default CellView;
import React from 'react';
import {clsx} from "../../utils/func";
import Cell from "../../models/Cell";
import {BoardClasses} from "../../interfaces/board-view.interfaces";

interface HintProps {
    cell: Cell
    type: 'active' | 'hint' | 'hover' | 'previous',
    styles?: React.CSSProperties,
    onDragStart?: (e: React.MouseEvent, cell: Cell) => void,

}


const Highlight: React.FC<HintProps> = ({cell,type, styles, onDragStart}) => {
    const {id, x, y} = cell;

    const handlerDragStart = (event: React.MouseEvent) => {
        onDragStart ? onDragStart(event, cell) : () => {};
    }
    return (
        <div className={clsx(BoardClasses.CELL, "highlight", type)}
             style={{transform:`translate(${100 * x}%,  ${100 * y}%)`, ...styles}}
             onMouseDown={handlerDragStart}
             id={id}
        >
            { type == "hint" && <div className={cell.figure ? "circle-capture" : "circle"}></div> }
            { type == "hover" && <div className="inner-border"></div> }
        </div>
    );
};


export default Highlight;
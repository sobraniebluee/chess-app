import React from 'react';
import {clsx} from "../../utils/func";
import {BoardClasses, SelectListState} from "../../interfaces/board-view.interfaces";
import {BoardColors, FigureNames} from "../../models/types";
import {CrossIcon} from "../../common/Icons";

interface SwapListProps {
    color: BoardColors,
    startX: number,
    isBottom: boolean,
    onSelect: (state: SelectListState | ((prevState: SelectListState) => void)) => void,
}

const figures: FigureNames[] = [
    FigureNames.QUEEN,
    FigureNames.KNIGHT,
    FigureNames.ROOK,
    FigureNames.BISHOP
];

const getStyles = (startX: number, isBottom: boolean): React.CSSProperties => ({
    transform: `translate(${startX * 100}%, ${isBottom ? 79 : 0}%)`,
    flexDirection: isBottom ? "column-reverse" : "column"
})


const SwapList: React.FC<SwapListProps> = ({color, startX, isBottom, onSelect}) => {

    const onSelectHandler = (e: React.MouseEvent) => {
        const target = e.target as HTMLDivElement;
        const figureName = target.getAttribute('data-name') as FigureNames;
        onSelect(prevState => ({...prevState, value: figureName, isShow: false}));
    }

    const closeHandler = (e: MouseEvent) => {
        const target = e.target as HTMLDivElement;
        if (!target.classList.contains('swap')) {
            onSelect(prevState => ({...prevState, value: null, isShow: false}));
        }
    }
    React.useEffect(() => {
        window.addEventListener('click', closeHandler)
        return () => {
            window.removeEventListener('click', closeHandler)
        }
    }, [])
    return (
        <div className="swap-list" style={getStyles(startX, isBottom)}>
            {
                figures.map(figure => {
                    return <div key={figure}
                                className={clsx(BoardClasses.CELL, "swap", "figures", `${color}${figure}`)}
                                draggable={false}
                                onClick={onSelectHandler}
                                data-name={figure}
                            />
                })
            }
            <div className="close">
                <CrossIcon width={24} height={24} />
            </div>
        </div>
    );
};

export default SwapList;
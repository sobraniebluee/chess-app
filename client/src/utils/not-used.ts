export {};

// import {getTranslateByCords} from "./func";
// import {ANIMATION_CELL_DELAY} from "./const";
//
// const handlerAnimationMoveMounted = () => {
//     if (history.isEmpty()) {
//         return;
//     }
//     let timer;
//     const cellNode = cellRef.current as HTMLDivElement;
//     const {from} = history.last();
//     cellNode.style.transform = getTranslateByCords(from.x, from.y);
//     timer = setTimeout(() => {
//         cellNode.style.transition = `${ANIMATION_CELL_DELAY}ms`
//         cellNode.style.transform = getTranslateByCords(x, y);
//         setTimeout(() => {
//             cellNode.style.transition = "none"
//         }, ANIMATION_CELL_DELAY)
//     }, 0);
//
//     console.log("prev", from, cell)
//
//     return () => {
//         clearTimeout(timer);
//         console.log("Unmount", cell, cellRef.current)
//     }
// }


/* ------- FOR ALL CELLS ------- */
// Check is possibly move to empty cell
// if (cell.isEmpty()) {
//     if (!cellState.cell) {
//         return setCellState(initCellState);
//     }
//     if (!isCanMove(cell)) {
//         return setCellState(initCellState);
//     }
// }
/* ------- FOR ALL CELLS ------- */

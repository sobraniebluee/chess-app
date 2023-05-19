import React from 'react';
import BoardView from "../BoardView";
import Board from "../../models/Board";
import Player from "../../models/Player";
import {BoardColors} from "../../models/types";


const Game: React.FC = () => {
    const [playerOne, ] = React.useState(new Player(BoardColors.WHITE));
    const [playerTwo, ] = React.useState(new Player(BoardColors.BLACK));
    const [currentPlayer, setCurrentPlayer] = React.useState<Player>(playerOne);
    const [board, ] = React.useState(new Board({flipped: false}));

    const swapPlayers = () => {
        if (currentPlayer.color == playerOne.color) {
            setCurrentPlayer(playerTwo);
        } else {
            setCurrentPlayer(playerOne);
        }
    }

    React.useEffect(() => {
        // console.log("Lost Figures [w,b]:", board.lostWhiteFigures, board.lostBlackFigures, board.history)
    }, [currentPlayer]);

    return (
        <>
            <h1>Current Player: {currentPlayer.color == BoardColors.WHITE ? "WHITE" : "BLACK"}</h1>
            <BoardView
                board={board}
                currentPlayer={currentPlayer}
                swapPlayers={swapPlayers}
            />
        </>
    );
};

export default Game;
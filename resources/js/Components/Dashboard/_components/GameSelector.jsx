import React from "react";

const GameSelector = ({ selectedGame, gameList, gameSelectHandler }) => {
    return (
        <select
            name="game_selector"
            id="game_selector"
            value={selectedGame}
            onChange={gameSelectHandler}
            className="border-none text-[12px] pl-3 pr-[26px] py-1"
        >
            <option value="">게임 전체</option>
            {gameList.map((game) => (
                <option key={game} value={game}>
                    {game}
                </option>
            ))}
        </select>
    );
};

export default GameSelector;

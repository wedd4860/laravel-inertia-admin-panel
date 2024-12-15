import React, { useEffect, useState } from "react";
import GameSelector from "../GameSelector";
import DateSelector from "../DateSelector";
import ManagerSelector from "../ManagerSelector";

const SelectorPanel = ({
    selectedGame,
    gameList,
    gameSelectHandler,
    selectedManager,
    managerList,
    managerSelectHandler,
    dateSelectHandler,
    calendarDate,
}) => {
    return (
        <div className="flex flex-wrap py-3 items-center">
            <div className="flex gap-x-2 text-[14px]">
                <GameSelector
                    selectedGame={selectedGame}
                    gameSelectHandler={gameSelectHandler}
                    gameList={gameList}
                />
                <ManagerSelector
                    selectedManager={selectedManager}
                    managerList={managerList}
                    managerSelectHandler={managerSelectHandler}
                />
            </div>
            <div className="flex items-center ml-auto">
                <DateSelector
                    calendarDate={calendarDate}
                    dateSelectHandler={dateSelectHandler}
                />
            </div>
        </div>
    );
};

export default SelectorPanel;

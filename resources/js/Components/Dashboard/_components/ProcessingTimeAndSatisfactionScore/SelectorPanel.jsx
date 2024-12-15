import React, { useEffect, useState } from "react";
import GameSelector from "../GameSelector";
import DateSelector from "../DateSelector";
import ManagerSelector from "../ManagerSelector";
import TypeToggleButtons from "./TypeToggleButtons";
const SelectorPanel = ({
    selectedGame,
    gameList,
    gameSelectHandler,
    selectedManager,
    managerList,
    managerSelectHandler,
    dateSelectHandler,
    calendarDate,
    graphType,
    graphTypeToggleHandler,
}) => {
    return (
        <div className="flex flex-wrap py-3 items-center relative">
            <div className="flex gap-x-2 text-[14px]">
                <TypeToggleButtons
                    graphType={graphType}
                    graphTypeToggleHandler={graphTypeToggleHandler}
                />

                {graphType === "game" ? (
                    <GameSelector
                        selectedGame={selectedGame}
                        gameSelectHandler={gameSelectHandler}
                        gameList={gameList}
                    />
                ) : (
                    <ManagerSelector
                        selectedManager={selectedManager}
                        managerList={managerList}
                        managerSelectHandler={managerSelectHandler}
                    />
                )}
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

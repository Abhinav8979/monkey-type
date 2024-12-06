import Typing from "../components/Typing";
import Options from "../components/Options";
import Timer from "../utils/Timer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setPracticeGameResult,
  setPracticeGameStart,
} from "../redux/features/practiceSlice";
import PracticeResult from "../components/results/PracticeResult";
import ProgressBar from "../utils/ProgressBar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Practice = () => {
  const selectedOption = useAppSelector(
    (state) => state.practice.selectedOptions
  );
  // console.log(selectedOption);
  const gameStart = useAppSelector((state) => state.practice.startPracticeGame);
  const gameResult = useAppSelector(
    (state) => state.practice.showPracticeGameResult
  );

  const pathname = useLocation().pathname;

  const [isPracticeMode, setIsPracticeMode] = useState(false);

  const dispatch = useAppDispatch();

  const handleTimeUp = () => {
    dispatch(setPracticeGameResult(true));
    dispatch(setPracticeGameStart(false));
  };

  useEffect(() => {
    if (pathname === "/practice") {
      console.log("Reched");
      setIsPracticeMode(true);
    }
  }, [pathname]);

  return (
    <>
      {gameResult && !isPracticeMode ? (
        <PracticeResult />
      ) : (
        <section>
          {gameStart && !isPracticeMode ? (
            <ProgressBar />
          ) : (
            <div className="w-full h-[46px]"></div>
          )}
          <Typing />
          {gameStart && !isPracticeMode ? (
            <div className="text-textIncorrectColor text-sm opacity-80  md:text-3xl mt-12 text-center">
              <h1>
                <span className="text-textPrimary">Ends in: </span>
                <Timer
                  startTime={selectedOption.time}
                  onTimeUp={handleTimeUp}
                />
              </h1>
            </div>
          ) : (
            <Options />
          )}
        </section>
      )}
    </>
  );
};

export default Practice;

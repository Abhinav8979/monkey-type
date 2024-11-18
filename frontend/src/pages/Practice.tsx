import Typing from "../components/Typing";
import Options from "../components/Options";
import Timer from "../utils/Timer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setShowPracticeGame } from "../redux/features/practiceSlice";
import OneVsOneResult from "../components/OneVsOneResult";

const Practice = () => {
  const selectedOption = useAppSelector(
    (state) => state.practice.selectedOptions
  );
  const gameStart = useAppSelector((state) => state.practice.startPracticeGame);
  const gameResult = useAppSelector(
    (state) => state.practice.showPracticeGameResult
  );

  const dispatch = useAppDispatch();

  const handleTimeUp = () => {
    dispatch(setShowPracticeGame(true));
  };
  console.log(selectedOption);

  return (
    <>
      {gameResult ? (
        <OneVsOneResult />
      ) : (
        <section>
          <Typing />

          {gameStart ? (
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

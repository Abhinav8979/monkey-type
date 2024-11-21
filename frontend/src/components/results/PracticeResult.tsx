import { Link } from "react-router-dom";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPracticeGameResult } from "../../redux/features/practiceSlice";
import { useEffect, useState } from "react";
import { PracticeGameResult } from "../../types";
import {
  calculateAccuray,
  calculateRawWPM,
  calculateWPM,
} from "../../utils/helperFunction";

const PracticeResult = () => {
  const dispatch = useAppDispatch();
  const [gameResult, setGameResult] = useState<PracticeGameResult | null>(null);
  const name = localStorage.getItem("playerName");

  const typedWords = useAppSelector((state) => state.practice.noOfWordsTyped);
  const totalWords = useAppSelector((state) => state.practice.totalWords);
  const incorrect = useAppSelector(
    (state) => state.practice.incorrectWordsTyped
  );
  const correct = useAppSelector((state) => state.practice.correctWordsTyped);
  const extra = useAppSelector((state) => state.practice.extraWordsTyped);
  const time =
    useAppSelector((state) => state.practice.selectedOptions.group1) || 15;

  useEffect(() => {
    if (!!correct && !!incorrect) {
      const raw = calculateRawWPM(typedWords, time, totalWords);
      const wps = calculateWPM(time, correct, typedWords);
      const accuracy = calculateAccuray(correct, typedWords);
      setGameResult({
        wps,
        raw,
        accuracy,
        time,
        incorrect,
        correct,
        extra,
      });
    }
  }, []);

  if (!gameResult) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <section className="flex gap-7 w-full  justify-center">
        <main
          className={`rounded-2xl px-10 py-10 w-1/2 border-2 border-textPrimary bg-bgColor`}
        >
          <div className="text-textPrimary flex justify-between items-center">
            <h2 className="md:text-6xl text-3xl font-semibold capitalize">
              {name ? name : "UnkownUser"}
            </h2>
          </div>
          <div className="mt-12 capitalize">
            <div className="flex justify-around">
              <h1>
                <span className="text-5xl mx-2">{gameResult?.wps}</span>Wpm
              </h1>
              <h1>
                <span className="text-5xl mx-2">
                  {gameResult?.accuracy + "%"}
                </span>
                Accuracy
              </h1>
              <h1>
                <span className="text-5xl mx-2">{gameResult?.time}</span>Sec
              </h1>
              <h1>
                <span className="text-5xl mx-2">{gameResult?.raw}</span>Raw
              </h1>
            </div>

            <div className="flex justify-around items-end mt-12">
              <div className="flex flex-col  gap-1">
                <h1 className="text-2xl mb-1">Characters</h1>
                <div className="flex items-end gap-1">
                  <h3 className="text-5xl">{gameResult?.correct}</h3>
                  <h3>Correct</h3>
                </div>
              </div>
              <h3>
                {" "}
                <span className="text-5xl mx-2">{gameResult?.incorrect}</span>
                incorrect
              </h3>
              <h3>
                {" "}
                <span className="text-5xl mx-2">{gameResult?.extra}</span>extra
              </h3>
              <h3>
                {" "}
                <span className="text-5xl mx-2">
                  {totalWords - (gameResult?.correct + gameResult?.incorrect)}
                </span>
                missed
              </h3>
            </div>
          </div>
        </main>
      </section>
      <div className="flex items-center justify-center gap-10 mt-10 font-semibold">
        <div
          onClick={() => dispatch(setPracticeGameResult(false))}
          className="cursor-pointer py-2 px-6 border border-textPrimary hover:bg-textPrimary hover:text-bgColor transition-colors duration-300 rounded-3xl flex items-center gap-2"
        >
          <FaArrowLeft />
          <Link to="/">Back</Link>
        </div>
        <div className="cursor-pointer py-2 px-6 border border-textPrimary hover:bg-textPrimary hover:text-bgColor transition-colors duration-300 rounded-3xl flex items-center gap-2">
          <FaShareAlt />
          <h1>Share</h1>
        </div>
      </div>
    </>
  );
};

export default PracticeResult;

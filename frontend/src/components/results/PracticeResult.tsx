import { Link } from "react-router-dom";
import { FaArrowLeft, FaShareAlt } from "react-icons/fa";
import { useAppDispatch } from "../../redux/hooks";
import { setPracticeGameResult } from "../../redux/features/practiceSlice";

const PracticeResult = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <section className="flex gap-7 w-full  justify-center">
        <main
          className={`rounded-2xl px-10 py-10 w-1/2 border-2 border-textPrimary bg-bgColor`}
        >
          <div className="text-textPrimary flex justify-between items-center">
            <h2 className="md:text-6xl text-3xl font-semibold capitalize">
              name (you)
            </h2>
          </div>
          <div className="mt-12 capitalize">
            <div className="flex justify-around">
              <div>Wpm</div>
              <div>Accuracy</div>
              <div>Sec</div>
              <div>Raw</div>
            </div>

            <div className="flex justify-around mt-12">
              <div className="flex flex-col gap-1">
                <h3>Characters</h3>
                <div className="flex gap-1">
                  <h3>50</h3>
                  <h3>Correct</h3>
                </div>
              </div>
              <div>incorrect</div>
              <div>extra</div>
              <div>missed</div>
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

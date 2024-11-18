import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaShareAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const OneVsOneResult = () => {
  const [expandResult, setExpandResult] = useState<boolean>(false);

  return (
    <>
      <section className="flex gap-7 w-full">
        <main
          className={`rounded-2xl ${
            expandResult ? "w-[20%] p-5" : "flex-1 px-10 py-10"
          }  border-2 border-textPrimary bg-bgColor transition-all duration-300 ease-in-out`}
        >
          <div
            style={{
              fontWeight: expandResult ? "bolder" : "bold",
            }}
            className="text-textPrimary flex justify-between items-center"
          >
            <h2
              className={`${
                expandResult ? "md:text-2xl" : "md:text-6xl text-3xl"
              } capitalize`}
            >
              name (you)
            </h2>
            <h1
              className={`${
                expandResult ? "md:text-3xl text-xl" : "md:text-9xl text-4xl"
              }`}
            >
              #1
            </h1>
          </div>
          <div className="mt-12 capitalize">
            <div
              style={{
                flexDirection: expandResult ? "column" : "row",
                gap: expandResult ? "32px" : 0,
              }}
              className="flex justify-around"
            >
              <div>Wpm</div>
              <div>Accuracy</div>
              <div>Sec</div>
              <div>Raw</div>
            </div>
            {expandResult ? (
              <div
                className="mt-10 text-center cursor-pointer hover:opacity-75 duration-200 transition-opacity flex items-center justify-center gap-2"
                onClick={() => setExpandResult((prev) => !prev)}
              >
                <p>Expand Result</p>
                <FaChevronRight />
              </div>
            ) : (
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
            )}
          </div>
        </main>
        <main
          className={`rounded-2xl ${
            !expandResult ? "w-[20%] p-5" : "flex-1 px-10 py-10"
          }  border-2 border-textPrimary bg-bgColor transition-all duration-300 ease-in-out`}
        >
          <div
            style={{
              fontWeight: !expandResult ? "bolder" : "bold",
            }}
            className="text-textPrimary flex justify-between items-center"
          >
            <h2
              className={`${
                !expandResult ? "md:text-2xl" : "md:text-6xl text-3xl"
              } capitalize`}
            >
              name (you)
            </h2>
            <h1
              className={`${
                !expandResult ? "md:text-3xl text-xl" : "md:text-9xl text-4xl"
              }`}
            >
              #2
            </h1>
          </div>
          <div className="mt-12 capitalize">
            <div
              style={{
                flexDirection: !expandResult ? "column" : "row",
                gap: !expandResult ? "32px" : 0,
              }}
              className="flex justify-around"
            >
              <div>Wpm</div>
              <div>Accuracy</div>
              <div>Sec</div>
              <div>Raw</div>
            </div>
            {!expandResult ? (
              <div
                className="mt-10 text-center cursor-pointer hover:opacity-75 duration-200 transition-opacity flex items-center justify-center gap-2"
                onClick={() => setExpandResult((prev) => !prev)}
              >
                <FaChevronLeft />
                <p>Expand Result</p>
              </div>
            ) : (
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
            )}
          </div>
        </main>
      </section>
      <div className="flex items-center justify-center gap-10 mt-10 font-semibold">
        <div className="cursor-pointer py-2 px-6 border border-textPrimary hover:bg-textPrimary hover:text-bgColor transition-colors duration-300 rounded-3xl flex items-center gap-2">
          <FaArrowLeft />
          <Link to="/play-1v1">Back in lobby</Link>
        </div>
        <div className="cursor-pointer py-2 px-6 border border-textPrimary hover:bg-textPrimary hover:text-bgColor transition-colors duration-300 rounded-3xl flex items-center gap-2">
          <FaShareAlt />
          <h1>Share</h1>
        </div>
      </div>
    </>
  );
};

export default OneVsOneResult;

import { FaShareAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ProgressBar from "../../utils/ProgressBar";
import OneVsOneTyping from "../OneVsOneTyping";
import Options from "../Options";
import { setGameStart } from "../../redux/features/commonSlice";

const sphereLobby = () => {
  const roomid = useAppSelector((state) => state.sphere.roomId);
  const gameStart = useAppSelector((state) => state.common.startGame);
  const dispatch = useAppDispatch();

  const handleSphereGameStart = () => {
    dispatch(setGameStart(true));
  };

  return (
    <section className="flex flex-col gap-10 mt-16">
      <div className="flex justify-between gap-16">
        <div className="flex-1">
          <ProgressBar />
          <OneVsOneTyping words={["sdasd", "vs"]} />
          {!gameStart && <Options />}
        </div>
        <div className="text-textPrimary w-[320px] border-t rounded-t-lg">
          <h1 className="font-bold text-2xl py-3 px-6 border-x roundedx-t-lg">
            Sphere chat
          </h1>
          <div className="border-t border-x  border-textPrimary min-h-[350px] overflow-y-auto"></div>
          <input
            type="text"
            name="chat"
            placeholder="Type a message"
            className="w-full py-3 px-4 bg-bgColor text-textCorrectColor border rounded-b-lg focus:outline-none"
          />
          <div className="flex gap-3 font-semibold text-2xl mt-6">
            <button
              type="button"
              onClick={handleSphereGameStart}
              disabled={!gameStart}
              style={{
                cursor: gameStart ? "not-allowed" : "pointer",
              }}
              className="bg-textPrimary rounded-md text-bgColor flex-1 py-2 px-4 hover:border hover:bg-bgColor hover:text-textPrimary hover:border-textPrimary border border-transparent transition-all duration-200"
            >
              Start
            </button>
            <button
              type="button"
              className="rounded-lg flex-1 py-2 px-4 hover:border hover:border-textPrimary border border-transparent transition-all duration-200"
            >
              Leave
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        {!gameStart && (
          <div className="text-textSecondary text-xl flex gap-6">
            <p>
              Sphere Code: <span className="text-textPrimary">{roomid}</span>
            </p>
            <p className="flex items-center cursor-pointer hover:text-textPrimary transition-colors duration-200">
              <span className="mx-1 text-sm">
                <FaShareAlt />
              </span>{" "}
              Share
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default sphereLobby;
